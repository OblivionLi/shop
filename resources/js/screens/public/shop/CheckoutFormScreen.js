import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { payOrder } from "../../../actions/orderActions";
import axios from "axios";
import Swal from "sweetalert2";
import { getEditUserDetails } from "../../../actions/userActions";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 345,
    },

    card: {
        marginBottom: "15px",
    },

    button: {
        width: "100%",
    },
});

const CheckoutFormScreen = ({ history, orderId, totalPrice }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setProcessingTo] = useState(false);

    const [countryInitials, setCountryInitials] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const userGetEditDetails = useSelector((state) => state.userGetEditDetails);
    const { user } = userGetEditDetails;

    useEffect(() => {
        if (userInfo) {
            dispatch(getEditUserDetails(userInfo.id));

            if (user) {
                setCountryInitials(
                    user.addresses[0].country.toUpperCase().substr(0, 2)
                );
                setCity(user.addresses[0].city);
                setAddress(user.addresses[0].address);
                setEmail(userInfo.email);
                setName(
                    `${user.addresses[0].name} ${user.addresses[0].surname}`
                );
                setPhone(user.addresses[0].phone_number);
            }
        }
    }, [userInfo, isProcessing]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setProcessingTo(true);

        // create payment intent
        const { data: intent } = await axios.post("/api/payment_intents", {
            amount: totalPrice,
        });

        // create payment
        const { error: backendError, paymentMethod } =
            await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
                billing_details: {
                    address: {
                        city: city,
                        country: countryInitials,
                        line1: address,
                    },
                    email: email,
                    name: name,
                    phone: phone,
                },
            });

        if (!stripe || !elements) {
            return;
        }

        // confirm the card payments
        if (!backendError) {
            // const test =
            const { error: stripeError, paymentIntent } =
                await stripe.confirmCardPayment(intent, {
                    payment_method: paymentMethod.id,
                });

            if (stripeError) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${stripeError.message}`,
                });
                setProcessingTo(false);
                history.push(`/order/${orderId}`)
            }

            if (
                paymentIntent &&
                paymentIntent.status === "succeeded"
            ) {
                dispatch(payOrder(orderId));
            }

            if (successPay) {
                setProcessingTo(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Success! You payed  €${totalPrice} for this order.`,
                    showConfirmButton: false,
                    timer: 2500,
                    width: "65rem",
                });
                history.push(`/order/${orderId}`)
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Something went wrong! Backend Error: ${backendError.message}`,
            });
            setProcessingTo(false);
            history.push(`/order/${orderId}`)
        }
    };

    return (
        <>
            {successPay ? (
                <div>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={true}
                    >
                        Order Payed Successfully
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label
                        htmlFor="card-element"
                        className="divider checkout-label"
                    >
                        Card
                    </label>
                    <CardElement id="card-element" className={classes.card} />
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Processing..." : `Pay €${totalPrice}`}
                    </Button>
                </form>
            )}
        </>
    );
};

export default CheckoutFormScreen;
