import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import {
    listPermissions,
    createPermission,
} from "../../../../actions/permissionActions";
import Swal from "sweetalert2";
import { PERMISSION_LIST_RESET } from "../../../../constants/permissionConstants";
import Loader from "../../../../components/Loader";
import Message from "../../../../components/Message";

const AddPermissionScreen = ({ setOpenAddDialog, setRequestData, history }) => {
    const [name, setName] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const permissionCreate = useSelector((state) => state.permissionCreate);
    const { loading, success, error } = permissionCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: PERMISSION_LIST_RESET })
            dispatch(listPermissions());
        }
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createPermission(name));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Permission "${name}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Permission</DialogTitle>
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
                            Add Permission
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddPermissionScreen;