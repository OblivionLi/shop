import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNavbar from "../../../components/MainNavbar";
import CategoriesNavbar from "../../../components/CategoriesNavbar";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import "react-alice-carousel/lib/alice-carousel.css";
import { makeStyles } from "@material-ui/core/styles";
import { getEditUserDetails } from "../../../actions/userActions";
import { createAddress } from "../../../actions/addressActions";
import Swal from "sweetalert2";
import { Divider, Button, TextField, Breadcrumbs } from "@material-ui/core";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import "react-phone-input-2/lib/material.css";

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

const ShippingScreen = ({ match, history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const userId = match.params.id;
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [userAddress, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userGetEditDetails = useSelector((state) => state.userGetEditDetails);
    const { user, loading, error } = userGetEditDetails;

    const addressCreate = useSelector((state) => state.addressCreate);
    const { success } = addressCreate;

    useEffect(() => {
        if (!userInfo || userInfo.id != userId) {
            history.push("/cart");
        }

        if (!user.name) {
            dispatch(getEditUserDetails(userId));
        }

        if (user.addresses && user.addresses.length > 0) {
            setName(user.addresses ? user.addresses[0].name : "");
            setSurname(user.addresses ? user.addresses[0].surname : "");
            setCountry(user.addresses ? user.addresses[0].country : "");
            setCity(user.addresses ? user.addresses[0].city : "");
            setAddress(user.addresses ? user.addresses[0].address : "");
            setPostalCode(user.addresses ? user.addresses[0].postal_code : "");
            setPhoneNumber(
                user.addresses ? user.addresses[0].phone_number : ""
            );
        }

        if (success) {
            history.push(`/placeorder/${userInfo.id}`);
        }
    }, [dispatch, userId, userInfo, user, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            createAddress(
                userId,
                name,
                surname,
                country,
                city,
                userAddress,
                postalCode,
                phoneNumber
            )
        );

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Address saved!`,
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
                        className={classes.breadLink2}
                        to={`/shipping/${userId}`}
                        aria-current="page"
                    >
                        Shipping
                    </Link>
                </Breadcrumbs>

                <Divider className={classes.bread} />

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div className="form">
                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="name"
                                    label="Type Name"
                                    value={name}
                                    fullWidth
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="surname"
                                    label="Type Surname"
                                    value={surname}
                                    fullWidth
                                    onChange={(e) => setSurname(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="country"
                                    label="Type Country"
                                    value={country}
                                    fullWidth
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="city"
                                    label="Type City"
                                    value={city}
                                    fullWidth
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="address"
                                    value={userAddress}
                                    label="Type Address"
                                    fullWidth
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="postalCode"
                                    label="Type Postal Code"
                                    value={postalCode}
                                    type="number"
                                    fullWidth
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="phoneNumber"
                                    label=""
                                    value={phoneNumber}
                                    placeholder="Please provide a phone number with country prefix ex: +40 123 456 789"
                                    fullWidth
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Add Address
                        </Button>
                    </form>
                )}
            </section>

            <Footer />
        </>
    );
};

export default ShippingScreen;
