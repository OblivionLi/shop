import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import { adminListTypes, createType } from "../../../actions/typeActions";
import Swal from "sweetalert2";
import { TYPE_ADMIN_LIST_RESET } from "../../../constants/typeConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

const AddTypeScreen = ({ setOpenAddDialog, setRequestData, history }) => {
    const [typeName, setTypeName] = useState("");
    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const typeCreate = useSelector((state) => state.typeCreate);
    const { loading, success, error } = typeCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: TYPE_ADMIN_LIST_RESET });
            dispatch(adminListTypes());
        }
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createType(typeName));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Type "${typeName}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };
    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Type</DialogTitle>
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
                                    name="typeName"
                                    label="Type Name"
                                    fullWidth
                                    onChange={(e) => setTypeName(e.target.value)}
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
                            Add Type
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddTypeScreen;
