import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Dialog, DialogActions, Link, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Swal from "sweetalert2";
import AddSizeScreen from "./AddSizeScreen";
import EditSizeScreen from "./EditSizeScreen";
import Moment from "react-moment";
import { adminListSizes, deleteSize } from "../../../actions/sizeActions";

const SizesScreen = ({ history }) => {
    const dispatch = useDispatch();
    const user_perms = [];

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [requestData, setRequestData] = useState(new Date());

    const sizeAdminList = useSelector((state) => state.sizeAdminList);
    const { loading, error, sizes } = sizeAdminList;

    const sizeDelete = useSelector((state) => state.sizeDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = sizeDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [isAdmin, setIsAdmin] = useState(false);
    const [sizeId, setSizeId] = useState(null);

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            if (!user_perms.includes("admin_view_sizes")) {
                history.push("/admin");
                Swal.fire(
                    "Sorry!",
                    `You don't have access to this page.`,
                    "warning"
                );
            } else {
                setIsAdmin(true);
                dispatch(adminListSizes());
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
        if (user_perms.includes("admin_add_sizes")) {
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
        if (user_perms.includes("admin_edit_sizes")) {
            setOpenEditDialog(true);
            setSizeId(id);
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

    const deleteSizeHandler = (id) => {
        user_perms.includes("admin_delete_sizes")
            ? Swal.fire({
                  title: "Are you sure?",
                  text: "You can't recover this size after deletion!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  cancelButtonColor: "#d33",
                  reverseButtons: true,
              }).then((result) => {
                  if (result.value) {
                      dispatch(deleteSize(id));
                      setRequestData(new Date());
                      Swal.fire(
                          "Deleted!",
                          "The size with the id " + id + " has been deleted.",
                          "success"
                      );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          "Cancelled",
                          `The selected size is safe, don't worry :)`,
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
                    title="Sizes List"
                    columns={[
                        {
                            title: "Name",
                            field: "size_name",
                        },
                        {
                            title: "Created At",
                            field: "created_at",
                            render: (sizes) => {
                                {
                                    return (
                                        <Moment format="DD/MM/YYYY HH:mm">
                                            {sizes.created_at}
                                        </Moment>
                                    );
                                }
                            },
                        },
                        {
                            title: "Updated At",
                            field: "updated_at",
                            render: (sizes) => {
                                {
                                    return (
                                        <Moment format="DD/MM/YYYY HH:mm">
                                            {sizes.updated_at}
                                        </Moment>
                                    );
                                }
                            },
                        },
                    ]}
                    data={sizes.data}
                    actions={[
                        {
                            icon: "add",
                            tooltip: "Add Size",
                            isFreeAction: true,
                            onClick: (event) => {
                                handleAddDialogOpen(event);
                            },
                        },
                        {
                            icon: "edit",
                            tooltip: "Edit Size",
                            onClick: (event, rowData) => {
                                handleEditDialogOpen(rowData.id);
                            },
                        },
                        {
                            icon: "delete",
                            tooltip: "Delete Size",
                            onClick: (event, rowData) => {
                                deleteSizeHandler(rowData.id);
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
                <AddSizeScreen
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
                <EditSizeScreen
                    setOpenEditDialog={setOpenEditDialog}
                    setRequestData={setRequestData}
                    sizeId={sizeId}
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

export default SizesScreen;
