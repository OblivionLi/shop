import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
    adminListReviews,
    editReview,
    getEditReviewDetails,
} from "../../../actions/reviewActions";
import {
    REVIEW_EDIT_RESET,
    REVIEW_GET_DETAILS_RESET,
} from "../../../constants/reviewConstants";

const EditReviewScreen = ({ setOpenEditDialog, setRequestData, reviewId }) => {
    const [comment, setComment] = useState("");
    const [adminComment, setAdminComment] = useState("");

    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    const reviewGetEditDetails = useSelector(
        (state) => state.reviewGetEditDetails
    );
    const { loading, error, review } = reviewGetEditDetails;

    const reviewEdit = useSelector((state) => state.reviewEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = reviewEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: REVIEW_EDIT_RESET });
            dispatch({ type: REVIEW_GET_DETAILS_RESET });
        } else {
            if (!review.name || review.id != reviewId) {
                dispatch(getEditReviewDetails(reviewId));
            } else {
                setComment(review.comment);
                setAdminComment(review.admin_comment);
            }
        }

        if (successModal) {
            dispatch(adminListReviews());
        }
    }, [dispatch, reviewId, review, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editReview(reviewId, comment, adminComment));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Review with id "${reviewId}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });

    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Review</DialogTitle>
            <Divider />
            <DialogContent>
                {loadingEdit && <Loader />}
                {errorEdit && <Message variant="error">{errorEdit}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div className="form">
                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    label="User Comment"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={comment}
                                    onChange={(e) =>
                                        setComment(e.target.value)
                                    }
                                    name="comment"
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    label="Admin Comment"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={adminComment ? adminComment : ''}
                                    onChange={(e) =>
                                        setAdminComment(e.target.value)
                                    }
                                    name="admin_comment"
                                />
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Edit Review
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
}

export default EditReviewScreen
