import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DialogContent,
    DialogTitle,
    Button,
    Divider,
} from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
    adminListProducts,
    replaceProductImage,
} from "../../../actions/productActions";
import {
    PRODUCT_IMAGE_REPLACE_RESET,
} from "../../../constants/productConstants";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ClearIcon from '@material-ui/icons/Clear';

const ReplaceProductImageScreen = ({
    setOpenReplaceDialog,
    setRequestData,
    productImageId,
    productReplaceId
}) => {

    const [image, setImage] = useState();

    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    const productImageReplace = useSelector(state => state.productImageReplace)
    const {
        loading: loading,
        error: error,
        success: success
    } = productImageReplace

    useEffect(() => {
        if (success) {
            dispatch({ type: PRODUCT_IMAGE_REPLACE_RESET });
        }

        if (successModal) {
            dispatch(adminListProducts());
        }
    }, [dispatch, productImageId, productReplaceId, success, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productId", productReplaceId)
        if (image) {
            formData.append("image", image);
        }

        dispatch(replaceProductImage(productImageId, formData));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenReplaceDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Image replaced successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Replace Product Image</DialogTitle>
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
                        method="POST"
                    >
                        <div className="form">
                            <div className="form__field">
                                <input type="hidden" name="_method" value="PUT" />
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
                                        Upload new Product Image (max filezise: 5mb)
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
                            Replace Image
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    )
}

export default ReplaceProductImageScreen
