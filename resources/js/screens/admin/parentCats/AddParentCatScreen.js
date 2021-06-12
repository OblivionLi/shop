import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Divider,
    FormControl,
    InputLabel ,
    Select,
    MenuItem 
} from "@material-ui/core";
import Swal from "sweetalert2";
import {
    adminListParentCats,
    createParentCat
} from "../../../actions/parentCatActions";
import {
    getEditProductRelDetails
} from "../../../actions/productActions";
import { PARENT_CATEGORY_ADMIN_LIST_RESET } from "../../../constants/parentCatConstants";
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

const AddParentCatScreen = ({ setOpenAddDialog, setRequestData, history }) => {
    const classes = useStyles();

    const [parentCatName, setParentCatName] = useState("");
    const [type, setType] = useState("");
    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const parentCatCreate = useSelector((state) => state.parentCatCreate);
    const { loading, success, error } = parentCatCreate;

    const productGetRelDetails = useSelector(
        (state) => state.productGetRelDetails
    );
    const { productDetails } = productGetRelDetails;

    const { types } = productDetails;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: PARENT_CATEGORY_ADMIN_LIST_RESET });
            dispatch(adminListParentCats());
        }
        dispatch(getEditProductRelDetails());
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createParentCat(parentCatName, type));

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

                            <div className="form__field">
                                <FormControl
                                    required
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
                                        defaultValue=""
                                        required
                                    >
                                        {types &&
                                            types.map((type) => {
                                                return (
                                                    <MenuItem
                                                        key={type.id}
                                                        value={type.id}
                                                    >
                                                        {type.name}
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
                            Add Parent Category
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddParentCatScreen;
