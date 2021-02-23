import React, { useState } from "react";
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

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },

    actions: {
        display: "flex",
        justifyContent: "space-between",
        color: '#3a446b'
    },

    box: {
        marginTop: "5px",
    },

    title: {
        color: '#3a446b'
    },

    rating: {
        color: '#2F4F4F'
    }
});

const LatestProducts = () => {
    const classes = useStyles();
    const [value, setValue] = useState(2.5);

    return (
        <>
            {/* display latest 3 products */}
            <div className="products">
                <h3>Latest Products</h3>
                <Divider />

                <div className="wrapper__products">
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Product 1"
                                height="300"
                                image="https://via.placeholder.com/300"
                                title="Product 1"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                    className={classes.title}
                                >
                                    Product Name
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.actions}>
                            <Button size="small" color="inherit">
                                View
                            </Button>
                            <span color="inherit">&euro;9.99</span>
                            <Box
                                component="fieldset"
                                borderColor="transparent"
                                className={classes.box}
                            >
                                <Rating size="small" readOnly value={value} precision={0.5} className={classes.rating} />
                            </Box>
                        </CardActions>
                    </Card>
                </div>
            </div>

            {/* display latest 3 discounted products */}
            <div className="products">
                <h3>Latest Discounted Products</h3>
                <Divider />

                <div className="wrapper__products">
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Product 1"
                                height="300"
                                image="https://via.placeholder.com/300"
                                title="Product 1"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                    className={classes.title}
                                >
                                    Product Name
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.actions}>
                            <Button size="small" color="inherit">
                                View
                            </Button>
                            <span color="inherit">&euro;7.99</span>
                            {" - "}
                            <strike>&euro;9.99</strike>

                            <Box
                                component="fieldset"
                                borderColor="transparent"
                                className={classes.box}
                            >
                                <Rating size="small" value={value} readOnly />
                            </Box>
                        </CardActions>
                    </Card>
                </div>
            </div>

            {/* display most commented products */}
            <div className="products">
                <h3>Most Commented Products</h3>
                <Divider />

                <div className="wrapper__products">
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Product 1"
                                height="300"
                                image="https://via.placeholder.com/300"
                                title="Product 1"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                    className={classes.title}
                                >
                                    Product Name
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.actions}>
                            <Button size="small" color="inherit">
                                View
                            </Button>
                            <span color="inherit">300 comments</span>
                            <Box
                                component="fieldset"
                                borderColor="transparent"
                                className={classes.box}
                            >
                                <Rating size="small" value={value} readOnly />
                            </Box>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default LatestProducts;
