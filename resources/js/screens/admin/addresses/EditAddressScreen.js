import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
    adminListAddresses,
    editAddress,
    getEditAddressDetails,
} from "../../../actions/addressActions";
import {
    ADDRESS_EDIT_RESET,
    ADDRESS_GET_DETAILS_RESET,
} from "../../../constants/addressConstants";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import { isEmpty } from "lodash";

const EditAddressScreen = ({
    setOpenEditDialog,
    setRequestData,
    addressId,
}) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [userAddress, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    const addressGetEditDetails = useSelector(
        (state) => state.addressGetEditDetails
    );
    const { loading, error, address } = addressGetEditDetails;

    const addressEdit = useSelector((state) => state.addressEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = addressEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: ADDRESS_EDIT_RESET });
            dispatch({ type: ADDRESS_GET_DETAILS_RESET });
        } else {
            if (isEmpty(address)) {
                dispatch(getEditAddressDetails(addressId));
            } else {
                setName(address ? address[0].name : "");
                setSurname(address ? address[0].surname : "");
                setCountry(address ? address[0].country : "");
                setCity(address ? address[0].city : "");
                setAddress(address ? address[0].address : "");
                setPostalCode(
                    address ? address[0].postal_code : ""
                );
                setPhoneNumber(
                    address ? address[0].phone_number : ""
                );
            }
        }

        if (successModal) {
            dispatch(adminListAddresses());
        }
    }, [dispatch, addressId, address, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            editAddress(
                addressId,
                name,
                surname,
                country,
                city,
                userAddress,
                postalCode,
                phoneNumber
            )
        );

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Address has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Address</DialogTitle>
            <Divider />
            <DialogContent>
                {loadingEdit && <Loader />}
                {errorEdit && <Message variant="error">{errorEdit}</Message>}
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
                                    label="Type Phone Number"
                                    value={phoneNumber}
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
                            Edit Address
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default EditAddressScreen;
