import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle, TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import {
    adminListParentCats,
    createParentCat,
} from "../../../actions/parentCatActions";
import { PARENT_CATEGORY_ADMIN_LIST_RESET } from "../../../constants/parentCatConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

const AddParentCatScreen = ({ setOpenAddDialog, setRequestData, history }) => {

    const [parentCatName, setParentCatName] = useState("");
    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const parentCatCreate = useSelector((state) => state.parentCatCreate);
    const { loading, success, error } = parentCatCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: PARENT_CATEGORY_ADMIN_LIST_RESET });
            dispatch(adminListParentCats());
        }
        dispatch(getEditProductRelDetails());
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createParentCat(parentCatName)); 

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Parent Category "${parentCatName}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">
                Add Parent Category
            </DialogTitle>
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
                                    name="parentCatName"
                                    label="Parent Category Name needs to be unique"
                                    fullWidth
                                    onChange={(e) =>
                                        setParentCatName(e.target.value)
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
                            Add Parent Category
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddParentCatScreen;
