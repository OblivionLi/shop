import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Paper,
    Button,
    TextField,
    Divider,
} from "@material-ui/core";
import MainNavbar from "../../../components/MainNavbar";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { resetPass, getUserToReset } from '../../../actions/userActions'

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: "5rem auto",
        width: "70%",
        padding: "5rem",
    },
}));

const ResetPasswordScreen = ({ history, match }) => {
    const classes = useStyles();
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userResetPass = useSelector((state) => state.userResetPass);
    const { loading, error } = userResetPass;

    const getUserReset = useSelector((state) => state.getUserReset);
    const { userReset } = getUserReset;

    useEffect(() => {
        if (!userReset) {
            dispatch(getUserToReset(match.params.id));
        } else {
            setEmail(userReset && userReset[0].email);
        }
    }, [userReset]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password != passwordConfirmation) {
            setMessage("Passwords do not match");
        } else {
            dispatch(resetPass(email, password, passwordConfirmation));

            Swal.fire({
                position: "center",
                icon: "success",
                title: `Password has been reseted.`,
                showConfirmButton: false,
                timer: 3500,
                width: "65rem",
            });
            history.push("/login");
        }
    };

    return (
        <>
            <MainNavbar />

            <Paper elevation={3} className={classes.paper}>
                <div className="auth">
                    <div className="auth__info">
                        <h3 className="auth__info--title">Reset Password</h3>
                    </div>

                    <Divider />

                    <div className="auth__content">
                        {message && (
                            <Message variant="error">{message}</Message>
                        )}
                        {error && <Message variant="error">{error}</Message>}
                        {loading && <Loader />}
                        <form onSubmit={submitHandler}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="New Password (min 6 chars)"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirm_password"
                                label="Confirm Password"
                                type="password"
                                id="confirm_password"
                                autoComplete="current-password"
                                value={passwordConfirmation}
                                onChange={(e) =>
                                    setPasswordConfirmation(e.target.value)
                                }
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                            >
                                Reset Password
                            </Button>
                        </form>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default ResetPasswordScreen;
