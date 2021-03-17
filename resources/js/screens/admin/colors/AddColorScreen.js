import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import { adminListColors, createColor } from "../../../actions/colorActions";
import { COLOR_ADMIN_LIST_RESET } from "../../../constants/colorConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

const AddColorScreen = ({ setOpenAddDialog, setRequestData, history }) => {
    const [colorName, setColorName] = useState("");
    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const colorCreate = useSelector((state) => state.colorCreate);
    const { loading, success, error } = colorCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: COLOR_ADMIN_LIST_RESET });
            dispatch(adminListColors());
        }
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createColor(colorName));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Color "${colorName}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Color</DialogTitle>
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
                                    name="colorName"
                                    label="Color Name"
                                    fullWidth
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
                            Add Color
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    )
}

export default AddColorScreen
