import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/Footer";
import MainNavbar from "../../../components/MainNavbar";
import CategoriesNavbar from "../../../components/CategoriesNavbar";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import {
    Divider,
    Breadcrumbs,
    Paper,
    Typography,
    FormControlLabel,
    Checkbox,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Rating from "@material-ui/lab/Rating";
import ProductTypePaginate from "../../../components/ProductTypePaginate";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 345,
    },

    bread: {
        marginBottom: "50px",
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

    formControl: {
        margin: 1,
        minWidth: 120,
    },

    selectEmpty: {
        marginTop: 2,
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

const ProductsListByTypeScreen = ({ history, match }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const type = match.params.type;
    const previousType = type;
    const page = match.params.page || 1;

    const [prices, setPrices] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState({
        prices: [],
        brands: [],
        sizes: [],
        colors: [],
    });
    const [load, setLoad] = useState(true);

    let current_page = products && products.current_page;
    let last_page = products && products.last_page;

    useEffect(() => {
        if (type === previousType) {
            setLoad(true);
        }

        axios
            .get(`/api/products/type/${type}?page=${page}`, {
                params: selected,
            })
            .then((response) => {
                setProducts(response.data);
                setLoad(false);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .get(`/api/brands/type/${type}`, {
                params: _.omit(selected, "brands"),
            })
            .then((response) => {
                setBrands(response.data);
                setLoad(false);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .get(`/api/colors/type/${type}`, {
                params: _.omit(selected, "colors"),
            })
            .then((response) => {
                setColors(response.data);
                setLoad(false);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .get("/api/prices", {
                params: _.omit(selected, "prices"),
            })
            .then((response) => {
                setPrices(response.data);
                setLoad(false);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .get(`/api/sizes/type/${type}`, {
                params: _.omit(selected, "sizes"),
            })
            .then((response) => {
                setSizes(response.data);
                setLoad(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [match, dispatch, selected]);

    const handlePricesSelected = (e) => {
        let value = e.target.value;
        let checked = e.target.checked;

        if (checked) {
            setSelected((prevState) => {
                return {
                    ...prevState,
                    prices: (prevState.prices = [...prevState.prices, value]),
                };
            });
        } else {
            setSelected((prevState) => {
                return {
                    ...prevState,
                    prices: prevState.prices.filter(
                        (prices) => prices !== value
                    ),
                };
            });
        }
        setLoad(true);
    };

    const handleBrandsSelected = (e) => {
        let value = e.target.value;
        let checked = e.target.checked;

        if (checked) {
            setSelected((prevState) => {
                return {
                    ...prevState,
                    brands: (prevState.brands = [...prevState.brands, value]),
                };
            });
        } else {
            setSelected((prevState) => {
                return {
                    ...prevState,
                    brands: prevState.brands.filter(
                        (brands) => brands !== value
                    ),
                };
            });
        }
        setLoad(true);
    };

    const handleColorsSelected = (e) => {
        let value = e.target.value;
        let checked = e.target.checked;

        if (checked) {
            setSelected((prevState) => {
                return {
                    ...prevState,
                    colors: (prevState.colors = [...prevState.colors, value]),
                };
            });
        } else {
            setSelected((prevState) => {
                return {
                    ...prevState,
                    colors: prevState.colors.filter(
                        (colors) => colors !== value
                    ),
                };
            });
        }
        setLoad(true);
    };

    const handleSizesSelected = (e) => {
        let value = e.target.value;
        let checked = e.target.checked;

        if (checked) {
            setSelected((prevState) => {
                return {
                    ...prevState,
                    sizes: (prevState.sizes = [...prevState.sizes, value]),
                };
            });
        } else {
            setSelected((prevState) => {
                return {
                    ...prevState,
                    sizes: prevState.sizes.filter((sizes) => sizes !== value),
                };
            });
        }
        setLoad(true);
    };

    return (
        <>
            <MainNavbar />
            <CategoriesNavbar />

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
                        to={`/products/${type}`}
                        aria-current="page"
                    >
                        {type.toUpperCase()}
                    </Link>
                </Breadcrumbs>
                <Divider className={classes.bread} />

                <div className="product-list">
                    <Paper className="product-list--sidebar">
                        <>
                            <h2>Filter</h2>
                            <Divider />

                            <h4>Price</h4>
                            <Divider />

                            {prices.map((price, index) => (
                                <div key={price.name}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={index}
                                                onChange={(e) =>
                                                    handlePricesSelected(e)
                                                }
                                                name="price"
                                            />
                                        }
                                        label={`${price.name}`}
                                    />
                                </div>
                            ))}

                            <h4>Brand</h4>
                            <Divider />

                            {brands.map((brand) => (
                                <div key={brand.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={brand.id}
                                                onChange={(e) =>
                                                    handleBrandsSelected(e)
                                                }
                                                name="brand"
                                            />
                                        }
                                        label={`${brand.brand_name} (
                                                    ${brand.products_count})`}
                                    />
                                </div>
                            ))}

                            <h4>Color</h4>
                            <Divider />

                            {colors.map((color) => (
                                <div key={color.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={color.id}
                                                onChange={(e) =>
                                                    handleColorsSelected(e)
                                                }
                                                name="color"
                                            />
                                        }
                                        label={`${color.color_name} (
                                                    ${color.products_count})`}
                                    />
                                </div>
                            ))}

                            <h4>Size</h4>
                            <Divider />

                            {sizes.map((size) => (
                                <div key={size.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={size.id}
                                                onChange={(e) =>
                                                    handleSizesSelected(e)
                                                }
                                                name="size"
                                            />
                                        }
                                        label={`${size.size_name} (
                                                    ${size.products_count})`}
                                    />
                                </div>
                            ))}
                        </>
                    </Paper>
                    <Paper className="product-list--products">
                        {load ? (
                            <Loader />
                        ) : (
                            <>
                                <div className="product-list--products-filter">
                                    <p>Products List by Type <NavigateNextIcon fontSize="small" /> {type.toUpperCase()}</p>
                                    <h3>
                                        {products.data.length} products found
                                    </h3>
                                </div>

                                <Divider />

                                <div className="product-list--products-items">
                                    {products.data.map((product) => (
                                        <Card
                                            className={classes.root}
                                            key={product.id}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    alt="Product 1"
                                                    height="300"
                                                    image={`http://127.0.0.1:8000/storage/${product.images[0].path}`}
                                                    title={product.name}
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
                                                        {product.name}
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
                                                        to={`/product/${product.id}`}
                                                        className="admin--links"
                                                        target="_blank"
                                                    >
                                                        View
                                                    </Link>
                                                </Button>
                                                <span color="inherit">
                                                    &euro;
                                                    {(
                                                        product.price -
                                                        (product.price *
                                                            product.discount) /
                                                            100
                                                    ).toFixed(2)}
                                                </span>
                                                {" - "}
                                                <strike>
                                                    &euro;
                                                    {product.price}
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
                                                            product.rating
                                                        )}
                                                        text={`${product.total_reviews} reviews`}
                                                        precision={0.5}
                                                        className={
                                                            classes.rating
                                                        }
                                                    />
                                                </Box>
                                            </CardActions>
                                        </Card>
                                    ))}
                                </div>

                                {products.data.length > 0 && !load && (
                                    <div className="pagination">
                                        <ProductTypePaginate
                                            type={type}
                                            page={current_page}
                                            count={last_page}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </Paper>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ProductsListByTypeScreen;
