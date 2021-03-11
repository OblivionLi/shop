import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import {
    listPermissions,
    editPermission,
    getEditPermissionDetails,
} from "../../../../actions/permissionActions";
import { PERMISSION_EDIT_RESET, PERMISSION_GET_DETAILS_RESET } from "../../../../constants/permissionConstants";
import Loader from "../../../../components/Loader";
import Message from "../../../../components/Message";

const EditPermissionScreen = ({ setOpenEditDialog, setRequestData, permissionId }) => {
    const [name, setName] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const permissionGetEditDetails = useSelector(
        (state) => state.permissionGetEditDetails
    );
    const { loading, error, permission } = permissionGetEditDetails;

    const permissionEdit = useSelector((state) => state.permissionEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = permissionEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: PERMISSION_EDIT_RESET });
            dispatch({ type: PERMISSION_GET_DETAILS_RESET });
        } else {
            if (!permission.name || permission.id != permissionId) {
                dispatch(getEditPermissionDetails(permissionId));
            } else {
                setName(permission.name);
            }
        }

        if (successModal) {
            dispatch(listPermissions());
        }
    }, [dispatch, permissionId, permission, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editPermission(permissionId, name));
        
        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Permission with title "${name}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: '65rem'
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Permission</DialogTitle>
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
                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Edit Permission
                        </Button>
                    </form>
                )}
            </DialogContent>
            <Divider />
        </div>
    );
};

export default EditPermissionScreen;