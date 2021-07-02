import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNavbar from "../../../components/MainNavbar";
import CategoriesNavbar from "../../../components/CategoriesNavbar";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { makeStyles } from "@material-ui/core/styles";
import { createOrder } from "../../../actions/orderActions";
import Swal from "sweetalert2";
import { Divider, Button, Breadcrumbs, Paper } from "@material-ui/core";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MaterialTable from "material-table";
import { getEditAddressDetails } from "../../../actions/addressActions";
import { removeFromCart } from "../../../actions/cartActions";

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

    details: {
        padding: "20px",
    },
});

const PlaceOrderScreen = ({ match, history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const userId = match.params.id;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    const addressGetEditDetails = useSelector(
        (state) => state.addressGetEditDetails
    );
    const { address, loading: addressLoading } = addressGetEditDetails;

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    cart.itemsPriceDiscount = cartItems
        .reduce(
            (acc, item) =>
                acc +
                item.qty * (item.price - (item.price * item.discount) / 100),
            0
        )
        .toFixed(2);

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

    cart.totalPrice = (
        Number(cart.itemsPriceDiscount) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    useEffect(() => {
        if (!userInfo || userInfo.id != userId) {
            history.push("/login");
        }

        if (success) {
            cartItems.map((item) => {
                dispatch(removeFromCart(item.product));
            });
            history.push(`/order/${order.id}`);
        }

        dispatch(getEditAddressDetails(userInfo.id));
    }, [dispatch, userInfo, success]);

    const placeOrderHandler = (e) => {
        e.preventDefault();

        dispatch(
            createOrder(
                userInfo.id,
                cart.cartItems,
                cart.itemsPrice,
                cart.shippingPrice,
                cart.taxPrice,
                cart.totalPrice,
                cart.itemsPriceDiscount
            )
        );

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Order placed!`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
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

                    <Link className={classes.breadLink1} to={`/cart`}>
                        Cart
                    </Link>

                    <Link
                        className={classes.breadLink1}
                        to={`/shipping/${userInfo.id}`}
                    >
                        Shipping
                    </Link>

                    <Link
                        className={classes.breadLink2}
                        to={`/placeorder`}
                        aria-current="page"
                    >
                        Place Order
                    </Link>
                </Breadcrumbs>

                <Divider className={classes.bread} />

                <div>
                    <Paper className={classes.details}>
                        <h3>Shipping Address</h3>
                        <Divider />

                        <div className="placeorder">
                            <div className="placeorder-userDetails">
                                {addressLoading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <p>
                                            Sending to:{" "}
                                            {address &&
                                                address[0] &&
                                                address[0].name}{" "}
                                            {address &&
                                                address[0] &&
                                                address[0].surname}
                                        </p>

                                        <Divider />
                                        <p>
                                            Your Address:{" "}
                                            {address &&
                                                address[0] &&
                                                address[0].country}
                                            ,{" "}
                                            {address &&
                                                address[0] &&
                                                address[0].city}
                                            ,{" "}
                                            {address &&
                                                address[0] &&
                                                address[0].address}
                                            ,{" "}
                                            {address &&
                                                address[0] &&
                                                address[0].postal_code}
                                        </p>
                                        <Divider />
                                        <p>
                                            Your Phone Number:{" "}
                                            {address &&
                                                address[0] &&
                                                address[0].phone_number}
                                        </p>
                                        <Divider />
                                    </>
                                )}
                                <Message variant="info">
                                    Make sure your name, address and phone
                                    number is correct. If it's not then click{" "}
                                    <Link to={`/shipping/${userInfo.id}`}>
                                        HERE
                                    </Link>{" "}
                                    and fix them.
                                </Message>

                                <div className="cartList">
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
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </span>
                                                                {"   "}
                                                                <strike>
                                                                    &euro;
                                                                    {
                                                                        cartItems.price
                                                                    }
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
                                                        return `${cartItems.qty}`;
                                                    }
                                                },
                                            },
                                        ]}
                                        data={cartItems}
                                        options={{
                                            search: false,
                                        }}
                                        detailPanel={(rowData) => {
                                            return (
                                                <div className="product__table">
                                                    <div className="product__table-desc">
                                                        <div className="product__table-desc--d">
                                                            <h3>
                                                                Product Code
                                                            </h3>
                                                            <hr className="product__table-hr" />
                                                            <p>
                                                                {
                                                                    rowData.product_code
                                                                }
                                                            </p>
                                                        </div>
                                                        <hr />
                                                        <div className="product__table-desc--d">
                                                            <h3>
                                                                Product
                                                                Description
                                                            </h3>
                                                            <hr className="product__table-hr" />
                                                            <p>
                                                                {
                                                                    rowData.description
                                                                }
                                                            </p>
                                                        </div>
                                                        <hr />
                                                        <div className="product__table-desc--m">
                                                            <h3>
                                                                Material
                                                                Description
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
                                </div>
                            </div>

                            <Paper className="product-tabel">
                                <div>
                                    <h3>Order Summary</h3>
                                </div>

                                <div>
                                    <p className="divider">Products Ordered:</p>
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
                                    <p className="divider">Subtotal:</p>
                                    <span>
                                        &euro; {cart.itemsPriceDiscount}
                                    </span>
                                    {"  -  "}
                                    <strike>&euro; {cart.itemsPrice}</strike>
                                </div>

                                <div>
                                    <p className="divider">Shipping Tax:</p>
                                    <p>
                                        &euro; {cart.shippingPrice}
                                        <br />
                                        <small>
                                            All orders over &euro; 100 are free
                                            for shipping.
                                        </small>
                                    </p>
                                </div>

                                <div>
                                    <p className="divider">
                                        Total Products Tax:
                                    </p>
                                    <p>
                                        &euro; {cart.taxPrice} <br />{" "}
                                        <small>
                                            tax formula: 0.15 * subtotal
                                        </small>
                                    </p>
                                </div>

                                <div>
                                    <p className="divider">Total with Taxes:</p>
                                    <span color="inherit">
                                        &euro;
                                        {cart.totalPrice}
                                    </span>
                                </div>

                                <hr className="divider" />

                                <div className="product-tabel-form">
                                    <Message variant="info">
                                        Place Order and Pay After.
                                    </Message>

                                    <br />

                                    <form onSubmit={placeOrderHandler}>
                                        <div className="form__field">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                value="submit"
                                                type="submit"
                                            >
                                                Place Order
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Paper>
                        </div>
                    </Paper>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default PlaceOrderScreen;
