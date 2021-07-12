import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNavbar from "../../../components/MainNavbar";
import CategoriesNavbar from "../../../components/CategoriesNavbar";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import "react-alice-carousel/lib/alice-carousel.css";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import {
    Divider,
    Paper,
    Breadcrumbs,
} from "@material-ui/core";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { reviewsListPag } from "../../../actions/reviewActions";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ReviewPaginate from "../../../components/ReviewPaginate";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 345,
    },

    rating: {
        color: "#2F4F4F",
    },

    formControl: {
        margin: "0 auto",
        minWidth: "100%",
    },

    card: {
        padding: "10px",

        "&:not(:last-child)": {
            marginBottom: "15px",
        },
    },

    accord: {
        width: "60%",
        marginTop: "10px",
    },

    bread: {
        marginBottom: "30px",
    },

    breadLink1: {
        color: "rgba(58, 68, 107, 0.85)",

        "&:hover": {
            color: "#2F4F4F",
        },
    },

    breadLink2: {
        color: "#3a446b",
        fontSize: "20px",

        "&:hover": {
            color: "#2F4F4F",
        },
    },
});

const ReviewsScreen = ({ match }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const page = match.params.page || 1;

    const reviewListPag = useSelector((state) => state.reviewListPag);
    const { reviews, loading, error } = reviewListPag;

    let current_page = reviews && reviews.current_page;
    let last_page = reviews && reviews.last_page;

    useEffect(() => {
        dispatch(reviewsListPag(match.params.id, page));
    }, [match, dispatch, page]);

    return (
        <>
            <MainNavbar />
            <CategoriesNavbar />

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error}</Message>
            ) : (
                <section className="wrapper">
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        <Link className={classes.breadLink1} to={`/`}>
                            Home
                        </Link>

                        <Link
                            className={classes.breadLink1}
                            to={`/product/${match.params.id}`}
                        >
                            {reviews.data &&
                                reviews.data[0].products.name}
                        </Link>

                        <Link
                            className={classes.breadLink2}
                            to={`/reviews/product/${match.params.id}`}
                            aria-current="page"
                        >
                            Reviews
                        </Link>
                    </Breadcrumbs>

                    <Divider className={classes.bread} />

                    <div className="reviews">
                        <h3>Reviews</h3>

                        <Divider />

                        <div className="review">
                            {reviews.data &&
                                reviews.data.map((review) => (
                                    <Paper
                                        key={review.id}
                                        className={classes.card}
                                    >
                                        <div className="review-top">
                                            <h5>{review.name}</h5>
                                            <Rating
                                                size="small"
                                                name="rating"
                                                value={parseFloat(
                                                    review.rating
                                                )}
                                                precision={0.5}
                                                readOnly
                                                className={classes.rating}
                                            />
                                        </div>
                                        <Divider />

                                        <div className="review-bottom">
                                            <p className="review-bottom--comment">
                                                {review.comment}
                                            </p>

                                            <p className="review-bottom--date">
                                                {review.created_at.substring(
                                                    0,
                                                    10
                                                )}
                                            </p>
                                        </div>

                                        {review.admin_name ||
                                        review.admin_comment ? (
                                            <>
                                                <Divider />

                                                <div className="review-bottom">
                                                    <p>
                                                        User comment was edited
                                                        by{" "}
                                                        <span className="reviewEdited">
                                                            {review.admin_name}
                                                        </span>{" "}
                                                        because of the following
                                                        motives:{" "}
                                                        <span className="reviewEdited">
                                                            {
                                                                review.admin_comment
                                                            }
                                                        </span>
                                                    </p>

                                                    <p>
                                                        Date of edit:{" "}
                                                        {review.updated_at.substring(
                                                            0,
                                                            10
                                                        )}
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </Paper>
                                ))}
                        </div>
                        {reviews.data && reviews.data.length > 0 && !loading && (
                            <div className="pagination">
                                <ReviewPaginate
                                    product={match.params.id}
                                    page={current_page}
                                    count={last_page}
                                />
                            </div>
                        )}
                    </div>
                </section>
            )}
            <Footer />
        </>
    );
};

export default ReviewsScreen;
