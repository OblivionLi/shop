import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import { adminListBrands, createBrand } from "../../../actions/brandActions";
import Swal from "sweetalert2";
import { BRAND_ADMIN_LIST_RESET } from "../../../constants/brandConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

const AddBrandScreen = ({ setOpenAddDialog, setRequestData, history }) => {
    const [brandName, setBrandName] = useState("");
    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const brandCreate = useSelector((state) => state.brandCreate);
    const { loading, success, error } = brandCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: BRAND_ADMIN_LIST_RESET });
            dispatch(adminListBrands());
        }
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createBrand(brandName));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Brand "${brandName}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };
    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Brand</DialogTitle>
            <Divider />
            <DialogContent>
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
                                    name="brandName"
                                    label="Brand Name"
                                    fullWidth
                                    onChange={(e) => setBrandName(e.target.value)}
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
                            Add Brand
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddBrandScreen;
