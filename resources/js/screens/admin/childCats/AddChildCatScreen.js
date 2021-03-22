import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import { adminListChildCats, createChildCat } from "../../../actions/childCatActions";
import { CHILD_CATEGORY_ADMIN_LIST_RESET } from "../../../constants/childCatConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

const AddChildCatScreen = ({ setOpenAddDialog, setRequestData, history }) => {
    const [childCatName, setChildCatName] = useState("");
    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const childCatCreate = useSelector((state) => state.childCatCreate);
    const { loading, success, error } = childCatCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: CHILD_CATEGORY_ADMIN_LIST_RESET });
            dispatch(adminListChildCats());
        }
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createChildCat(childCatName));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Child Category "${childCatName}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Child Category</DialogTitle>
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
                                    name="childCatName"
                                    label="Child Category Name"
                                    fullWidth
                                    onChange={(e) =>
                                        setChildCatName(e.target.value)
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
                            Add Child Category
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    )
}

export default AddChildCatScreen
