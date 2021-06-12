import React, { useEffect, useState, createRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "@material-ui/core";
import {
    TextField,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    FormLabel,
    Checkbox,
    FormHelperText,
    FormGroup,
    FormControlLabel,
} from "@material-ui/core";
import {
    getEditProductRelDetails,
    adminListProducts,
    createProduct,
} from "../../../actions/productActions";
import Swal from "sweetalert2";
import { PRODUCT_ADMIN_LIST_RESET } from "../../../constants/productConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import NumberFormat from "react-number-format";
import Dropzone from "react-dropzone";
import { isEmpty } from "lodash";

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

const AddProductScreen = ({ setOpenAddDialog, setRequestData, history }) => {
    const classes = useStyles();

    const [brandName, setBrandName] = useState("");
    const [type, setType] = useState("");
    const [childCategory, setChildCategory] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [productCode, setProductCode] = useState("");
    const [description, setDescription] = useState("");
    const [materialDescription, setMaterialDescription] = useState("");
    const [discount, setDiscount] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState();

    const [colorNqty, setColorNqty] = useState([]);
    const [showColorQtyInput, setShowColorQtyInput] = useState({});

    const [sizeNqty, setSizeNqty] = useState([]);
    const [showSizeQtyInput, setShowSizeQtyInput] = useState({});

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const productGetRelDetails = useSelector(
        (state) => state.productGetRelDetails
    );
    const { productDetails, loading: loadingRelDet } = productGetRelDetails;

    const { brands, childCats, parentCats, types, colors, sizes } =
        productDetails;

    const productCreate = useSelector((state) => state.productCreate);
    const { loading, success, error } = productCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: PRODUCT_ADMIN_LIST_RESET });
            dispatch(adminListProducts());
        }
        dispatch(getEditProductRelDetails());
    }, [dispatch, history, successModal, success, type, parentCategory]);

    const handleShowQtyInput = (id) => {
        setShowColorQtyInput((prevShowQtyInput) => ({
            ...prevShowQtyInput,
            [id]: !prevShowQtyInput[id],
        }));
    };

    const handleShowSizeQtyInput = (id) => {
        setShowSizeQtyInput((prevShowQtyInput) => ({
            ...prevShowQtyInput,
            [id]: !prevShowQtyInput[id],
        }));
    };

    const handleColorNQty = (e) => {
        let colorId = e.target.id;
        let colorQty = e.target.value;

        if (colorQty > 0) {
            setColorNqty((prevColorNqty) => ({
                ...prevColorNqty,
                [colorId]: colorQty,
            }));
        }
    };

    const handleSizeNQty = (e) => {
        let sizeId = e.target.id;
        let sizeQty = e.target.value;

        if (sizeQty > 0) {
            setSizeNqty((prevSizeNqty) => ({
                ...prevSizeNqty,
                [sizeId]: sizeQty,
            }));
        }
    };

    const dropzoneRef = createRef();
    const openDialog = () => {
        // Note that the ref is set async,
        // so it might be null at some point
        if (dropzoneRef.current) {
            dropzoneRef.current.open();
        }
    };

    const handleImages = (acceptedFiles) => {
        setImages(acceptedFiles);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("brandName", brandName);
        formData.append("productName", productName);
        formData.append("productCode", productCode);
        formData.append("price", price);
        formData.append("discount", discount);
        formData.append("description", description);
        formData.append("materialDescription", materialDescription);
        formData.append("type", type);
        formData.append("childCategory", childCategory);
        formData.append("parentCategory", parentCategory);
        formData.append("colorNqty", JSON.stringify(colorNqty));
        formData.append("sizeNqty", JSON.stringify(sizeNqty));

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append(`images[${i}]`, images[i]);
            }
        }

        dispatch(createProduct(formData));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Product "${productName}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Product</DialogTitle>
            <Divider />
            <DialogContent>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <div className="form">
                            <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                            >
                                * - means that the field is required
                            </Typography>
                            <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                            >
                                - if Parent or Child Category is empty, that
                                means that no category exist for chosen Type
                            </Typography>
                            <div className="form__field">
                                {loadingRelDet ? (
                                    <Loader />
                                ) : (
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
                                            value={type}
                                            defaultValue=""
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
                                )}
                            </div>

                            <div className="form__field">
                                {loadingRelDet ? (
                                    <Loader />
                                ) : (
                                    <FormControl
                                        required
                                        variant="outlined"
                                        className={classes.formControl}
                                    >
                                        {type.length == 0 ? (
                                            <Message
                                                variant={error}
                                            >{`Please choose a Type first in order to choose a Parent Category..`}</Message>
                                        ) : (
                                            <>
                                                <InputLabel id="parcat">
                                                    Parent Category
                                                </InputLabel>
                                                <Select
                                                    labelId="parcat"
                                                    id="parcat-select"
                                                    onChange={(e) =>
                                                        setParentCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                    label="Parent Category"
                                                    value={parentCategory}
                                                    defaultValue=""
                                                >
                                                    {parentCats &&
                                                        parentCats.map(
                                                            (parentCat) =>
                                                                type ==
                                                                    parentCat
                                                                        .type
                                                                        .id && (
                                                                    <MenuItem
                                                                        key={
                                                                            parentCat.id
                                                                        }
                                                                        value={
                                                                            parentCat.id
                                                                        }
                                                                    >
                                                                        {`${parentCat.parent_category_name} (${parentCat.type.name})`}
                                                                    </MenuItem>
                                                                )
                                                        )}
                                                </Select>
                                            </>
                                        )}
                                    </FormControl>
                                )}
                            </div>

                            <div className="form__field">
                                {loadingRelDet ? (
                                    <Loader />
                                ) : (
                                    <FormControl
                                        required
                                        variant="outlined"
                                        className={classes.formControl}
                                    >
                                        {parentCategory.length == 0 ? (
                                            <Message
                                                variant={error}
                                            >{`Please choose a Parent Category first in order to choose a Child Category..`}</Message>
                                        ) : (
                                            <>
                                                <InputLabel id="childCat">
                                                    Child Category
                                                </InputLabel>
                                                <Select
                                                    labelId="childCat"
                                                    id="childCat-select"
                                                    onChange={(e) =>
                                                        setChildCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                    label="Child Category"
                                                    value={childCategory}
                                                    defaultValue=""
                                                >
                                                    {childCats &&
                                                        childCats.map(
                                                            (childCat) =>
                                                                parentCategory ==
                                                                    childCat
                                                                        .parent_cat
                                                                        .id && (
                                                                    <MenuItem
                                                                        value={
                                                                            childCat.id
                                                                        }
                                                                        key={
                                                                            childCat.id
                                                                        }
                                                                    >
                                                                        {`${childCat.child_category_name} (${childCat.parent_cat.parent_category_name} - ${childCat.parent_cat.type.name})`}
                                                                    </MenuItem>
                                                                )
                                                        )}
                                                </Select>
                                            </>
                                        )}
                                    </FormControl>
                                )}
                            </div>

                            <div className="form__field">
                                <FormControl
                                    required
                                    variant="outlined"
                                    className={classes.formControl}
                                >
                                    <InputLabel id="brand">Brand</InputLabel>
                                    <Select
                                        labelId="brand"
                                        id="brand-select"
                                        onChange={(e) =>
                                            setBrandName(e.target.value)
                                        }
                                        label="Brand"
                                        value={brandName}
                                        defaultValue=""
                                    >
                                        {brands &&
                                            brands.map((brand) => {
                                                return (
                                                    <MenuItem
                                                        value={brand.id}
                                                        key={brand.id}
                                                    >
                                                        {brand.brand_name}
                                                    </MenuItem>
                                                );
                                            })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="name"
                                    label="Product Name"
                                    fullWidth
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="product_code"
                                    label="Product Code"
                                    fullWidth
                                    onChange={(e) =>
                                        setProductCode(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    name="description"
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    label="Material Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={(e) =>
                                        setMaterialDescription(e.target.value)
                                    }
                                    name="material_description"
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="discount"
                                    label="Discount %"
                                    type="number"
                                    fullWidth
                                    onChange={(e) =>
                                        setDiscount(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <NumberFormat
                                    label="Price €"
                                    fullWidth
                                    variant="outlined"
                                    customInput={TextField}
                                    decimalScale={2}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    renderText={(formattedValue) => (
                                        <Text>{formattedValue}</Text>
                                    )}
                                />
                            </div>

                            <div className="form__field">
                                <FormControl
                                    component="fieldset"
                                    className="form__field--checkboxesQty"
                                >
                                    <FormLabel component="legend">
                                        <p>Choose Product Colors.</p>
                                        <p>
                                            Qty values can't be "0", if color
                                            checkbox is checked but has no qty,
                                            the checkbox will be ignored !
                                        </p>
                                    </FormLabel>
                                    <FormGroup row>
                                        <div className="form__field--checkboxesQty">
                                            {colors &&
                                                colors.map((color) => {
                                                    return (
                                                        <div
                                                            className={
                                                                classes.checkboxes
                                                            }
                                                            key={color.id}
                                                        >
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        value={
                                                                            color.color_name
                                                                        }
                                                                        onChange={() =>
                                                                            handleShowQtyInput(
                                                                                `${color.id}`
                                                                            )
                                                                        }
                                                                    />
                                                                }
                                                                label={
                                                                    color.color_name
                                                                }
                                                                name="color"
                                                            />

                                                            {showColorQtyInput[
                                                                color.id
                                                            ] ? (
                                                                <TextField
                                                                    className={
                                                                        classes.checkInputs
                                                                    }
                                                                    size="small"
                                                                    variant="outlined"
                                                                    id={`${color.id}`}
                                                                    name={
                                                                        color.color_name
                                                                    }
                                                                    label={`Set color ${color.color_name} quantity here..`}
                                                                    type="number"
                                                                    onChange={
                                                                        handleColorNQty
                                                                    }
                                                                    required
                                                                />
                                                            ) : null}
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </FormGroup>
                                </FormControl>
                            </div>

                            <div className="form__field">
                                <FormControl
                                    component="fieldset"
                                    className="form__field--checkboxesQty"
                                >
                                    <FormLabel component="legend">
                                        <p>Choose Product Sizes.</p>
                                        <p>
                                            Qty values can't be "0", if size
                                            checkbox is checked but has no qty,
                                            the checkbox will be ignored !
                                        </p>
                                    </FormLabel>
                                    <FormGroup row>
                                        <div className="form__field--checkboxesQty">
                                            {sizes &&
                                                sizes.map((size) => {
                                                    return (
                                                        <div
                                                            className={
                                                                classes.checkboxes
                                                            }
                                                            key={size.id}
                                                        >
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        value={
                                                                            size.size_name
                                                                        }
                                                                        onChange={() =>
                                                                            handleShowSizeQtyInput(
                                                                                `${size.id}`
                                                                            )
                                                                        }
                                                                    />
                                                                }
                                                                label={
                                                                    size.size_name
                                                                }
                                                                name="size"
                                                            />

                                                            {showSizeQtyInput[
                                                                size.id
                                                            ] ? (
                                                                <TextField
                                                                    className={
                                                                        classes.checkInputs
                                                                    }
                                                                    size="small"
                                                                    variant="outlined"
                                                                    id={`${size.id}`}
                                                                    name={
                                                                        size.size_name
                                                                    }
                                                                    label={`Set size ${size.size_name} quantity here..`}
                                                                    type="number"
                                                                    onChange={
                                                                        handleSizeNQty
                                                                    }
                                                                    required
                                                                />
                                                            ) : null}
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </FormGroup>
                                </FormControl>
                            </div>

                            <div className="form__field">
                                <Dropzone
                                    ref={dropzoneRef}
                                    noClick
                                    noKeyboard
                                    onDrop={handleImages}
                                >
                                    {({
                                        getRootProps,
                                        getInputProps,
                                        acceptedFiles,
                                    }) => {
                                        return (
                                            <div className="drop">
                                                <div
                                                    {...getRootProps({
                                                        className: "dropzone",
                                                    })}
                                                >
                                                    <input
                                                        {...getInputProps()}
                                                    />
                                                    <p>
                                                        Drag and drop the
                                                        product images here
                                                    </p>
                                                    <Button
                                                        variant="contained"
                                                        type="button"
                                                        onClick={openDialog}
                                                    >
                                                        Open File Dialog
                                                    </Button>
                                                </div>
                                                <aside>
                                                    <h4>Files</h4>
                                                    <ul>
                                                        {acceptedFiles.map(
                                                            (file) => (
                                                                <li
                                                                    key={
                                                                        file.path
                                                                    }
                                                                >
                                                                    {file.path}{" "}
                                                                    -{" "}
                                                                    {file.size}{" "}
                                                                    bytes
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </aside>
                                            </div>
                                        );
                                    }}
                                </Dropzone>
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Add Product
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddProductScreen;
