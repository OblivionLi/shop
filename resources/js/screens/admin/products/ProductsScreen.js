import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Dialog, DialogActions, Link, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import {
    adminListProducts,
    deleteProduct,
    deleteProductImage,
} from "../../../actions/productActions";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import AddProductScreen from "./AddProductScreen";
import EditProductScreen from "./EditProductScreen";
import Swal from "sweetalert2";
import Moment from "react-moment";
import StarRateIcon from "@material-ui/icons/StarRate";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ReplaceProductImageScreen from "./ReplaceProductImageScreen";
import AddProductImageScreen from "./AddProductImageScreen";

const ProductsScreen = ({ history }) => {
    const dispatch = useDispatch();
    const user_perms = [];

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openAddProductImageDialog, setOpenAddProductImageDialog] =
        useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openReplaceDialog, setOpenReplaceDialog] = useState(false);
    const [requestData, setRequestData] = useState(new Date());

    const productAdminList = useSelector((state) => state.productAdminList);
    const { loading, error, products } = productAdminList;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = productDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [isAdmin, setIsAdmin] = useState(false);
    const [productId, setProductId] = useState(null);
    const [productReplaceId, setProductReplaceId] = useState(null);
    const [productImageId, setProductImageId] = useState(null);

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            if (!user_perms.includes("admin_view_products")) {
                history.push("/admin");
                Swal.fire(
                    "Sorry!",
                    `You don't have access to this page.`,
                    "warning"
                );
            } else {
                setIsAdmin(true);
                dispatch(adminListProducts());
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
        if (user_perms.includes("admin_add_products")) {
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

    // handle add product image dialog opening
    const handleAddProductImageDialogOpen = (id) => {
        // open dialog
        if (user_perms.includes("admin_add_products")) {
            setOpenAddProductImageDialog(true);
            setProductId(id);
        } else {
            Swal.fire(
                "Sorry!",
                `You don't have access to this action.`,
                "warning"
            );
        }
    };

    // handle add dialog closing
    const handleAddProductImageDialogClose = (e) => {
        // close dialog
        setOpenAddProductImageDialog(false);
    };

    // handle edit dialog opening
    const handleEditDialogOpen = (id) => {
        // open dialog
        if (user_perms.includes("admin_edit_products")) {
            setOpenEditDialog(true);
            setProductId(id);
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

    // handle replace dialog opening
    const handleReplaceDialogOpen = (id, replaceId) => {
        // open dialog
        if (user_perms.includes("admin_edit_products")) {
            setOpenReplaceDialog(true);
            setProductImageId(id);
            setProductReplaceId(replaceId);
        } else {
            Swal.fire(
                "Sorry!",
                `You don't have access to this action.`,
                "warning"
            );
        }
    };

    // handle replace dialog closing
    const handleReplaceDialogClose = (e) => {
        // close dialog
        setOpenReplaceDialog(false);
    };

    const deleteProductHandler = (id) => {
        user_perms.includes("admin_delete_products")
            ? Swal.fire({
                  title: "Are you sure?",
                  text: "You can't recover this product after deletion!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  cancelButtonColor: "#d33",
                  reverseButtons: true,
              }).then((result) => {
                  if (result.value) {
                      dispatch(deleteProduct(id));
                      setRequestData(new Date());
                      Swal.fire(
                          "Deleted!",
                          "The product with the id " +
                              id +
                              " has been deleted.",
                          "success"
                      );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          "Cancelled",
                          `The selected product is safe, don't worry :)`,
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

    const deleteProductImageHandler = (id) => {
        user_perms.includes("admin_delete_products")
            ? Swal.fire({
                  title: "Are you sure?",
                  text: "You can't recover this product image after deletion!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  cancelButtonColor: "#d33",
                  reverseButtons: true,
              }).then((result) => {
                  if (result.value) {
                      dispatch(deleteProductImage(id));
                      setRequestData(new Date());
                      Swal.fire(
                          "Deleted!",
                          "The product image with the id " +
                              id +
                              " has been deleted.",
                          "success"
                      );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          "Cancelled",
                          `The selected product image is safe, don't worry :)`,
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
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error}</Message>
            ) : (
                <MaterialTable
                    title="Products List"
                    columns={[
                        {
                            title: "Added By",
                            field: "user.name",
                            render: (products) => {
                                {
                                    return products.user.name;
                                }
                            },
                        },
                        {
                            title: "Name",
                            field: "name",
                        },
                        {
                            title: "Brand",
                            field: "brand.brand_name",
                            render: (products) => {
                                {
                                    return products.brand.brand_name;
                                }
                            },
                        },
                        {
                            title: "Product Code",
                            field: "product_code",
                        },
                        {
                            title: "Price",
                            field: "price",
                            render: (products) => {
                                {
                                    return `${products.price} €`;
                                }
                            },
                        },
                        {
                            title: "Discount",
                            field: "discount",
                            render: (products) => {
                                {
                                    return `${products.discount} %`;
                                }
                            },
                        },
                        {
                            title: "Rating",
                            field: "rating",
                            render: (products) => {
                                {
                                    return (
                                        <>
                                            {products.rating} <StarRateIcon />
                                        </>
                                    );
                                }
                            },
                        },
                        {
                            title: "Total Reviews",
                            field: "total_reviews",
                            render: (products) => {
                                {
                                    return products.total_reviews;
                                }
                            },
                        },
                        {
                            title: "For Type",
                            field: "type",
                            render: (products) => {
                                {
                                    return products.type[0].name;
                                }
                            },
                        },
                        {
                            title: "Total Quantity",
                            field: "total_quantities",
                            render: (products) => {
                                {
                                    return products.total_quantities;
                                }
                            },
                        },
                        {
                            title: "Created At",
                            field: "created_at",
                            render: (products) => {
                                {
                                    return (
                                        <Moment format="DD/MM/YYYY HH:mm">
                                            {products.created_at}
                                        </Moment>
                                    );
                                }
                            },
                        },
                        {
                            title: "Updated At",
                            field: "updated_at",
                            render: (products) => {
                                {
                                    return (
                                        <Moment format="DD/MM/YYYY HH:mm">
                                            {products.updated_at}
                                        </Moment>
                                    );
                                }
                            },
                        },
                    ]}
                    data={products && products.data}
                    actions={[
                        {
                            icon: "add",
                            tooltip: "Add Product",
                            isFreeAction: true,
                            onClick: (event) => {
                                handleAddDialogOpen(event);
                            },
                        },
                        {
                            icon: "photo",
                            tooltip: "Add Product Image",
                            onClick: (event, rowData) => {
                                handleAddProductImageDialogOpen(rowData.id);
                            },
                        },
                        {
                            icon: "edit",
                            tooltip: "Edit Product",
                            onClick: (event, rowData) => {
                                handleEditDialogOpen(rowData.id);
                            },
                        },
                        {
                            icon: "delete",
                            tooltip: "Delete Product",
                            onClick: (event, rowData) => {
                                deleteProductHandler(rowData.id);
                            },
                        },
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                    }}
                    detailPanel={(rowData) => {
                        return (
                            <div className="product__table">
                                <div className="product__table-desc">
                                    <div className="product__table-desc--d">
                                        <h3>Product Parent Category</h3>
                                        <hr className="product__table-hr" />
                                        <p>
                                            {
                                                rowData.parentCategories[0] ? rowData.parentCategories[0]
                                                    .parent_category_name : '-'
                                            }
                                        </p>
                                    </div>
                                    <hr />
                                    <div className="product__table-desc--d">
                                        <h3>Product Child Category</h3>
                                        <hr className="product__table-hr" />
                                        <p>
                                            {
                                                rowData.childCategories[0] ? rowData.childCategories[0]
                                                    .child_category_name : '-'
                                            }
                                        </p>
                                    </div>
                                    <hr />
                                    <div className="product__table-desc--d">
                                        <h3>Product Description</h3>
                                        <hr className="product__table-hr" />
                                        <p>{rowData.description}</p>
                                    </div>
                                    <hr />
                                    <div className="product__table-desc--m">
                                        <h3>Material Description</h3>
                                        <hr className="product__table-hr" />
                                        <p>{rowData.material_description}</p>
                                    </div>
                                </div>

                                <hr />

                                <div className="product__table-images">
                                    {rowData.images &&
                                        rowData.images.map((image) => {
                                            return (
                                                <div
                                                    className="product__table-image"
                                                    key={image.id}
                                                >
                                                    <img 
                                                        className="product__table-image--img"
                                                        src={`http://127.0.0.1:8000/storage/${image.path}`}
                                                        alt={rowData.name}
                                                    />

                                                    <hr className="product__table-hr" />

                                                    <div className="product__table-image--btns">
                                                        <Button
                                                            variant="outlined"
                                                            startIcon={
                                                                <EditIcon />
                                                            }
                                                            onClick={(e) =>
                                                                handleReplaceDialogOpen(
                                                                    image.id,
                                                                    rowData.id
                                                                )
                                                            }
                                                        >
                                                            Replace Image
                                                        </Button>
                                                        <Button
                                                            variant="outlined"
                                                            color="secondary"
                                                            startIcon={
                                                                <DeleteIcon />
                                                            }
                                                            onClick={(e) =>
                                                                deleteProductImageHandler(
                                                                    image.id
                                                                )
                                                            }
                                                        >
                                                            Delete Image
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    }}
                />
            )}

            <Dialog
                open={openAddDialog}
                aria-labelledby="draggable-dialog-title"
                onClose={handleAddDialogClose}
                fullWidth
            >
                <AddProductScreen
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
                <EditProductScreen
                    setOpenEditDialog={setOpenEditDialog}
                    setRequestData={setRequestData}
                    productId={productId}
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

            <Dialog
                open={openAddProductImageDialog}
                aria-labelledby="draggable-dialog-title"
                onClose={handleAddProductImageDialogClose}
                fullWidth
            >
                <AddProductImageScreen
                    setOpenAddProductImageDialog={setOpenAddProductImageDialog}
                    setRequestData={setRequestData}
                    productId={productId}
                />

                <DialogActions>
                    <Button
                        onClick={handleAddProductImageDialogClose}
                        variant="contained"
                        color="secondary"
                        className="dialog-button"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openReplaceDialog}
                aria-labelledby="draggable-dialog-title"
                onClose={handleReplaceDialogClose}
                fullWidth
            >
                <ReplaceProductImageScreen
                    setOpenReplaceDialog={setOpenReplaceDialog}
                    setRequestData={setRequestData}
                    productImageId={productImageId}
                    productReplaceId={productReplaceId}
                />

                <DialogActions>
                    <Button
                        onClick={handleReplaceDialogClose}
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

export default ProductsScreen;
