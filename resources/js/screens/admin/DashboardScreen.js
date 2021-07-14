import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Dialog, DialogActions, Link, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Swal from "sweetalert2";
import Moment from "react-moment";
import { Line } from "react-chartjs-2";

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const DashboardScreen = ({ history }) => {
    const dispatch = useDispatch();

    const [ordersCount, setOrdersCount] = useState([]);
    const [usersCount, setUsersCount] = useState([]);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dataOrders = {
        labels: MONTHS,
        datasets: [
            {
                label: "# of Paid Orders",
                data: ordersCount,
                fill: false,
                backgroundColor: "#3a446b",
                borderColor: "#39CCCC",
            },
        ],
    };

    const dataUsers = {
        labels: MONTHS,
        datasets: [
            {
                label: "# of New Users",
                data: usersCount,
                fill: false,
                backgroundColor: "#3a446b",
                borderColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    };

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                },
            };

            const promise1 = axios.get("/api/usersCount", config);
            const promise2 = axios.get("/api/ordersCount", config);

            async function fetchData() {
                const response = await Promise.all([promise1, promise2]);

                setUsersCount(response[0].data);
                setOrdersCount(response[1].data);
            }
            fetchData();
        }
    }, [dispatch, history, userInfo]);

    return (
        <Paper className="paper">
            <div className="chart">
                <Line data={dataOrders} options={options} />
            </div>
            <div className="chart">
                <Line data={dataUsers} options={options} />
            </div>
        </Paper>
    );
};

export default DashboardScreen;
