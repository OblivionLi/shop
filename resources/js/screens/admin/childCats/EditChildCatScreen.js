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
    adminListChildCats,
    editChildCat,
    getEditChildCatDetails,
} from "../../../actions/childCatActions";
import {
    CHILD_CATEGORY_EDIT_RESET,
    CHILD_CATEGORY_GET_DETAILS_RESET,
} from "../../../constants/childCatConstants";
import { adminListParentCats } from "../../../actions/parentCatActions";

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

const EditChildCatScreen = ({
    setOpenEditDialog,
    setRequestData,
    childCatId,
}) => {
    const classes = useStyles();

    const [childCatName, setChildCatName] = useState("");
    const [parentCategory, setParentCategory] = useState("");

    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    const childCatGetEditDetails = useSelector(
        (state) => state.childCatGetEditDetails
    );
    const { loading, error, childCat } = childCatGetEditDetails;

    const childCatEdit = useSelector((state) => state.childCatEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = childCatEdit;

    const parentCatAdminList = useSelector((state) => state.parentCatAdminList);
    const { parentCats, loading: parentCatsLoading } = parentCatAdminList;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: CHILD_CATEGORY_EDIT_RESET });
            dispatch({ type: CHILD_CATEGORY_GET_DETAILS_RESET });
        } else {
            if (!childCat.child_category_name || childCat.id != childCatId) {
                dispatch(getEditChildCatDetails(childCatId));
            } else {
                dispatch(adminListParentCats());
                setChildCatName(childCat.child_category_name);
                setParentCategory(childCat.parent_cat.id);
            }
        }

        if (successModal) {
            dispatch(adminListChildCats());
        }
    }, [dispatch, childCatId, childCat, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editChildCat(childCatId, childCatName, parentCategory));

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
            <DialogTitle id="draggable-dialog-title">
                Edit Child Category
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
                                {parentCatsLoading ? (
                                    <Loader />
                                ) : (
                                    <FormControl
                                        variant="outlined"
                                        className={classes.formControl}
                                    >
                                        <InputLabel id="parentCat">
                                            Parent Category
                                        </InputLabel>
                                        <Select
                                            labelId="parentCat"
                                            id="parentCat-select"
                                            onChange={(e) =>
                                                setParentCategory(
                                                    e.target.value
                                                )
                                            }
                                            label="Parent Category"
                                            value={parentCategory}
                                            defaultValue={""}
                                        >
                                            {parentCats.data &&
                                                parentCats.data.map(
                                                    (parentCat) => {
                                                        return (
                                                            <MenuItem
                                                                value={
                                                                    parentCat.id
                                                                }
                                                                key={
                                                                    parentCat.id
                                                                }
                                                            >
                                                                {`${parentCat.name} (${parentCat.type.name})`}
                                                            </MenuItem>
                                                        );
                                                    }
                                                )}
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
                            Edit Child Category
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default EditChildCatScreen;
