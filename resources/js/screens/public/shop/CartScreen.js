import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNavbar from "../../../components/MainNavbar";
import CategoriesNavbar from "../../../components/CategoriesNavbar";
import Message from "../../../components/Message";
import "react-alice-carousel/lib/alice-carousel.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { addToCart, removeFromCart } from "../../../actions/cartActions";
import {
    Divider,
    FormControl,
    MenuItem,
    Select,
    Button,
    Paper,
    Breadcrumbs,
} from "@material-ui/core";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MaterialTable from "material-table";

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

const CartScreen = ({ match, location, history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const params = new URLSearchParams(location.search);
    const productId = match.params.id;
    const qty = params.get("qty");
    const size = params.get("size");
    const color = params.get("color");

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    cart.itemsPrice = cartItems.reduce(
        (acc, item) => acc + parseFloat(item.price),
        0
    );

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }

        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
        history.push("/cart");
    };

    const checkoutHandler = () => {
        history.push(`/shipping/${userInfo.id}`);
    };

    return (
        <>
            <MainNavbar />
            <CategoriesNavbar />

            <section className="wrapper">
                {cartItems && cartItems.length === 0 ? (
                    <Message variant="warning">
                        Your cart is empty <Link to={`/`}>Go Back</Link>
                    </Message>
                ) : (
                    <>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            <Link className={classes.breadLink1} to={`/`}>
                                Home
                            </Link>

                            <Link
                                className={classes.breadLink2}
                                to={`/cart`}
                                aria-current="page"
                            >
                                Cart
                            </Link>
                        </Breadcrumbs>

                        <Divider className={classes.bread} />

                        <div className="cart">
                            <MaterialTable
                                title="Cart List"
                                columns={[
                                    {
                                        title: "Name",
                                        field: "name",
                                        render: (cartItems) => {
                                            {
                                                return (
                                                    <Link
                                                        to={`/product/${cartItems.product}`}
                                                    >
                                                        {cartItems.name}
                                                    </Link>
                                                );
                                            }
                                        },
                                    },
                                    {
                                        title: "Brand",
                                        field: "brand",
                                    },
                                    {
                                        title: "Product Size",
                                        field: "size_name",
                                    },
                                    {
                                        title: "Product Color",
                                        field: "color_name",
                                    },
                                    {
                                        title: "Discount",
                                        field: "discount",
                                        render: (cartItems) => {
                                            {
                                                return `${cartItems.discount} %`;
                                            }
                                        },
                                    },
                                    {
                                        title: "Price",
                                        field: "price",
                                        render: (cartItems) => {
                                            {
                                                return (
                                                    <>
                                                        <span>
                                                            &euro;
                                                            {(
                                                                cartItems.price -
                                                                (cartItems.price *
                                                                    cartItems.discount) /
                                                                    100
                                                            ).toFixed(2)}
                                                        </span>
                                                        {"   "}
                                                        <strike>
                                                            &euro;
                                                            {cartItems.price}
                                                        </strike>
                                                    </>
                                                );
                                            }
                                        },
                                    },
                                    {
                                        title: "Quantity",
                                        field: "qty",
                                        render: (cartItems) => {
                                            {
                                                return (
                                                    <form>
                                                        <FormControl
                                                            required
                                                            variant="outlined"
                                                            className={
                                                                classes.formControl
                                                            }
                                                            size="small"
                                                        >
                                                            <Select
                                                                labelId="quantity"
                                                                id={`quantity-select-${cartItems.product}`}
                                                                value={
                                                                    cartItems.qty
                                                                }
                                                                onChange={(e) =>
                                                                    dispatch(
                                                                        addToCart(
                                                                            cartItems.product,
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                {[
                                                                    ...Array(
                                                                        cartItems.colorQty <
                                                                            cartItems.sizeQty
                                                                            ? cartItems.colorQty
                                                                            : cartItems.sizeQty
                                                                    ).keys(),
                                                                ].map((x) => (
                                                                    <MenuItem
                                                                        key={
                                                                            x +
                                                                            1
                                                                        }
                                                                        value={
                                                                            x +
                                                                            1
                                                                        }
                                                                    >
                                                                        {x + 1}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </form>
                                                );
                                            }
                                        },
                                    },
                                ]}
                                data={cartItems}
                                actions={[
                                    {
                                        icon: "delete",
                                        tooltip: "Remove item from Cart",
                                        onClick: (event, rowData) => {
                                            removeFromCartHandler(
                                                rowData.product
                                            );
                                        },
                                    },
                                ]}
                                options={{
                                    actionsColumnIndex: -1,
                                    search: false,
                                }}
                                detailPanel={(rowData) => {
                                    return (
                                        <div className="product__table">
                                            <div className="product__table-desc">
                                                <div className="product__table-desc--d">
                                                    <h3>Product Code</h3>
                                                    <hr className="product__table-hr" />
                                                    <p>
                                                        {rowData.product_code}
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
                                                    <h3>
                                                        Material Description
                                                    </h3>
                                                    <hr className="product__table-hr" />
                                                    <p>
                                                        {
                                                            rowData.material_description
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }}
                            />
                            <Paper className="product-tabel">
                                <div>
                                    <p className="divider">Subtotal:</p>
                                    <p>
                                        {cartItems.reduce(
                                            (acc, item) =>
                                                acc + Number(item.qty),
                                            0
                                        )}{" "}
                                        items
                                    </p>
                                </div>

                                <div>
                                    <p className="divider">
                                        Total with Discount:
                                    </p>
                                    <span color="inherit">
                                        &euro;
                                        {cartItems
                                            .reduce(
                                                (acc, item) =>
                                                    acc +
                                                    item.qty *
                                                        (item.price -
                                                            (item.price *
                                                                item.discount) /
                                                                100),
                                                0
                                            )
                                            .toFixed(2)}
                                    </span>
                                    {"  -  "}
                                    <strike>
                                        &euro;
                                        {cartItems
                                            .reduce(
                                                (acc, item) =>
                                                    acc + item.qty * item.price,
                                                0
                                            )
                                            .toFixed(2)}
                                    </strike>
                                    <br />
                                    <small>Total without taxes (15%)</small>
                                </div>

                                <hr className="divider" />

                                <div className="product-tabel-form">
                                    <form>
                                        <div className="form__field">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="button"
                                                onClick={checkoutHandler}
                                            >
                                                Proceed to checkout
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Paper>
                        </div>
                    </>
                )}
            </section>
            <Footer />
        </>
    );
};

export default CartScreen;
