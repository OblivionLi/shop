import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Link, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Moment from "react-moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Swal from "sweetalert2";
import { listPermissions, deletePermission } from "../../../../actions/permissionActions";
import AddPermissionScreen from "../permissions/AddPermissionScreen";
import EditPermissionScreen from "../permissions/EditPermissionScreen";
import Loader from "../../../../components/Loader";

const PermissionsScreen = ({ history }) => {
    const dispatch = useDispatch();
    const user_perms = [];

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [requestData, setRequestData] = useState(new Date());

    const permissionList = useSelector(state => state.permissionList)
    const { loading, error, permissions } = permissionList

    const permissionDelete = useSelector(state => state.permissionDelete)
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = permissionDelete

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [isAdmin, setIsAdmin] = useState(false);
    const [permissionId, setPermissionId] = useState(null);

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            if (!user_perms.includes("admin_view_perms")) {
                history.push("/admin");
                Swal.fire(
                    "Sorry!",
                    `You don't have access to this page.`,
                    "warning"
                );
            } else {
                setIsAdmin(true);
                dispatch(listPermissions());
            }
        }
    }, [dispatch, history, userInfo, requestData]);

    if (!Array.isArray(user_perms) || !user_perms.length) {
        userInfo.details[0].roles[0].permissions.map((perm) =>
            user_perms.push(perm.name)
        );
    }

    // handle add dialog opening
    const handleAddDialogOpen = e => {
        // open dialog
        if (user_perms.includes('admin_add_perms')) {
            setOpenAddDialog(true)
        } else {
            Swal.fire(
                'Sorry!',
                `You don't have access to this action.`,
                'warning'
            )
        }
    }

    // handle add dialog closing
    const handleAddDialogClose = e => {
        // close dialog
        setOpenAddDialog(false)
    }

    // handle edit dialog opening
    const handleEditDialogOpen = id => {
        // open dialog
        if (user_perms.includes('admin_edit_perms')) {
            setOpenEditDialog(true)
            setPermissionId(id)
        } else {
            Swal.fire(
                'Sorry!',
                `You don't have access to this action.`,
                'warning'
            )
        }
    }

    // handle edit dialog closing
    const handleEditDialogClose = e => {
        // close dialog
        setOpenEditDialog(false)
    }

    const deletePermissionHandler = id => {
        user_perms.includes('admin_delete_perms')
            ? Swal.fire({
                  title: 'Are you sure?',
                  text: `You can't recover this permission after deletion!`,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  cancelButtonColor: '#d33',
                  reverseButtons: true
              }).then(result => {
                  if (result.value) {
                      dispatch(deletePermission(id))
                      setRequestData(new Date())
                      Swal.fire(
                          'Deleted!',
                          'The permission with the id ' +
                              id +
                              ' has been deleted.',
                          'success'
                      )
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          'Cancelled',
                          `The selected permission is safe, don't worry :)`,
                          'error'
                      )
                  }
              })
            : Swal.fire(
                  'Sorry!',
                  `You don't have access to this action.`,
                  'warning'
              )
    }

    return (
        <Paper elevation={3} className="paper">
            {!isAdmin ? (
                <Loader />
            ) : (
                <>
                    <div className="admin__header--content">
                        {loadingDelete && <Loader />}
                        {errorDelete && (
                            <Message variant="error">{errorDelete}</Message>
                        )}
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant="error">{error}</Message>
                        ) : (
                            <MaterialTable
                                title='Permissions List'
                                columns={[
                                    {
                                        title: 'Title',
                                        field: 'name'
                                    },
                                    {
                                        title: 'Added At',
                                        field: 'created_at',
                                        render: permissions => {
                                            {
                                                return (
                                                    <Moment format='DD/MM/YYYY HH:mm'>
                                                        {permissions.created_at}
                                                    </Moment>
                                                )
                                            }
                                        }
                                    },
                                    {
                                        title: 'Updated At',
                                        field: 'updated_at',
                                        render: permissions => {
                                            {
                                                return (
                                                    <Moment format='DD/MM/YYYY HH:mm'>
                                                        {permissions.updated_at}
                                                    </Moment>
                                                )
                                            }
                                        }
                                    }
                                ]}
                                data={permissions.data && permissions.data}
                                actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Add Permission',
                                        isFreeAction: true,
                                        onClick: event =>
                                            handleAddDialogOpen(event)
                                    },
                                    {
                                        icon: 'edit',
                                        tooltip: 'Edit Permission',
                                        onClick: (event, rowData) => {
                                            handleEditDialogOpen(rowData.id)
                                        }
                                    },
                                    {
                                        icon: 'delete',
                                        tooltip: 'Delete Permission',
                                        onClick: (event, rowData) =>
                                            deletePermissionHandler(rowData.id)
                                    }
                                ]}
                                options={{
                                    actionsColumnIndex: -1
                                }}
                            />
                        )}
                    </div>

                    <Dialog
                        open={openAddDialog}
                        aria-labelledby="draggable-dialog-title"
                        onClose={handleAddDialogClose}
                        fullWidth
                    >
                        <AddPermissionScreen
                            setOpenAddDialog={setOpenAddDialog}
                            setRequestData={setRequestData}
                        />

                        <DialogActions>
                            <Button
                                onClick={handleAddDialogClose}
                                variant="contained"
                                color="secondary"
                                className="dialog-button"
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={openEditDialog}
                        aria-labelledby="draggable-dialog-title"
                        onClose={handleEditDialogClose}
                        fullWidth
                    >
                        <EditPermissionScreen
                            setOpenEditDialog={setOpenEditDialog}
                            setRequestData={setRequestData}
                            permissionId={permissionId}
                        />

                        <DialogActions>
                            <Button
                                onClick={handleEditDialogClose}
                                variant="contained"
                                color="secondary"
                                className="dialog-button"
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </Paper>
    );
};

export default PermissionsScreen;
