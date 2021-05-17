import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
    adminListTypes,
    editType,
    getEditTypeDetails,
} from "../../../actions/typeActions";
import {
    TYPE_EDIT_RESET,
    TYPE_GET_DETAILS_RESET,
} from "../../../constants/typeConstants";

const EditTypeScreen = ({ setOpenEditDialog, setRequestData, typeId }) => {
    const [typeName, setTypeName] = useState("");

    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    const typeGetEditDetails = useSelector(
        (state) => state.typeGetEditDetails
    );
    const { loading, error, type } = typeGetEditDetails;

    const typeEdit = useSelector((state) => state.typeEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = typeEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: TYPE_EDIT_RESET });
            dispatch({ type: TYPE_GET_DETAILS_RESET });
        } else {
            if (!type.name || type.id != typeId) {
                dispatch(getEditTypeDetails(typeId));
            } else {
                setTypeName(type.name);
            }
        }

        if (successModal) {
            dispatch(adminListTypes());
        }
    }, [dispatch, typeId, type, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editType(typeId, typeName));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Type with name "${typeName}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });

    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Type</DialogTitle>
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
                                    name="typeName"
                                    label="Type Name"
                                    fullWidth
                                    value={typeName}
                                    onChange={(e) =>
                                        setTypeName(e.target.value)
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
                            Edit Type
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
}

export default EditTypeScreen
