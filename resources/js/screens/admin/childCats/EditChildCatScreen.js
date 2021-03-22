import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
    adminListChildCats,
    editChildCat,
    getEditChildCatDetails,
} from "../../../actions/childCatActions";
import {
    CHILD_CATEGORY_EDIT_RESET,
    CHILD_CATEGORY_GET_DETAILS_RESET,
} from "../../../constants/childCatConstants";

const EditChildCatScreen = ({ setOpenEditDialog, setRequestData, childCatId }) => {
    const [childCatName, setChildCatName] = useState("");
    const [childCatQty, setChildCatQty] = useState("");

    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    const childCatGetEditDetails = useSelector((state) => state.childCatGetEditDetails);
    const { loading, error, childCat } = childCatGetEditDetails;

    const childCatEdit = useSelector((state) => state.childCatEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = childCatEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: CHILD_CATEGORY_EDIT_RESET });
            dispatch({ type: CHILD_CATEGORY_GET_DETAILS_RESET });
        } else {
            if (!childCat.childCat_name || childCat.id != childCatId) {
                dispatch(getEditChildCatDetails(childCatId));
            } else {
                setChildCatName(childCat.childCat_name);
                setChildCatQty(childCat.childCat_quantity);
            }
        }

        if (successModal) {
            dispatch(adminListChildCats());
        }
    }, [dispatch, childCatId, childCat, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editChildCat(childCatId, childCatName, childCatQty));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Child Category with name "${childCatName}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Child Category</DialogTitle>
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
                                    name="childCatName"
                                    label="Child Category Name"
                                    fullWidth
                                    value={childCatName}
                                    onChange={(e) =>
                                        setChildCatName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="childCatQty"
                                    label="Child Category Quantity"
                                    type="number"
                                    fullWidth
                                    value={childCatQty}
                                    onChange={(e) =>
                                        setChildCatQty(e.target.value)
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
                            Edit Child Category
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    )
}

export default EditChildCatScreen
