import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
    adminListProducts,
    createProductImage,
} from "../../../actions/productActions";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ClearIcon from "@material-ui/icons/Clear";

const AddProductImageScreen = ({
    setOpenAddProductImageDialog,
    setRequestData,
    productId,
}) => {
    const [image, setImage] = useState();

    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    const productAdminList = useSelector((state) => state.productAdminList);
    const { products } = productAdminList;

    const productImageCreate = useSelector((state) => state.productImageCreate);
    const {
        loading: loading,
        error: error,
        success: success,
    } = productImageCreate;

    useEffect(() => {
        if (successModal) {
            dispatch(adminListProducts());
        }
        dispatch(adminListProducts());
    }, [dispatch, productId, success, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productId", productId);
        if (image) {
            formData.append("image", image);
        }

        if (products.data[0].images.length < 5) {
            dispatch(createProductImage(productId, formData));

            Swal.fire({
                position: "center",
                icon: "success",
                title: `Image added successfully`,
                showConfirmButton: false,
                timer: 2500,
                width: "65rem",
            });
        } else {
            Swal.fire(
                "Cancelled",
                `Sorry there are already 5 product images, please replace or delete one to add another :)`,
                "error"
            );
        }

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddProductImageDialog(false);
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">
                Add Product Image
            </DialogTitle>
            <Divider />
            <DialogContent>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <div className="form">
                            <div className="form__field">
                                <input
                                    id="contained-button-file"
                                    type="file"
                                    className="form__field--upl"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                />

                                <label htmlFor="contained-button-file">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                        startIcon={<PhotoCamera />}
                                    >
                                        Upload new Product Image (max filezise:
                                        5mb)
                                    </Button>
                                </label>

                                <p>{image ? image.name : <ClearIcon />}</p>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Add Image
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddProductImageScreen;
