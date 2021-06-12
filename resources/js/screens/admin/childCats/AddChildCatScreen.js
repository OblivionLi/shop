import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import {
    adminListChildCats,
    createChildCat,
} from "../../../actions/childCatActions";
import { getEditProductRelDetails } from "../../../actions/productActions";
import { CHILD_CATEGORY_ADMIN_LIST_RESET } from "../../../constants/childCatConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

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

const AddChildCatScreen = ({ setOpenAddDialog, setRequestData, history }) => {
    const classes = useStyles();

    const [childCatName, setChildCatName] = useState("");
    const [parentCatName, setParentCatName] = useState("");
    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const childCatCreate = useSelector((state) => state.childCatCreate);
    const { loading, success, error } = childCatCreate;

    const productGetRelDetails = useSelector(
        (state) => state.productGetRelDetails
    );
    const { productDetails } = productGetRelDetails;

    const { parentCats } = productDetails;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: CHILD_CATEGORY_ADMIN_LIST_RESET });
            dispatch(adminListChildCats());
        }
        dispatch(getEditProductRelDetails());
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createChildCat(childCatName, parentCatName));

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
            <DialogTitle id="draggable-dialog-title">
                Add Child Category
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
                                    name="childCatName"
                                    label="Child Category Name"
                                    fullWidth
                                    onChange={(e) =>
                                        setChildCatName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <FormControl
                                    required
                                    variant="outlined"
                                    className={classes.formControl}
                                >
                                    <InputLabel id="parcat">
                                        Parent Category
                                    </InputLabel>
                                    <Select
                                        labelId="parcat"
                                        id="parcat-select"
                                        onChange={(e) =>
                                            setParentCatName(e.target.value)
                                        }
                                        label="Parent Category"
                                        value={parentCatName}
                                        defaultValue=""
                                        required
                                    >
                                        {parentCats &&
                                            parentCats.map((parentCat) => {
                                                return (
                                                    <MenuItem
                                                        key={parentCat.id}
                                                        value={parentCat.id}
                                                    >
                                                        {`${parentCat.parent_category_name} (${parentCat.type.name})`}
                                                    </MenuItem>
                                                );
                                            })}
                                    </Select>
                                </FormControl>
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
    );
};

export default AddChildCatScreen;
