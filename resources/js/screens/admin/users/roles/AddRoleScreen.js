import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import {
    listRoles,
    createRole,
} from "../../../../actions/roleActions";
import Swal from "sweetalert2";
import { ROLE_LIST_RESET } from "../../../../constants/roleConstants";
import Loader from "../../../../components/Loader";
import Message from "../../../../components/Message";

const AddRoleScreen = ({ setOpenAddDialog, setRequestData, history }) => {
    const [name, setName] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const roleCreate = useSelector((state) => state.roleCreate);
    const { loading, success, error } = roleCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: ROLE_LIST_RESET })
            dispatch(listRoles());
        }
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createRole(name));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Role "${name}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Role</DialogTitle>
            <Divider />
            <DialogContent>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <form
                        onSubmit={submitHandler}
                    >
                        <div className="form">
                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="name"
                                    label="Title"
                                    fullWidth
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Add Role
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddRoleScreen;