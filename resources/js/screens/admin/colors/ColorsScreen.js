import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Dialog, DialogActions, Link, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Swal from "sweetalert2";
import AddColorScreen from "./AddColorScreen";
import EditColorScreen from "./EditColorScreen";
import Moment from "react-moment";
import { adminListColors, deleteColor } from "../../../actions/colorActions";

const ColorsScreen = ({ history }) => {
    const dispatch = useDispatch();
    const user_perms = [];

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [requestData, setRequestData] = useState(new Date());

    const colorAdminList = useSelector((state) => state.colorAdminList);
    const { loading, error, colors } = colorAdminList;

    const colorDelete = useSelector((state) => state.colorDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = colorDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [isAdmin, setIsAdmin] = useState(false);
    const [colorId, setColorId] = useState(null);

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            if (!user_perms.includes("admin_view_colors")) {
                history.push("/admin");
                Swal.fire(
                    "Sorry!",
                    `You don't have access to this page.`,
                    "warning"
                );
            } else {
                setIsAdmin(true);
                dispatch(adminListColors());
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
        if (user_perms.includes("admin_add_colors")) {
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
        if (user_perms.includes("admin_edit_colors")) {
            setOpenEditDialog(true);
            setColorId(id);
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

    const deleteColorHandler = (id) => {
        user_perms.includes("admin_delete_colors")
            ? Swal.fire({
                  title: "Are you sure?",
                  text: "You can't recover this color after deletion!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  cancelButtonColor: "#d33",
                  reverseButtons: true,
              }).then((result) => {
                  if (result.value) {
                      dispatch(deleteColor(id));
                      setRequestData(new Date());
                      Swal.fire(
                          "Deleted!",
                          "The color with the id " + id + " has been deleted.",
                          "success"
                      );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          "Cancelled",
                          `The selected color is safe, don't worry :)`,
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
                    title="Colors List"
                    columns={[
                        {
                            title: "Name",
                            field: "color_name",
                        },
                        {
                            title: "Created At",
                            field: "created_at",
                            render: (colors) => {
                                {
                                    return (
                                        <Moment format="DD/MM/YYYY HH:mm">
                                            {colors.created_at}
                                        </Moment>
                                    );
                                }
                            },
                        },
                        {
                            title: "Updated At",
                            field: "updated_at",
                            render: (colors) => {
                                {
                                    return (
                                        <Moment format="DD/MM/YYYY HH:mm">
                                            {colors.updated_at}
                                        </Moment>
                                    );
                                }
                            },
                        },
                    ]}
                    data={colors.data}
                    actions={[
                        {
                            icon: "add",
                            tooltip: "Add Color",
                            isFreeAction: true,
                            onClick: (event) => {
                                handleAddDialogOpen(event);
                            },
                        },
                        {
                            icon: "edit",
                            tooltip: "Edit Color",
                            onClick: (event, rowData) => {
                                handleEditDialogOpen(rowData.id);
                            },
                        },
                        {
                            icon: "delete",
                            tooltip: "Delete Color",
                            onClick: (event, rowData) => {
                                deleteColorHandler(rowData.id);
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
                <AddColorScreen
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
                <EditColorScreen
                    setOpenEditDialog={setOpenEditDialog}
                    setRequestData={setRequestData}
                    colorId={colorId}
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

export default ColorsScreen
