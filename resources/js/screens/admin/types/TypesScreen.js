import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Dialog, DialogActions, Link, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Swal from "sweetalert2";
import AddTypeScreen from "./AddTypeScreen";
import EditTypeScreen from "./EditTypeScreen";
import Moment from "react-moment";
import { adminListTypes, deleteType } from "../../../actions/typeActions";

const TypesScreen = ({ history }) => {
    const dispatch = useDispatch();
    const user_perms = [];

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [requestData, setRequestData] = useState(new Date());

    const typeAdminList = useSelector((state) => state.typeAdminList);
    const { loading, error, types } = typeAdminList;

    const typeDelete = useSelector((state) => state.typeDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = typeDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [isAdmin, setIsAdmin] = useState(false);
    const [typeId, setTypeId] = useState(null);

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            if (!user_perms.includes("admin_view_types")) {
                history.push("/admin");
                Swal.fire(
                    "Sorry!",
                    `You don't have access to this page.`,
                    "warning"
                );
            } else {
                setIsAdmin(true);
                dispatch(adminListTypes());
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
        if (user_perms.includes("admin_add_types")) {
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
        if (user_perms.includes("admin_edit_types")) {
            setOpenEditDialog(true);
            setTypeId(id);
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

    const deleteTypeHandler = (id) => {
        user_perms.includes("admin_delete_types")
            ? Swal.fire({
                  title: "Are you sure?",
                  text: "You can't recover this type after deletion!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  cancelButtonColor: "#d33",
                  reverseButtons: true,
              }).then((result) => {
                  if (result.value) {
                      dispatch(deleteType(id));
                      setRequestData(new Date());
                      Swal.fire(
                          "Deleted!",
                          "The type with the id " + id + " has been deleted.",
                          "success"
                      );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          "Cancelled",
                          `The selected type is safe, don't worry :)`,
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
        <Paper className="paper">
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error}</Message>
            ) : (
                <MaterialTable
                    title="Types List"
                    columns={[
                        {
                            title: "Name",
                            field: "name",
                        },
                        {
                            title: 'Updated At',
                            field: 'updated_at',
                            render: types => {
                                {
                                    return (
                                        <Moment format='DD/MM/YYYY HH:mm'>
                                            {types.updated_at}
                                        </Moment>
                                    )
                                }
                            }
                        },
                        {
                            title: 'Created At',
                            field: 'created_at',
                            render: types => {
                                {
                                    return (
                                        <Moment format='DD/MM/YYYY HH:mm'>
                                            {types.created_at}
                                        </Moment>
                                    )
                                }
                            }
                        },
                    ]}
                    data={types}
                    actions={[
                        {
                            icon: "add",
                            tooltip: "Add Type",
                            isFreeAction: true,
                            onClick: (event) => {
                                handleAddDialogOpen(event);
                            },
                        },
                        {
                            icon: "edit",
                            tooltip: "Edit Type",
                            onClick: (event, rowData) => {
                                handleEditDialogOpen(rowData.id);
                            },
                        },
                        {
                            icon: "delete",
                            tooltip: "Delete Type",
                            onClick: (event, rowData) => {
                                deleteTypeHandler(rowData.id);
                            },
                        },
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                    }}
                />
            )}

            <Dialog
                open={openAddDialog}
                aria-labelledby="draggable-dialog-title"
                onClose={handleAddDialogClose}
                fullWidth
            >
                <AddTypeScreen
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
                <EditTypeScreen
                    setOpenEditDialog={setOpenEditDialog}
                    setRequestData={setRequestData}
                    typeId={typeId}
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
        </Paper>
    );
};

export default TypesScreen;
