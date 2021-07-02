import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getOrderDetails,
    deliverOrder,
    payOrder,
} from "../../../actions/orderActions";
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET,
} from "../../../constants/orderConstants";
import MainNavbar from "../../../components/MainNavbar";
import CategoriesNavbar from "../../../components/CategoriesNavbar";
import { Divider, Button, Breadcrumbs, Paper } from "@material-ui/core";
import Footer from "../../../components/Footer";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Error404 from "../../../components/Error404";
import MaterialTable from "material-table";
import CheckoutFormScreen from "./CheckoutFormScreen";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

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

    checkout: {
        margin: "20px 0",
    },
});

const PUBLIC_KEY =
    "pk_test_51J7JDFH7KVlnwo43991XXPrSOWpQYenCEMAY6S1dT5eP6WLOWP7W4z6O9nEhtr1rbmpASbvA8r4lKMr3da5sN0nd00VuikAH3F";

const stripePromise = loadStripe(PUBLIC_KEY);

const ShowOrderScreen = ({ match, history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const orderId = match.params.id;
    const [perms, setPerms] = useState(false);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    // Cart
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
        if (!userInfo) {
            history.push("/login");
        }

        if (!order || successDeliver || order.id != orderId || successPay) {
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        }

        if (
            (order && order.user_id == userInfo.id) ||
            userInfo.role[0].is_admin > 0
        ) {
            setPerms(true);
        }
    }, [dispatch, userInfo, order, successDeliver, successPay]);

    const deliverHandler = () => {
        dispatch(deliverOrder(order.id));
    };

    return loading ? (
        <Loader />
    ) : perms ? (
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
                        to={`/order/${orderId}`}
                        aria-current="page"
                    >
                        Order
                    </Link>
                </Breadcrumbs>

                <Divider className={classes.bread} />

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <Paper className={classes.details}>
                        <h3>Order Details</h3>
                        <Divider />

                        <div className="placeorder">
                            <div className="placeorder-userDetails">
                                <p>
                                    Sending to: {userInfo.address[0].name}{" "}
                                    {userInfo.address[0].surname}
                                </p>

                                <Divider />

                                <p>
                                    Your Address: {userInfo.address[0].country},{" "}
                                    {userInfo.address[0].city},{" "}
                                    {userInfo.address[0].address},{" "}
                                    {userInfo.address[0].postal_code}
                                </p>

                                <Divider />

                                <p>
                                    Your Phone Number:{" "}
                                    {userInfo.address[0].phone_number}
                                </p>

                                <Divider />

                                <p>Deliver Status: </p>
                                {order.is_delivered > 0 ? (
                                    <Message variant="success">
                                        Delivered on {order.delivered_at}
                                    </Message>
                                ) : (
                                    <Message variant="warning">
                                        Not Delivered
                                    </Message>
                                )}

                                <Divider />

                                <p>Pay Status: </p>
                                {order.is_paid > 0 ? (
                                    <Message variant="success">
                                        Paid on {order.paid_at}
                                    </Message>
                                ) : (
                                    <Message variant="warning">
                                        Not Paid
                                    </Message>
                                )}

                                <div className="cartList">
                                    <MaterialTable
                                        title="Ordered Items"
                                        columns={[
                                            {
                                                title: "Name",
                                                field: "name",
                                                render: (product) => {
                                                    {
                                                        return (
                                                            <Link
                                                                to={`/product/${product.id}`}
                                                            >
                                                                {product.name}
                                                            </Link>
                                                        );
                                                    }
                                                },
                                            },
                                            {
                                                title: "Brand",
                                                field: "brand.brand_name",
                                            },
                                            {
                                                title: "Product Code",
                                                field: "product_code",
                                            },
                                            {
                                                title: "Size",
                                                field: "sizes[0].size_name",
                                            },
                                            {
                                                title: "Color",
                                                field: "colors[0].color_name",
                                            },
                                            {
                                                title: "Discount",
                                                field: "discount",
                                                render: (order) => {
                                                    {
                                                        return `${order.discount} %`;
                                                    }
                                                },
                                            },
                                            {
                                                title: "Price",
                                                field: "price",
                                                render: (order) => {
                                                    {
                                                        return (
                                                            <>
                                                                <span>
                                                                    &euro;
                                                                    {(
                                                                        order.price -
                                                                        (order.price *
                                                                            order.discount) /
                                                                            100
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </span>
                                                                {"   "}
                                                                <strike>
                                                                    &euro;
                                                                    {
                                                                        order.price
                                                                    }
                                                                </strike>
                                                            </>
                                                        );
                                                    }
                                                },
                                            },
                                            {
                                                title: "Quantity",
                                                field: "pivot.qty",
                                            },
                                        ]}
                                        data={order && order.products}
                                        options={{
                                            search: false,
                                        }}
                                    />
                                </div>
                            </div>

                            <Paper className="checkout-tabel">
                                <div>
                                    <h3>Order Summary</h3>
                                </div>

                                <div>
                                    <p className="divider">Total to Pay:</p>
                                    <span color="inherit">
                                        &euro;
                                        {order.total_price}
                                    </span>
                                </div>

                                <div>
                                    <p className="divider">Order Status</p>
                                    <Message
                                        variant={
                                            order.status === "PENDING"
                                                ? "warning"
                                                : "success"
                                        }
                                    >
                                        {order.status}
                                    </Message>
                                </div>

                                {error && (
                                    <Message variant="error">{error}</Message>
                                )}

                                <hr className="divider" />

                                {loadingDeliver && <Loader />}
                                {userInfo &&
                                    userInfo.role &&
                                    userInfo.role[0].name == "Admin" &&
                                    //order.is_paid == 0 &&
                                    order.is_delivered == 0 && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={deliverHandler}
                                        >
                                            Mark as Delivered
                                        </Button>
                                    )}

                                {order.is_paid == 0 && (
                                    <div className={classes.checkout}>
                                        {loadingPay && <Loader />}
                                        <Elements stripe={stripePromise}>
                                            <CheckoutFormScreen
                                                orderId={orderId}
                                                totalPrice={order.total_price}
                                            />
                                        </Elements>
                                    </div>
                                )}
                            </Paper>
                        </div>
                    </Paper>
                )}
            </section>

            <Footer />
        </>
    ) : (
        <Error404 />
    );
};
export default ShowOrderScreen;
