import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../../components/MainNavbar";
import Footer from "../../../components/Footer";
import { Breadcrumbs, Paper, Divider } from "@material-ui/core";
import MaterialTable from "material-table";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Loader from "../../../components/Loader";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 345,
    },

    formControl: {
        margin: "0 auto",
        minWidth: "100%",
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

const ProfileScreen = ({ history }) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push("/");
        } else {
            setLoading(false);
        }
    }, [userInfo]);

    return (
        <>
            <Navigation />
            <section className="profile">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Link className={classes.breadLink1} to={`/`}>
                        Home
                    </Link>

                    <Link
                        className={classes.breadLink2}
                        to={`/profile`}
                        aria-current="page"
                    >
                        Profile
                    </Link>
                </Breadcrumbs>

                <Divider className={classes.bread} />

                {loading ? (
                    <Loader />
                ) : (
                    <MaterialTable
                        title="My Orders List"
                        columns={[
                            {
                                title: "Go to Order",
                                field: "id",
                                render: (order) => {
                                    return (
                                        <a href={`/order/${order.id}`} target="_blank">
                                            Order Details
                                        </a>
                                    );
                                },
                            },
                            {
                                title: "Status",
                                field: "status",
                                render: (order) => {
                                    return order.status == "PENDING" ? (
                                        <span className="notPaid">
                                            {order.status}
                                        </span>
                                    ) : order.status == "PAID" ? (
                                        <span className="isPaid">
                                            {order.status}
                                        </span>
                                    ) : order.status == "DELIVERED" ? (
                                        <span className="delivered">
                                            {order.status}
                                        </span>
                                    ) : (
                                        <span className="failed">
                                            ORDER FAILED
                                        </span>
                                    );
                                },
                            },
                            {
                                title: "Total to Pay",
                                field: "total_price",
                                render: (orders) => {
                                    return (
                                        <span>&euro; {orders.total_price}</span>
                                    );
                                },
                            },
                            {
                                title: "Is paid?",
                                field: "is_paid",
                                render: (orders) => {
                                    return orders.is_paid < 1 ? (
                                        <span className="notPaid">No</span>
                                    ) : (
                                        <span className="isPaid">Yes</span>
                                    );
                                },
                            },
                            {
                                title: "Is delivered?",
                                field: "is_delivered",
                                render: (orders) => {
                                    return orders.is_delivered < 1 ? (
                                        <span className="notPaid">No</span>
                                    ) : (
                                        <span className="delivered">Yes</span>
                                    );
                                },
                            },
                            {
                                title: "Paid At",
                                field: "paid_at",
                                render: (orders) => {
                                    return (
                                        <>
                                            {!orders.paid_at ? (
                                                "--/--/---- --/--"
                                            ) : (
                                                <Moment format="DD/MM/YYYY HH:mm">
                                                    {orders.paid_at}
                                                </Moment>
                                            )}
                                        </>
                                    );
                                },
                            },
                            {
                                title: "Delivered At",
                                field: "delivered_at",
                                render: (orders) => {
                                    return (
                                        <>
                                            {!orders.delivered_at ? (
                                                "--/--/---- --/--"
                                            ) : (
                                                <Moment format="DD/MM/YYYY HH:mm">
                                                    {orders.delivered_at}
                                                </Moment>
                                            )}
                                        </>
                                    );
                                },
                            },
                            {
                                title: "Created At",
                                field: "created_at",
                                render: (orders) => {
                                    return (
                                        <Moment format="DD/MM/YYYY HH:mm">
                                            {orders.created_at}
                                        </Moment>
                                    );
                                },
                            },
                        ]}
                        data={userInfo && userInfo.orders}
                        options={{
                            actionsColumnIndex: -1,
                        }}
                    />
                )}
            </section>
            <Footer />
        </>
    );
};

export default ProfileScreen;
