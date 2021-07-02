import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Dialog, DialogActions, Link, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Swal from "sweetalert2";
import EditAddressScreen from "./EditAddressScreen";
import Moment from "react-moment";
import { adminListAddresses, deleteAddress } from "../../../actions/addressActions";

const AddressesScreen = ({ history }) => {
    const dispatch = useDispatch();
    const user_perms = [];

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [requestData, setRequestData] = useState(new Date());

    const addressAdminList = useSelector((state) => state.addressAdminList);
    const { loading, error, addresses } = addressAdminList;

    const addressDelete = useSelector((state) => state.addressDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = addressDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [isAdmin, setIsAdmin] = useState(false);
    const [addressId, setAddressId] = useState(null);

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            if (!user_perms.includes("admin_view_addresses")) {
                history.push("/admin");
                Swal.fire(
                    "Sorry!",
                    `You don't have access to this page.`,
                    "warning"
                );
            } else {
                setIsAdmin(true);
                dispatch(adminListAddresses());
            }
        }
    }, [dispatch, history, userInfo, requestData]);

    if (!Array.isArray(user_perms) || !user_perms.length) {
        userInfo.details[0].roles[0].permissions.map((perm) =>
            user_perms.push(perm.name)
        );
    }

    // handle edit dialog opening
    const handleEditDialogOpen = (id) => {
        // open dialog
        if (user_perms.includes("admin_edit_addresses")) {
            setOpenEditDialog(true);
            setAddressId(id);
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

    const deleteAddressHandler = (id) => {
        user_perms.includes("admin_delete_addresses")
            ? Swal.fire({
                  title: "Are you sure?",
                  text: "You can't recover this address after deletion!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  cancelButtonColor: "#d33",
                  reverseButtons: true,
              }).then((result) => {
                  if (result.value) {
                      dispatch(deleteAddress(id));
                      setRequestData(new Date());
                      Swal.fire(
                          "Deleted!",
                          "The address with the id " + id + " has been deleted.",
                          "success"
                      );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          "Cancelled",
                          `The selected address is safe, don't worry :)`,
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
                    title="Addresses List"
                    columns={[
                        {
                            title: "Username",
                            field: "addresses.user.name",
                            render: addresses => {
                                {
                                    return (
                                        addresses.user.name
                                    )
                                }
                            }
                        },
                        {
                            title: "Full Name",
                            field: "name",
                            render: addresses => {
                                {
                                    return (
                                        `${addresses.name} ${addresses.surname}`
                                    )
                                }
                            }
                        },
                        {
                            title: "Country",
                            field: "country",
                        },
                        {
                            title: "City",
                            field: "city",
                        },
                        {
                            title: "Address",
                            field: "address",
                        },
                        {
                            title: "Postal Code",
                            field: "postal_code",
                        },
                        {
                            title: "Phone Number",
                            field: "phone_number",
                            render: addresses => {
                                {
                                    return (
                                        `${addresses.phone_number}`
                                    )
                                }
                            }
                        },
                    ]}
                    data={addresses}
                    actions={[
                        {
                            icon: "edit",
                            tooltip: "Edit Brand",
                            onClick: (event, rowData) => {
                                handleEditDialogOpen(rowData.id);
                            },
                        },
                        {
                            icon: "delete",
                            tooltip: "Delete Address",
                            onClick: (event, rowData) => {
                                deleteAddressHandler(rowData.id);
                            },
                        },
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                    }}
                />
            )}

            <Dialog
                open={openEditDialog}
                aria-labelledby="draggable-dialog-title"
                onClose={handleEditDialogClose}
                fullWidth
            >
                <EditAddressScreen
                    setOpenEditDialog={setOpenEditDialog}
                    setRequestData={setRequestData}
                    addressId={addressId}
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

export default AddressesScreen;
