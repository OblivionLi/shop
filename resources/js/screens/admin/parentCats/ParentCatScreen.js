import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Dialog, DialogActions, Link, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Swal from "sweetalert2";
import AddParentCatScreen from "./AddParentCatScreen";
import EditParentCatScreen from "./EditParentCatScreen";
import Moment from "react-moment";
import { adminListParentCats, deleteParentCat } from "../../../actions/parentCatActions";

const ParentCatScreen = ({ history }) => {
    const dispatch = useDispatch();
    const user_perms = [];

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [requestData, setRequestData] = useState(new Date());

    const parentCatAdminList = useSelector((state) => state.parentCatAdminList);
    const { loading, error, parentCats } = parentCatAdminList;

    const parentCatDelete = useSelector((state) => state.parentCatDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = parentCatDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [isAdmin, setIsAdmin] = useState(false);
    const [parentCatId, setParentCatId] = useState(null);

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            if (!user_perms.includes("admin_view_parentCats")) {
                history.push("/admin");
                Swal.fire(
                    "Sorry!",
                    `You don't have access to this page.`,
                    "warning"
                );
            } else {
                setIsAdmin(true);
                dispatch(adminListParentCats());
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
        if (user_perms.includes("admin_add_parentCats")) {
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
        if (user_perms.includes("admin_edit_parentCats")) {
            setOpenEditDialog(true);
            setParentCatId(id);
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

    const deleteParentCatHandler = (id) => {
        user_perms.includes("admin_delete_parentCats")
            ? Swal.fire({
                  title: "Are you sure?",
                  text: "You can't recover this parent category after deletion!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  cancelButtonColor: "#d33",
                  reverseButtons: true,
              }).then((result) => {
                  if (result.value) {
                      dispatch(deleteParentCat(id));
                      setRequestData(new Date());
                      Swal.fire(
                          "Deleted!",
                          "The parent category with the id " + id + " has been deleted.",
                          "success"
                      );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          "Cancelled",
                          `The selected parent category is safe, don't worry :)`,
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
                    title="Parent Category List"
                    columns={[
                        {
                            title: "Name",
                            field: "name",
                        },
                        {
                            title: "For Type",
                            field: "type",
                            render: (parentCats) => {
                                {
                                    return parentCats.type.name;
                                }
                            },
                        },
                        {
                            title: "Created At",
                            field: "created_at",
                            render: (parentCats) => {
                                {
                                    return (
                                        <Moment format="DD/MM/YYYY HH:mm">
                                            {parentCats.created_at}
                                        </Moment>
                                    );
                                }
                            },
                        },
                        {
                            title: "Updated At",
                            field: "updated_at",
                            render: (parentCats) => {
                                {
                                    return (
                                        <Moment format="DD/MM/YYYY HH:mm">
                                            {parentCats.updated_at}
                                        </Moment>
                                    );
                                }
                            },
                        },
                    ]}
                    data={parentCats.data}
                    actions={[
                        {
                            icon: "add",
                            tooltip: "Add Parent Category",
                            isFreeAction: true,
                            onClick: (event) => {
                                handleAddDialogOpen(event);
                            },
                        },
                        {
                            icon: "edit",
                            tooltip: "Edit Parent Category",
                            onClick: (event, rowData) => {
                                handleEditDialogOpen(rowData.id);
                            },
                        },
                        {
                            icon: "delete",
                            tooltip: "Delete Parent Category",
                            onClick: (event, rowData) => {
                                deleteParentCatHandler(rowData.id);
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
                <AddParentCatScreen
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
                <EditParentCatScreen
                    setOpenEditDialog={setOpenEditDialog}
                    setRequestData={setRequestData}
                    parentCatId={parentCatId}
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
    )
}

export default ParentCatScreen
