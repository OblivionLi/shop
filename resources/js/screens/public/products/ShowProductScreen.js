import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNavbar from "../../../components/MainNavbar";
import CategoriesNavbar from "../../../components/CategoriesNavbar";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Rating from "@material-ui/lab/Rating";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    getEditProductDetails,
    createProductReview,
} from "../../../actions/productActions";
import Swal from "sweetalert2";
import {
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Button,
    Paper,
    TextField,
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Breadcrumbs,
} from "@material-ui/core";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../../constants/productConstants";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

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

const ShowProductScreen = ({ history, match }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [qty, setQty] = useState(1); 

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productGetEditDetails = useSelector(
        (state) => state.productGetEditDetails
    );
    const { product, loading, error } = productGetEditDetails;
    const { data } = product;

    const productReviewCreate = useSelector(
        (state) => state.productReviewCreate
    );
    const { success: successProductReview, error: errorProductReview } =
        productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }

        dispatch(getEditProductDetails(match.params.id));
    }, [match, dispatch, successProductReview]);

    const addToCartHandler = () => {
        history.push(
            `/cart/${match.params.id}?qty=${qty}&size=${size}&color=${color}`
        );
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview(
                match.params.id,
                userInfo.id,
                userInfo.name,
                rating,
                comment
            )
        );

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Review request sent successfully.`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

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
                            className={classes.breadLink2}
                            to={`/product/${match.params.id}`}
                            aria-current="page"
                        >
                            {data && data.name}
                        </Link>
                    </Breadcrumbs>

                    <Divider className={classes.bread} />

                    <div className="product">
                        <div className="product-carousel">
                            <AliceCarousel
                                startIndex={1}
                                fadeOutAnimation={true}
                                mouseDragEnabled={true}
                            >
                                {data &&
                                    data.images.map((image) => (
                                        <img
                                            className="product-carousel-img"
                                            key={image.id}
                                            src={`http://127.0.0.1:8000/storage/${image.path}`}
                                        />
                                    ))}
                            </AliceCarousel>
                        </div>

                        <Paper className="product-actions">
                            <div className="product-rating">
                                {data && data.total_quantities > 1 ? (
                                    <p className="inStock">
                                        &#8226; Product in stock.
                                    </p>
                                ) : (
                                    <p className="notInStock">
                                        &#8226; Product is not in stock. Please
                                        wait.
                                    </p>
                                )}

                                <Rating
                                    size="small"
                                    name="rating"
                                    value={parseFloat(data && data.rating)}
                                    text={`${
                                        data && data.total_reviews
                                    } reviews`}
                                    precision={0.5}
                                    className={classes.rating}
                                    readOnly
                                />
                                <Divider />
                            </div>

                            <div className="product-details">
                                <div>
                                    <h3 className="divider">Brand:</h3>
                                    <h3>
                                        {data &&
                                            data.brand &&
                                            data &&
                                            data.brand.brand_name}
                                    </h3>
                                </div>

                                <div>
                                    <h4 className="divider">Product Name:</h4>
                                    <h4>{data && data.name}</h4>
                                </div>

                                <div>
                                    <p className="divider">Product Code:</p>
                                    <p>{data && data.product_code}</p>
                                </div>
                            </div>
                        </Paper>

                        {data && data.total_quantities > 0 && (
                            <Paper className="product-tabel">
                                <div>
                                    <p className="divider">Discount:</p>
                                    <p>{data && data.discount} %</p>
                                </div>

                                <div>
                                    <p className="divider">Price:</p>
                                    <span color="inherit">
                                        &euro;
                                        {(
                                            data &&
                                            data.price -
                                                (data.price * data.discount) /
                                                    100
                                        ).toFixed(2)}
                                    </span>
                                    {" - "}
                                    <strike>
                                        &euro;
                                        {data && data.price}
                                    </strike>
                                </div>

                                <hr className="divider" />

                                <div className="product-tabel-form">
                                    <form>
                                        <div className="form__field">
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">
                                                    Sizes
                                                </FormLabel>
                                                <RadioGroup
                                                    aria-label="size"
                                                    name="size"
                                                    value={size}
                                                    onChange={(e) =>
                                                        setSize(e.target.value)
                                                    }
                                                    required
                                                >
                                                    {data &&
                                                        data.sizes &&
                                                        data &&
                                                        data.sizes.map((size) =>
                                                            size.pivot
                                                                .size_quantity >
                                                            0 ? (
                                                                <FormControlLabel
                                                                    key={
                                                                        size.id
                                                                    }
                                                                    value={
                                                                        size.size_name
                                                                    }
                                                                    control={
                                                                        <Radio
                                                                            required
                                                                        />
                                                                    }
                                                                    label={`${size.size_name} (${size.pivot.size_quantity})`}
                                                                />
                                                            ) : (
                                                                <FormControlLabel
                                                                    key={
                                                                        size.id
                                                                    }
                                                                    value={
                                                                        size.size_name
                                                                    }
                                                                    control={
                                                                        <Radio
                                                                            disabled
                                                                        />
                                                                    }
                                                                    label={`${
                                                                        size.size_name
                                                                    } (${
                                                                        size
                                                                            .pivot
                                                                            .size_quantity ==
                                                                            0 &&
                                                                        "0"
                                                                    })`}
                                                                />
                                                            )
                                                        )}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>

                                        <hr className="divider" />

                                        <div className="form__field">
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">
                                                    Colors
                                                </FormLabel>
                                                <RadioGroup
                                                    aria-label="color"
                                                    name="color"
                                                    value={color}
                                                    onChange={(e) =>
                                                        setColor(e.target.value)
                                                    }
                                                >
                                                    {data &&
                                                        data.colors &&
                                                        data &&
                                                        data.colors.map(
                                                            (color) =>
                                                                color.pivot
                                                                    .color_quantity >
                                                                0 ? (
                                                                    <FormControlLabel
                                                                        key={
                                                                            color.id
                                                                        }
                                                                        value={
                                                                            color.color_name
                                                                        }
                                                                        control={
                                                                            <Radio
                                                                                required
                                                                            />
                                                                        }
                                                                        label={`${color.color_name} (${color.pivot.color_quantity})`}
                                                                    />
                                                                ) : (
                                                                    <FormControlLabel
                                                                        key={
                                                                            color.id
                                                                        }
                                                                        value={
                                                                            color.color_name
                                                                        }
                                                                        control={
                                                                            <Radio
                                                                                disabled
                                                                            />
                                                                        }
                                                                        label={`${
                                                                            color.color_name
                                                                        } (${
                                                                            color
                                                                                .pivot
                                                                                .color_quantity ==
                                                                                0 &&
                                                                            "0"
                                                                        })`}
                                                                    />
                                                                )
                                                        )}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>

                                        <hr className="divider" />

                                        <div className="form__field">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="button"
                                                onClick={addToCartHandler}
                                                disabled={data && data.total_quantities == 0 || size === "" || color === ""}
                                            >
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Paper>
                        )}

                        <div className="product-descriptions">
                            <h3>Product Description</h3>

                            <Divider />

                            <p className="product-description">
                                {data && data.description}
                            </p>

                            <h3>Material Description</h3>

                            <Divider />

                            <p className="product-description">
                                {data && data.material_description}
                            </p>
                        </div>
                    </div>

                    <div className="reviews">
                        <h3>Reviews</h3>

                        <Divider />

                        {data && data.reviews.length === 0 && (
                            <Message>No Reviews</Message>
                        )}

                        <Accordion className={classes.accord}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>
                                    Open Review form
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {userInfo ? (
                                    <Paper
                                        className="reviews-form"
                                        elevation={3}
                                    >
                                        <form onSubmit={submitHandler}>
                                            <div className="form">
                                                <div className="form__field rating-form">
                                                    <Box
                                                        component="fieldset"
                                                        mb={3}
                                                        borderColor="transparent"
                                                    >
                                                        <Typography component="legend">
                                                            Please Rate our
                                                            product
                                                        </Typography>
                                                        {errorProductReview && (
                                                            <Message variant="error">
                                                                {
                                                                    errorProductReview
                                                                }
                                                            </Message>
                                                        )}
                                                        <Divider />

                                                        <Rating
                                                            size="small"
                                                            name="Rating Label"
                                                            precision={0.5}
                                                            value={rating}
                                                            onChange={(
                                                                e,
                                                                newValue
                                                            ) => {
                                                                setRating(
                                                                    newValue
                                                                );
                                                            }}
                                                            className={
                                                                classes.rating
                                                            }
                                                            required
                                                        />
                                                    </Box>
                                                </div>

                                                <div className="form__field">
                                                    <TextField
                                                        variant="outlined"
                                                        label="Your comment"
                                                        multiline
                                                        rows={4}
                                                        fullWidth
                                                        onChange={(e) =>
                                                            setComment(
                                                                e.target.value
                                                            )
                                                        }
                                                        name="comment"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                name="submit"
                                                type="submit"
                                                fullWidth
                                            >
                                                Add Review
                                            </Button>
                                        </form>
                                    </Paper>
                                ) : (
                                    <Message variant="error">
                                        Please <Link to="/login">sign in</Link>{" "}
                                        to write a review.
                                    </Message>
                                )}
                            </AccordionDetails>
                        </Accordion>

                        <div className="review">
                            {data &&
                                data.reviews.map((review) => (
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
                        {data && data.reviews.length > 5 ? (
                            <Button size="small" color="inherit">
                                <Link
                                    to={`/reviews/product/${match.params.id}`}
                                    className="admin--links"
                                >
                                    View all Reviews
                                </Link>
                            </Button>
                        ) : (
                            ""
                        )}
                    </div>
                </section>
            )}
            <Footer />
        </>
    );
};

export default ShowProductScreen;
