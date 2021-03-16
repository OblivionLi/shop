import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import { adminListSizes, createSize } from "../../../actions/sizeActions";
import { SIZE_ADMIN_LIST_RESET } from "../../../constants/sizeConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

const AddSizeScreen = ({ setOpenAddDialog, setRequestData, history }) => {
    const [sizeName, setSizeName] = useState("");
    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const sizeCreate = useSelector((state) => state.sizeCreate);
    const { loading, success, error } = sizeCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: SIZE_ADMIN_LIST_RESET });
            dispatch(adminListSizes());
        }
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createSize(sizeName));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Size "${sizeName}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Size</DialogTitle>
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
                                    name="sizeName"
                                    label="Size Name"
                                    fullWidth
                                    onChange={(e) =>
                                        setSizeName(e.target.value)
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
                            Add Size
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddSizeScreen;
