import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Paper,
    Link,
    Table,
    Divider,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import MaterialTable from "material-table";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Swal from "sweetalert2";
import Moment from "react-moment";
import { adminListOrders } from "../../../actions/orderActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    
    tableContainer: {
        marginTop: '20px'
    }
});

const OrdersScreen = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user_perms = [];

    const [requestData, setRequestData] = useState(new Date());

    const orderAdminList = useSelector((state) => state.orderAdminList);
    const { loading, error, orders } = orderAdminList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            if (!user_perms.includes("admin_view_orders")) {
                history.push("/admin");
                Swal.fire(
                    "Sorry!",
                    `You don't have access to this page.`,
                    "warning"
                );
            } else {
                setIsAdmin(true);
                dispatch(adminListOrders());
            }
        }
    }, [dispatch, history, userInfo, requestData]);

    if (!Array.isArray(user_perms) || !user_perms.length) {
        userInfo.details[0].roles[0].permissions.map((perm) =>
            user_perms.push(perm.name)
        );
    }

    return (
        <Paper className="paper">
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error}</Message>
            ) : (
                <MaterialTable
                    title="Orders List"
                    columns={[
                        {
                            title: "Order by",
                            field: "user.name",
                        },
                        {
                            title: "Items Bought",
                            field: "products",
                            render: (orders) => {
                                return orders.products.length;
                            },
                        },
                        {
                            title: "Status",
                            field: "status",
                            render: (orders) => {
                                return orders.status == "PENDING" ? (
                                    <span className="notPaid">
                                        {orders.status}
                                    </span>
                                ) : orders.status == "PAID" ? (
                                    <span className="isPaid">
                                        {orders.status}
                                    </span>
                                ) : orders.status == "DELIVERED" ? (
                                    <span className="delivered">
                                        {orders.status}
                                    </span>
                                ) : (
                                    <span className="failed">ORDER FAILED</span>
                                );
                            },
                        },
                        {
                            title: "Total to Pay",
                            field: "total_price",
                            render: (orders) => {
                                return <span>&euro; {orders.total_price}</span>;
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
                    data={orders}
                    options={{
                        actionsColumnIndex: -1,
                    }}
                    detailPanel={(rowData) => {
                        return (
                            <div className="product__table">
                                <div className="product__table-desc">
                                    <div className="product__table-desc--d">
                                        <h3>User Details</h3>
                                        <hr className="product__table-hr" />
                                        <p>
                                            Name:{" "}
                                            {rowData.user.addresses[0].name}
                                            {"  "}
                                            {rowData.user.addresses[0].surname}
                                        </p>
                                        <p>
                                            Address:{" "}
                                            {rowData.user.addresses[0].country}
                                            {", "}
                                            {rowData.user.addresses[0].city}
                                            {", "}
                                            {rowData.user.addresses[0].address}
                                            {", "}
                                            {
                                                rowData.user.addresses[0]
                                                    .postal_code
                                            }
                                        </p>
                                        <p>
                                            Phone Number:{" "}
                                            {
                                                rowData.user.addresses[0]
                                                    .phone_number
                                            }
                                        </p>
                                    </div>
                                </div>
                                <Divider />
                                <div className="product__table-desc">
                                    <div className="product__table-desc--d">
                                        <h3>Ordered Items</h3>
                                        <hr className="product__table-hr" />
                                        <Link href={`/order/${rowData.id}`}>
                                            Display Order
                                        </Link>

                                        <TableContainer component={Paper} className={classes.tableContainer}>
                                            <Table
                                                className={classes.table}
                                                aria-label="simple table"
                                                size="small"
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            Product Name
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            Product Code
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            Discount
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            Full Price
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rowData.products.map(
                                                        (product) => (
                                                            <TableRow
                                                                key={product.id}
                                                            >
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row"
                                                                >
                                                                    <Link
                                                                        href={`/product/${product.id}`}
                                                                    >
                                                                        {
                                                                            product.name
                                                                        }
                                                                    </Link>
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {
                                                                        product.product_code
                                                                    }
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {
                                                                        product.discount
                                                                    } %
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    &euro; {
                                                                        product.price
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                />
            )}
        </Paper>
    );
};

export default OrdersScreen;
