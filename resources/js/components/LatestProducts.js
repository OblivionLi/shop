import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Divider,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { orderByListProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 345,
    },

    actions: {
        display: "flex",
        justifyContent: "space-between",
        color: "#3a446b",
    },

    box: {
        marginTop: "5px",
    },

    title: {
        color: "#3a446b",
    },

    rating: {
        color: "#2F4F4F",
    },
});

const LatestProducts = () => {
    const classes = useStyles();
    const [value, setValue] = useState(2.5);

    const dispatch = useDispatch();

    const productOrderByList = useSelector((state) => state.productOrderByList);
    const { products, loading, error } = productOrderByList;

    useEffect(() => {
        dispatch(orderByListProducts());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error}</Message>
            ) : (
                <>
                    {/* display latest 3  products */}
                    <div className="products">
                        <h3>Latest Products</h3>
                        <Divider />

                        <div className="wrapper__products">
                            {products.latestProducts &&
                                products.latestProducts.map((latestProduct) => (
                                    <Card
                                        className={classes.root}
                                        key={latestProduct.id}
                                    >
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Product 1"
                                                height="300"
                                                image={`http://127.0.0.1:8000/storage/${latestProduct.images[0].path}`}
                                                title="Product 1"
                                            />
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="h2"
                                                    className={classes.title}
                                                >
                                                    {latestProduct.name}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions
                                            className={classes.actions}
                                        >
                                            <Button
                                                size="small"
                                                color="inherit"
                                            >
                                                <Link
                                                    to={`/product/${latestProduct.id}`}
                                                    className="admin--links"
                                                >
                                                    View
                                                </Link>
                                            </Button>
                                            <span color="inherit">
                                                &euro;{latestProduct.price}
                                            </span>
                                            {/* <span color="inherit">&euro;9.99</span> */}
                                            <Box
                                                component="fieldset"
                                                borderColor="transparent"
                                                className={classes.box}
                                            >
                                                <Rating
                                                    size="small"
                                                    readOnly
                                                    value={parseFloat(
                                                        latestProduct.rating
                                                    )}
                                                    text={`${latestProduct.total_reviews} reviews`}
                                                    precision={0.5}
                                                    className={classes.rating}
                                                />
                                            </Box>
                                        </CardActions>
                                    </Card>
                                ))}
                        </div>
                    </div>

                    {/* display latest 3 discounted products */}
                    <div className="products">
                        <h3>Latest Discounted Products</h3>
                        <Divider />

                        <div className="wrapper__products">
                            {products.mostDiscountedProducts &&
                                products.mostDiscountedProducts.map(
                                    (mostDiscountedProduct) => (
                                        <Card
                                            className={classes.root}
                                            key={mostDiscountedProduct.id}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    alt="Product 1"
                                                    height="300"
                                                    image={`http://127.0.0.1:8000/storage/${mostDiscountedProduct.images[0].path}`}
                                                    title="Product 1"
                                                />
                                                <CardContent>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="h2"
                                                        className={
                                                            classes.title
                                                        }
                                                    >
                                                        {
                                                            mostDiscountedProduct.name
                                                        }
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions
                                                className={classes.actions}
                                            >
                                                <Button
                                                    size="small"
                                                    color="inherit"
                                                >
                                                    <Link
                                                        to={`/product/${mostDiscountedProduct.id}`}
                                                        className="admin--links"
                                                    >
                                                        View
                                                    </Link>
                                                </Button>
                                                <span color="inherit">
                                                    &euro;
                                                    {(
                                                        mostDiscountedProduct.price -
                                                        (mostDiscountedProduct.price *
                                                            mostDiscountedProduct.discount) /
                                                            100
                                                    ).toFixed(2)}
                                                </span>
                                                {" - "}
                                                <strike>
                                                    &euro;
                                                    {
                                                        mostDiscountedProduct.price
                                                    }
                                                </strike>

                                                <Box
                                                    component="fieldset"
                                                    borderColor="transparent"
                                                    className={classes.box}
                                                >
                                                    <Rating
                                                        size="small"
                                                        readOnly
                                                        value={parseFloat(
                                                            mostDiscountedProduct.rating
                                                        )}
                                                        text={`${mostDiscountedProduct.total_reviews} reviews`}
                                                        precision={0.5}
                                                        className={
                                                            classes.rating
                                                        }
                                                    />
                                                </Box>
                                            </CardActions>
                                        </Card>
                                    )
                                )}
                        </div>
                    </div>

                    {/* display most commented products */}
                    <div className="products">
                        <h3>Most Commented Products</h3>
                        <Divider />
                        {/* mostCommentedProducts */}

                        <div className="wrapper__products">
                            {products.mostCommentedProducts &&
                                products.mostCommentedProducts.map(
                                    (mostCommentedProduct) => (
                                        <Card
                                            className={classes.root}
                                            key={mostCommentedProduct.id}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    alt="Product 1"
                                                    height="300"
                                                    image={`http://127.0.0.1:8000/storage/${mostCommentedProduct.images[0].path}`}
                                                    title="Product 1"
                                                />
                                                <CardContent>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="h2"
                                                        className={
                                                            classes.title
                                                        }
                                                    >
                                                        {
                                                            mostCommentedProduct.name
                                                        }
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions
                                                className={classes.actions}
                                            >
                                                <Button
                                                    size="small"
                                                    color="inherit"
                                                >
                                                    <Link
                                                        to={`/product/${mostCommentedProduct.id}`}
                                                        className="admin--links"
                                                    >
                                                        View
                                                    </Link>
                                                </Button>
                                                <span color="inherit">
                                                    {
                                                        mostCommentedProduct.total_reviews
                                                    }{" "}
                                                    comments
                                                </span>
                                                <Box
                                                    component="fieldset"
                                                    borderColor="transparent"
                                                    className={classes.box}
                                                >
                                                    <Rating
                                                        size="small"
                                                        readOnly
                                                        value={parseFloat(
                                                            mostCommentedProduct.rating
                                                        )}
                                                        precision={0.5}
                                                        className={
                                                            classes.rating
                                                        }
                                                    />
                                                </Box>
                                            </CardActions>
                                        </Card>
                                    )
                                )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default LatestProducts;
