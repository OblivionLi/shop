import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../../components/MainNavbar";
import Footer from "../../../components/Footer";
import {
    Breadcrumbs,
    Paper,
    Divider,
    TextField,
    Button,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
    getUserDetails,
    updateUserProfile,
} from "../../../actions/userActions";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 345,
    },

    formControl: {
        margin: "0 auto",
        minWidth: "100%",
    },

    bread: {
        marginBottom: "30px",
    },

    breadLink1: {
        color: "rgba(58, 68, 107, 0.85)",

        "&:hover": {
            color: "#2F4F4F",
        },
    },

    breadLink2: {
        color: "#3a446b",
        fontSize: "20px",

        "&:hover": {
            color: "#2F4F4F",
        },
    },
});

const SettingsScreen = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!userInfo) {
            history.push("/");
        } else {
            if (!user.name) {
                dispatch(getUserDetails(userInfo.id));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user, success]);

    const submitUserDetailsHandler = (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(updateUserProfile(user.id, name, email, password));
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Profile Updated!`,
                showConfirmButton: false,
                timer: 2500,
                width: "65rem",
            });
            setMessage(null);
            setPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <>
            <Navigation />
            <section className="profile">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Link className={classes.breadLink1} to={`/`}>
                        Home
                    </Link>

                    <Link className={classes.breadLink1} to={`/profile`}>
                        Profile
                    </Link>

                    <Link
                        className={classes.breadLink2}
                        to={`/profile/settings`}
                        aria-current="page"
                    >
                        Settings
                    </Link>
                </Breadcrumbs>

                <Divider className={classes.bread} />

                <Paper className="settings">
                    <h3>Account Settings</h3>
                    <Divider />

                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="error">{error}</Message>
                    ) : (
                        <form onSubmit={submitUserDetailsHandler}>
                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {message && (
                                <Message variant="error">{message}</Message>
                            )}

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="confirm_password"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm_password"
                                    autoComplete="current-password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                            <Button
                                variant="contained"
                                color="secondary"
                                value="submit"
                                type="submit"
                                fullWidth
                            >
                                Update Profile
                            </Button>
                        </form>
                    )}
                </Paper>
            </section>
            <Footer />
        </>
    );
};

export default SettingsScreen;
