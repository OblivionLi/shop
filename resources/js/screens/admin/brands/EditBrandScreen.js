import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
    adminListBrands,
    editBrand,
    getEditBrandDetails,
} from "../../../actions/brandActions";
import {
    BRAND_EDIT_RESET,
    BRAND_GET_DETAILS_RESET,
} from "../../../constants/brandConstants";

const EditBrandScreen = ({ setOpenEditDialog, setRequestData, brandId }) => {
    const [brandName, setBrandName] = useState("");

    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    const brandGetEditDetails = useSelector(
        (state) => state.brandGetEditDetails
    );
    const { loading, error, brand } = brandGetEditDetails;

    const brandEdit = useSelector((state) => state.brandEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = brandEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: BRAND_EDIT_RESET });
            dispatch({ type: BRAND_GET_DETAILS_RESET });
        } else {
            if (!brand.brand_name || brand.id != brandId) {
                dispatch(getEditBrandDetails(brandId));
            } else {
                setBrandName(brand.brand_name);
            }
        }

        if (successModal) {
            dispatch(adminListBrands());
        }
    }, [dispatch, brandId, brand, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editBrand(brandId, brandName));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Brand with name "${brandName}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });

    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Brand</DialogTitle>
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
                                    name="brandName"
                                    label="Brand Name"
                                    fullWidth
                                    value={brandName}
                                    onChange={(e) =>
                                        setBrandName(e.target.value)
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
                            Edit Brand
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default EditBrandScreen;
