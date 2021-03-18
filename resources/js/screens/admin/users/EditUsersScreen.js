import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    TextField,
    Button,
    Divider,
    FormControl,
    DialogContent,
    DialogTitle,
    InputLabel,
    Select,
} from "@material-ui/core";
import Swal from "sweetalert2";
import {
    listUsers,
    editUser,
    getEditUserDetails,
} from "../../../actions/userActions";
import { listRoles } from "../../../actions/roleActions";
import {
    USER_EDIT_RESET,
    USER_GET_DETAILS_RESET,
} from "../../../constants/userConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

const EditUsersScreen = ({ setOpenEditDialog, setRequestData, userId }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const userGetEditDetails = useSelector((state) => state.userGetEditDetails);
    const { loading, error, user } = userGetEditDetails;

    const userEdit = useSelector((state) => state.userEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = userEdit;

    const roleList = useSelector((state) => state.roleList);
    const { roles } = roleList;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: USER_EDIT_RESET });
            dispatch({ type: USER_GET_DETAILS_RESET });
        } else {
            if (!user.name || user.id != userId) {
                dispatch(getEditUserDetails(userId));
                dispatch(listRoles());
            } else {
                setName(user.name);
                setEmail(user.email);
                setRole(user.roles && user.roles[0].id);
            }
        }

        if (successModal) {
            dispatch(listUsers());
        }
    }, [dispatch, userId, user, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editUser(userId, name, email, role));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `User with username "${name}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit User</DialogTitle>
            <Divider />
            <DialogContent>
                {loadingEdit && <Loader />}
                {errorEdit && <Message variant="error">{errorEdit}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div className="form">
                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="name"
                                    label="Title"
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form">
                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form">
                            <div className="form__field">
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="age-native-simple">
                                        Select Role (current role "
                                        {user.roles
                                            ? user.roles[0].name
                                            : "none"}
                                        ")
                                    </InputLabel>
                                    <Select
                                        native
                                        name="role"
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    >
                                        <option aria-label="None" value="" />
                                        {roles.data &&
                                            roles.data.map((role) => {
                                                return (
                                                    <option
                                                        value={role.id}
                                                        key={role.id}
                                                    >
                                                        {role.name}
                                                    </option>
                                                );
                                            })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Edit User
                        </Button>
                    </form>
                )}
            </DialogContent>
            <Divider />
        </div>
    );
};

export default EditUsersScreen;
