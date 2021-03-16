import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
    adminListSizes,
    editSize,
    getEditSizeDetails,
} from "../../../actions/sizeActions";
import {
    SIZE_EDIT_RESET,
    SIZE_GET_DETAILS_RESET,
} from "../../../constants/sizeConstants";

const EditSizeScreen = ({ setOpenEditDialog, setRequestData, sizeId }) => {
    const [sizeName, setSizeName] = useState("");
    const [sizeQty, setSizeQty] = useState("");

    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    const sizeGetEditDetails = useSelector((state) => state.sizeGetEditDetails);
    const { loading, error, size } = sizeGetEditDetails;

    const sizeEdit = useSelector((state) => state.sizeEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = sizeEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: SIZE_EDIT_RESET });
            dispatch({ type: SIZE_GET_DETAILS_RESET });
        } else {
            if (!size.size_name || size.id != sizeId) {
                dispatch(getEditSizeDetails(sizeId));
            } else {
                setSizeName(size.size_name);
                setSizeQty(size.size_quantity);
            }
        }

        if (successModal) {
            dispatch(adminListSizes());
        }
    }, [dispatch, sizeId, size, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editSize(sizeId, sizeName, sizeQty));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Size with name "${sizeName}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Size</DialogTitle>
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
                                    name="sizeName"
                                    label="Size Name"
                                    fullWidth
                                    value={sizeName}
                                    onChange={(e) =>
                                        setSizeName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="sizeQty"
                                    label="Size Quantity"
                                    type="number"
                                    fullWidth
                                    value={sizeQty}
                                    onChange={(e) =>
                                        setSizeQty(e.target.value)
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
                            Edit Size
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default EditSizeScreen;
