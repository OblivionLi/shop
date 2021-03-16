import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Dialog, DialogActions, Link, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Swal from "sweetalert2";
import AddBrandScreen from "./AddBrandScreen";
import EditBrandScreen from "./EditBrandScreen";
import Moment from "react-moment";
import { adminListBrands, deleteBrand } from "../../../actions/brandActions";

const BrandsScreen = ({ history }) => {
    const dispatch = useDispatch();
    const user_perms = [];

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [requestData, setRequestData] = useState(new Date());

    const brandAdminList = useSelector((state) => state.brandAdminList);
    const { loading, error, brands } = brandAdminList;

    const brandDelete = useSelector((state) => state.brandDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = brandDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [isAdmin, setIsAdmin] = useState(false);
    const [brandId, setBrandId] = useState(null);

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            if (!user_perms.includes("admin_view_brands")) {
                history.push("/admin");
                Swal.fire(
                    "Sorry!",
                    `You don't have access to this page.`,
                    "warning"
                );
            } else {
                setIsAdmin(true);
                dispatch(adminListBrands());
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
        if (user_perms.includes("admin_add_brands")) {
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
        if (user_perms.includes("admin_edit_brands")) {
            setOpenEditDialog(true);
            setBrandId(id);
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

    const deleteBrandHandler = (id) => {
        user_perms.includes("admin_delete_brands")
            ? Swal.fire({
                  title: "Are you sure?",
                  text: "You can't recover this brand after deletion!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  cancelButtonColor: "#d33",
                  reverseButtons: true,
              }).then((result) => {
                  if (result.value) {
                      dispatch(deleteBrand(id));
                      setRequestData(new Date());
                      Swal.fire(
                          "Deleted!",
                          "The brand with the id " + id + " has been deleted.",
                          "success"
                      );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          "Cancelled",
                          `The selected brand is safe, don't worry :)`,
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
                    title="Brands List"
                    columns={[
                        {
                            title: "Name",
                            field: "brand_name",
                        },
                        {
                            title: "Quantity",
                            field: "brand_quantity",
                        },
                        {
                            title: 'Updated At',
                            field: 'updated_at',
                            render: brands => {
                                {
                                    return (
                                        <Moment format='DD/MM/YYYY HH:mm'>
                                            {brands.updated_at}
                                        </Moment>
                                    )
                                }
                            }
                        },
                    ]}
                    data={brands.data}
                    actions={[
                        {
                            icon: "add",
                            tooltip: "Add Brand",
                            isFreeAction: true,
                            onClick: (event) => {
                                handleAddDialogOpen(event);
                            },
                        },
                        {
                            icon: "edit",
                            tooltip: "Edit Brand",
                            onClick: (event, rowData) => {
                                handleEditDialogOpen(rowData.id);
                            },
                        },
                        {
                            icon: "delete",
                            tooltip: "Delete Brand",
                            onClick: (event, rowData) => {
                                deleteBrandHandler(rowData.id);
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
                <AddBrandScreen
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
                <EditBrandScreen
                    setOpenEditDialog={setOpenEditDialog}
                    setRequestData={setRequestData}
                    brandId={brandId}
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

export default BrandsScreen;
