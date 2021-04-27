import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
    adminListColors,
    editColor,
    getEditColorDetails,
} from "../../../actions/colorActions";
import {
    COLOR_EDIT_RESET,
    COLOR_GET_DETAILS_RESET,
} from "../../../constants/colorConstants";

const EditColorScreen = ({ setOpenEditDialog, setRequestData, colorId }) => {
    const [colorName, setColorName] = useState("");

    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    const colorGetEditDetails = useSelector((state) => state.colorGetEditDetails);
    const { loading, error, color } = colorGetEditDetails;

    const colorEdit = useSelector((state) => state.colorEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = colorEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: COLOR_EDIT_RESET });
            dispatch({ type: COLOR_GET_DETAILS_RESET });
        } else {
            if (!color.color_name || color.id != colorId) {
                dispatch(getEditColorDetails(colorId));
            } else {
                setColorName(color.color_name);
            }
        }

        if (successModal) {
            dispatch(adminListColors());
        }
    }, [dispatch, colorId, color, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editColor(colorId, colorName));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Color with name "${colorName}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Color</DialogTitle>
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
                                    name="colorName"
                                    label="Color Name"
                                    fullWidth
                                    value={colorName}
                                    onChange={(e) =>
                                        setColorName(e.target.value)
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
                            Edit Color
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    )
}

export default EditColorScreen
