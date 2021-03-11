import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DialogContent,
    DialogTitle,
    Checkbox,
    FormControlLabel,
    FormLabel,
    FormGroup,
    FormHelperText,
    FormControl,
} from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import {
    listRoles,
    editRole,
    getEditRoleDetails,
} from "../../../../actions/roleActions";
import { listPermissions } from "../../../../actions/permissionActions";
import {
    ROLE_EDIT_RESET,
    ROLE_GET_DETAILS_RESET,
} from "../../../../constants/roleConstants";
import Loader from "../../../../components/Loader";
import Message from "../../../../components/Message";

const EditRoleScreen = ({ setOpenEditDialog, setRequestData, roleId }) => {
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    const [perms, setPerms] = useState([]);

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const roleGetEditDetails = useSelector((state) => state.roleGetEditDetails);
    const { loading, error, role } = roleGetEditDetails;

    const roleEdit = useSelector((state) => state.roleEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = roleEdit;

    const permissionList = useSelector((state) => state.permissionList);
    const { permissions } = permissionList;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: ROLE_EDIT_RESET });
            dispatch({ type: ROLE_GET_DETAILS_RESET });
        } else {
            if (!role.name || role.id != roleId) {
                dispatch(getEditRoleDetails(roleId));
                dispatch(listPermissions());
            } else {
                setName(role.name);
                setIsAdmin(role.is_admin);

                let currentPerms = [];
                if (perms) {
                    role &&
                        role.permissions.map((perm) =>
                            currentPerms.push(+perm.id)
                        );

                    setPerms(currentPerms);
                }
            }
        }

        if (successModal) {
            dispatch(listRoles());
        }
    }, [dispatch, roleId, role, successEdit, successModal]);

    const handlePermCheckbox = (e) => {
        let newPerms = perms;
        let index;

        if (e.target.checked) {
            newPerms.push(+e.target.value);
        } else {
            index = newPerms.indexOf(+e.target.value);
            newPerms.splice(index, 1);
        }

        setPerms(newPerms);
    };

    const handleIsAdminCheckbox = (e) => {
        let isAdmin;
        if (e.target.checked) {
            isAdmin = 1;
        } else {
            isAdmin = 0;
        }
        setIsAdmin(isAdmin);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editRole(roleId, name, isAdmin, perms));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Role with title "${name}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Role</DialogTitle>
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

                            <div className="form__field">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Give this Role admin permissions
                                    </FormLabel>
                                    <FormGroup
                                        row
                                        onChange={handleIsAdminCheckbox}
                                    >
                                        <div className="form__field--checkboxes">
                                            <FormControlLabel
                                                value={isAdmin}
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            isAdmin &&
                                                            isAdmin == 1
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                }
                                                label="Is Admin?"
                                                name="isadmin"
                                            />
                                        </div>
                                    </FormGroup>
                                </FormControl>
                            </div>
                        </div>

                        {Object.keys(role).length != 0 && (
                            <div className="form">
                                <div className="form__field">
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">
                                            Choose Permissions
                                        </FormLabel>
                                        <FormGroup
                                            row
                                            onChange={handlePermCheckbox}
                                        >
                                            <div className="form__field--checkboxes">
                                                {permissions.data &&
                                                    permissions.data.map(
                                                        (permission, i) => {
                                                            return (
                                                                <FormControlLabel
                                                                    key={
                                                                        permission.id
                                                                    }
                                                                    value={
                                                                        permission.id
                                                                    }
                                                                    control={
                                                                        <Checkbox
                                                                            defaultChecked={
                                                                                role &&
                                                                                role.permissions.some(
                                                                                    (
                                                                                        p
                                                                                    ) =>
                                                                                        p.id ===
                                                                                        permission.id
                                                                                )
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                        />
                                                                    }
                                                                    label={
                                                                        permission.name
                                                                    }
                                                                    name="permission"
                                                                />
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        </FormGroup>
                                        <FormHelperText>
                                            Be consistent with distributing
                                            permissions between users.
                                        </FormHelperText>
                                    </FormControl>
                                </div>
                            </div>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Edit Role
                        </Button>
                    </form>
                )}
            </DialogContent>
            <Divider />
        </div>
    );
};

export default EditRoleScreen;
