import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Dialog, DialogActions, Link, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Swal from "sweetalert2";
import Moment from "react-moment";
import { adminListReviews, deleteReview } from "../../../actions/reviewActions";
import EditReviewScreen from "./EditReviewScreen";

const ReviewsScreen = ({ history }) => {
    const dispatch = useDispatch();
    const user_perms = [];

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [requestData, setRequestData] = useState(new Date());

    const reviewAdminList = useSelector((state) => state.reviewAdminList);
    const { loading, error, reviews } = reviewAdminList;

    const reviewDelete = useSelector((state) => state.reviewDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = reviewDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [isAdmin, setIsAdmin] = useState(false);
    const [reviewId, setReviewId] = useState(null);

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            if (!user_perms.includes("admin_view_reviews")) {
                history.push("/admin");
                Swal.fire(
                    "Sorry!",
                    `You don't have access to this page.`,
                    "warning"
                );
            } else {
                setIsAdmin(true);
                dispatch(adminListReviews());
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
        if (user_perms.includes("admin_edit_reviews")) {
            setOpenEditDialog(true);
            setReviewId(id);
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

    const deleteReviewHandler = (id) => {
        user_perms.includes("admin_delete_reviews")
            ? Swal.fire({
                  title: "Are you sure?",
                  text: "You can't recover this review after deletion!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                  cancelButtonColor: "#d33",
                  reverseButtons: true,
              }).then((result) => {
                  if (result.value) {
                      dispatch(deleteReview(id));
                      setRequestData(new Date());
                      Swal.fire(
                          "Deleted!",
                          "The review with the id " + id + " has been deleted.",
                          "success"
                      );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          "Cancelled",
                          `The selected review is safe, don't worry :)`,
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
                    title="Reviews List"
                    columns={[
                        {
                            title: "Product Reviewed",
                            field: "reviews.products.name",
                            render: (reviews) => {
                                {
                                    return reviews.products.name;
                                }
                            },
                        },
                        {
                            title: "Review By",
                            field: "reviews.name",
                            render: (reviews) => {
                                {
                                    return reviews.name;
                                }
                            },
                        },
                        {
                            title: "User Product Rated",
                            field: "reviews.rating",
                            render: (reviews) => {
                                {
                                    return reviews.rating;
                                }
                            },
                        },
                        {
                            title: "Admin Edit",
                            field: "reviews.admin_name",
                            render: (reviews) => {
                                {
                                    return reviews.admin_name ? reviews.admin_name : ' - ';
                                }
                            },
                        },
                        {
                            title: 'Created At',
                            field: 'created_at',
                            render: reviews => {
                                {
                                    return (
                                        <Moment format='DD/MM/YYYY HH:mm'>
                                            {reviews.created_at}
                                        </Moment>
                                    )
                                }
                            }
                        },
                        {
                            title: 'Updated At',
                            field: 'updated_at',
                            render: reviews => {
                                {
                                    return (
                                        <Moment format='DD/MM/YYYY HH:mm'>
                                            {reviews.updated_at}
                                        </Moment>
                                    )
                                }
                            }
                        },
                    ]}
                    data={reviews}
                    actions={[
                        {
                            icon: "edit",
                            tooltip: "Edit Review",
                            onClick: (event, rowData) => {
                                handleEditDialogOpen(rowData.id);
                            },
                        },
                        {
                            icon: "delete",
                            tooltip: "Delete Review",
                            onClick: (event, rowData) => {
                                deleteReviewHandler(rowData.id);
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
                                        <h3>User review comment</h3>
                                        <hr className="product__table-hr" />
                                        <p>
                                            {rowData.comment}
                                        </p>
                                    </div>
                                    <hr />
                                    <div className="product__table-desc--d">
                                        <h3>Admin review updated comment</h3>
                                        <hr className="product__table-hr" />
                                        <p>
                                            {rowData.admin_comment ? rowData.admin_comment : `No admin edited this user's review yet.`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                />
            )}

            <Dialog
                open={openEditDialog}
                aria-labelledby="draggable-dialog-title"
                onClose={handleEditDialogClose}
                fullWidth
            >
                <EditReviewScreen
                    setOpenEditDialog={setOpenEditDialog}
                    setRequestData={setRequestData}
                    reviewId={reviewId}
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

export default ReviewsScreen;
