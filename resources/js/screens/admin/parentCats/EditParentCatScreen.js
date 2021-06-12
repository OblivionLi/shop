import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
    DialogContent,
    DialogTitle,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
    adminListParentCats,
    editParentCat,
    getEditParentCatDetails,
} from "../../../actions/parentCatActions";
import { adminListTypes } from "../../../actions/typeActions";
import {
    PARENT_CATEGORY_EDIT_RESET,
    PARENT_CATEGORY_GET_DETAILS_RESET,
} from "../../../constants/parentCatConstants";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: "0 auto",
        minWidth: "100%",
    },

    checkboxes: {
        display: "flex",
        justifyContent: "space-between",
        gap: "2rem",
    },

    checkInputs: {
        width: "100%",
    },
}));

const EditParentCatScreen = ({
    setOpenEditDialog,
    setRequestData,
    parentCatId,
}) => {
    const classes = useStyles();

    const [parentCatName, setParentCatName] = useState("");
    const [type, setType] = useState("");

    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    const parentCatGetEditDetails = useSelector(
        (state) => state.parentCatGetEditDetails
    );
    const { loading, error, parentCat } = parentCatGetEditDetails;

    const parentCatEdit = useSelector((state) => state.parentCatEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = parentCatEdit;

    const typeAdminList = useSelector((state) => state.typeAdminList);
    const { types, loading: typesLoading } = typeAdminList;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: PARENT_CATEGORY_EDIT_RESET });
            dispatch({ type: PARENT_CATEGORY_GET_DETAILS_RESET });
        } else {
            if (
                !parentCat.parent_category_name ||
                parentCat.id != parentCatId
            ) {
                dispatch(getEditParentCatDetails(parentCatId));
            } else {
                dispatch(adminListTypes());
                setParentCatName(parentCat.parent_category_name);
                setType(parentCat.type.id);
            }
        }

        if (successModal) {
            dispatch(adminListParentCats());
        }
    }, [dispatch, parentCatId, parentCat, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editParentCat(parentCatId, parentCatName, type));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Parent Category with name "${parentCatName}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">
                Edit Parent Category
            </DialogTitle>
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
                                    name="parentCatName"
                                    label="Parent Category Name"
                                    fullWidth
                                    value={parentCatName}
                                    onChange={(e) =>
                                        setParentCatName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form__field">
                                {typesLoading ? (
                                    <Loader />
                                ) : (
                                    <FormControl
                                        variant="outlined"
                                        className={classes.formControl}
                                    >
                                        <InputLabel id="type">Type</InputLabel>
                                        <Select
                                            labelId="type"
                                            id="type-select"
                                            onChange={(e) =>
                                                setType(e.target.value)
                                            }
                                            label="Type"
                                            value={type}
                                            defaultValue=""
                                        >
                                            {types &&
                                                types.map((type) => {
                                                    return (
                                                        <MenuItem
                                                            value={type.id}
                                                            key={type.id}
                                                        >
                                                            {type.name}
                                                        </MenuItem>
                                                    );
                                                })}
                                        </Select>
                                    </FormControl>
                                )}
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Edit Parent Category
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default EditParentCatScreen;
