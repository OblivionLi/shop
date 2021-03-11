import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Link, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Moment from "react-moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Swal from "sweetalert2";
import { listRoles, deleteRole } from "../../../../actions/roleActions";
import AddRoleScreen from "../roles/AddRoleScreen";
import EditRoleScreen from "../roles/EditRoleScreen";
import Loader from "../../../../components/Loader";

const RolesScreen = ({ history }) => {
    const dispatch = useDispatch();
    const user_perms = [];

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [requestData, setRequestData] = useState(new Date());

    const roleList = useSelector((state) => state.roleList);
    const { loading, error, roles } = roleList;

    const roleDelete = useSelector((state) => state.roleDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = roleDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [isAdmin, setIsAdmin] = useState(false);
    const [roleId, setRoleId] = useState(null);

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            if (!user_perms.includes("admin_view_roles")) {
                history.push("/admin");
                Swal.fire(
                    "Sorry!",
                    `You don't have access to this page.`,
                    "warning"
                );
            } else {
                setIsAdmin(true);
                dispatch(listRoles());
            }
        }
    }, [dispatch, history, userInfo, requestData]);

    if (!Array.isArray(user_perms) || !user_perms.length) {
        userInfo.details[0].roles[0].permissions.map((perm) =>
            user_perms.push(perm.name)
        );
    }

    // handle add dialog opening
    const handleAddDialogOpen = (e) => {
        // open dialog
        if (user_perms.includes("admin_add_roles")) {
            setOpenAddDialog(true);
        } else {
            Swal.fire(
                "Sorry!",
                `You don't have access to this action.`,
                "warning"
            );
        }
    };

    // handle add dialog closing
    const handleAddDialogClose = (e) => {
        // close dialog
        setOpenAddDialog(false);
    };

    // handle edit dialog opening
    const handleEditDialogOpen = (id) => {
        // open dialog
        if (user_perms.includes("admin_edit_roles")) {
            setOpenEditDialog(true);
            setRoleId(id);
        } else {
            Swal.fire(
                "Sorry!",
                `You don't have access to this action.`,
                "warning"
            );
        }
    };

    // handle edit dialog closing
    const handleEditDialogClose = (e) => {
        // close dialog
        setOpenEditDialog(false);
    };

    const deleteRoleHandler = (id) => {
        user_perms.includes("admin_delete_roles")
            ? Swal.fire({
                  title: "Are you sure?",
                  text: `I strongly suggest to NOT delete any role, instead edit the existing one! Resort to deletion as a last measure!`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  cancelButtonColor: "#d33",
                  reverseButtons: true,
              }).then((result) => {
                  if (result.value) {
                      dispatch(deleteRole(id));
                      setRequestData(new Date());
                      Swal.fire(
                          "Deleted!",
                          "The role with the id " + id + " has been deleted.",
                          "success"
                      );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          "Cancelled",
                          `The selected role is safe, don't worry :)`,
                          "error"
                      );
                  }
              })
            : Swal.fire(
                  "Sorry!",
                  `You don't have access to this action.`,
                  "warning"
              );
    };

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
                                title="Roles List"
                                columns={[
                                    {
                                        title: "Title",
                                        field: "name",
                                    },
                                    {
                                        title: "Has Admin Perms?",
                                        field: "is_admin",
                                        render: (roles) => {
                                            {
                                                return roles.is_admin == 0 ? 'No' : 'Yes' 
                                            }
                                        }
                                    },
                                    {
                                        title: "People with this Role",
                                        field: "users",
                                        render: (roles) => {
                                            {
                                                return roles.users.length;
                                            }
                                        },
                                    },
                                    {
                                        title: "Created At",
                                        field: "created_at",
                                        render: (roles) => {
                                            {
                                                return (
                                                    <Moment format="DD/MM/YYYY HH:mm">
                                                        {roles.created_at}
                                                    </Moment>
                                                );
                                            }
                                        },
                                    },
                                    {
                                        title: "Updated At",
                                        field: "updated_at",
                                        render: (roles) => {
                                            {
                                                return (
                                                    <Moment format="DD/MM/YYYY HH:mm">
                                                        {roles.updated_at}
                                                    </Moment>
                                                );
                                            }
                                        },
                                    },
                                ]}
                                data={roles.data && roles.data}
                                actions={[
                                    {
                                        icon: "add",
                                        tooltip: "Add Role",
                                        isFreeAction: true,
                                        onClick: (event) =>
                                            handleAddDialogOpen(event),
                                    },
                                    {
                                        icon: "edit",
                                        tooltip: "Edit Role",
                                        onClick: (event, rowData) => {
                                            handleEditDialogOpen(rowData.id);
                                        },
                                    },
                                    {
                                        icon: "delete",
                                        tooltip: "Delete Role",
                                        onClick: (event, rowData) =>
                                            deleteRoleHandler(rowData.id),
                                    },
                                ]}
                                options={{
                                    actionsColumnIndex: -1,
                                }}
                                detailPanel={(rowData) => {
                                    return (
                                        <div className="table-detail">
                                            <div className="table-detail--par">
                                                {rowData.permissions.length
                                                    ? rowData.permissions.map(
                                                          (permission) => (
                                                              <p
                                                                  key={
                                                                      permission.id
                                                                  }
                                                              >
                                                                  {
                                                                      permission.name
                                                                  }
                                                              </p>
                                                          )
                                                      )
                                                    : (<p>This Role ({rowData.name}) has no permissions.</p>)}
                                            </div>
                                        </div>
                                    );
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
                        <AddRoleScreen
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
                        <EditRoleScreen
                            setOpenEditDialog={setOpenEditDialog}
                            setRequestData={setRequestData}
                            roleId={roleId}
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

export default RolesScreen;
