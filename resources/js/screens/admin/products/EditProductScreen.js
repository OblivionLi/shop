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
    InputLabel,
    Select,
    MenuItem,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
    adminListProducts,
    editProduct,
    getEditProductDetails,
    getEditProductRelDetails,
} from "../../../actions/productActions";
import {
    PRODUCT_EDIT_RESET,
    PRODUCT_GET_DETAILS_RESET,
} from "../../../constants/productConstants";
import NumberFormat from "react-number-format";
import { adminListBrands } from "../../../actions/brandActions";
import { adminListChildCats } from "../../../actions/childCatActions";

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

const EditProductScreen = ({
    setOpenEditDialog,
    setRequestData,
    productId,
}) => {
    const classes = useStyles();

    const [brandName, setBrandName] = useState("");
    const [childCategory, setChildCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [productCode, setProductCode] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [description, setDescription] = useState("");
    const [materialDescription, setMaterialDescription] = useState("");
    const [type, setType] = useState("");

    const [colorNqty, setColorNqty] = useState([]);
    const [showColorQtyInput, setShowColorQtyInput] = useState({});

    const [sizeNqty, setSizeNqty] = useState([]);
    const [showSizeQtyInput, setShowSizeQtyInput] = useState({});

    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    const productGetEditDetails = useSelector(
        (state) => state.productGetEditDetails
    );
    const { loading, error, product } = productGetEditDetails;

    const brandAdminList = useSelector((state) => state.brandAdminList);
    const { brands } = brandAdminList;

    const productGetRelDetails = useSelector(
        (state) => state.productGetRelDetails
    );
    const { productDetails } = productGetRelDetails;

    const childCatAdminList = useSelector((state) => state.childCatAdminList);
    const { childCats } = childCatAdminList;

    const productEdit = useSelector((state) => state.productEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = productEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: PRODUCT_EDIT_RESET });
            dispatch({ type: PRODUCT_GET_DETAILS_RESET });
        } else {
            if (!product.name || product.id != productId) {
                dispatch(getEditProductDetails(productId));
            } else {
                dispatch(adminListBrands());
                dispatch(adminListChildCats());
                dispatch(getEditProductRelDetails());
                setProductName(product.name);
                setProductCode(product.product_code);
                setPrice(product.price);
                setDiscount(product.discount);
                setDescription(product.description);
                setMaterialDescription(product.material_description);
                setType(product.type);
                setBrandName(product.brand_id);
                setChildCategory(product.child_categories[0].id);

                product.colors && product.colors.map(color => {
                    setColorNqty((prevColorNqty) => ({
                        ...prevColorNqty,
                        [color.id]: color.pivot.color_quantity,
                    }))
                })

                product.sizes && product.sizes.map(size => {
                    setSizeNqty((prevSizeNqty) => ({
                        ...prevSizeNqty,
                        [size.id]: size.pivot.size_quantity,
                    }))
                })
            }
        }

        if (successModal) {
            dispatch(adminListProducts());
        }
    }, [dispatch, productId, product, successEdit, successModal]);

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

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            editProduct(
                productId,
                productName,
                productCode,
                price,
                discount,
                description,
                materialDescription,
                type,
                brandName,
                childCategory,
                colorNqty,
                sizeNqty
            )
        );

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Product with name "${productName}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Product</DialogTitle>
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
                                <FormControl
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
                                        {brands.data &&
                                            brands.data.map((brand) => {
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
                                <FormControl
                                    variant="outlined"
                                    className={classes.formControl}
                                >
                                    <InputLabel id="childCat">
                                        Child Category
                                    </InputLabel>
                                    <Select
                                        labelId="childCat"
                                        id="childCat-select"
                                        onChange={(e) =>
                                            setChildCategory(e.target.value)
                                        }
                                        label="Child Category"
                                        value={childCategory}
                                        defaultValue=""
                                    >
                                        {childCats.data &&
                                            childCats.data.map((childCat) => {
                                                return (
                                                    <MenuItem
                                                        value={childCat.id}
                                                        key={childCat.id}
                                                    >
                                                        {
                                                            childCat.child_category_name
                                                        }
                                                    </MenuItem>
                                                );
                                            })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="form__field">
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
                                        <MenuItem value={"MEN"}>MEN</MenuItem>
                                        <MenuItem value={"WOMEN"}>
                                            WOMEN
                                        </MenuItem>
                                        <MenuItem value={"BOYS"}>BOYS</MenuItem>
                                        <MenuItem value={"GIRLS"}>
                                            GIRLS
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="productName"
                                    label="Product Name"
                                    fullWidth
                                    value={productName}
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="productCode"
                                    label="Product Code"
                                    fullWidth
                                    value={productCode}
                                    onChange={(e) =>
                                        setProductCode(e.target.value)
                                    }
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    name="description"
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    label="Material Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={materialDescription}
                                    onChange={(e) =>
                                        setMaterialDescription(e.target.value)
                                    }
                                    name="material_description"
                                />
                            </div>

                            <div className="form__field">
                                <NumberFormat
                                    isAllowed={(values) => {
                                        const {
                                            formattedValue,
                                            floatValue,
                                        } = values;
                                        return (
                                            formattedValue === "" ||
                                            floatValue <= 100
                                        );
                                    }}
                                    label="Discount %"
                                    fullWidth
                                    variant="outlined"
                                    customInput={TextField}
                                    value={discount}
                                    onChange={(e) =>
                                        setDiscount(e.target.value)
                                    }
                                    renderText={(formattedValue) => (
                                        <Text>{formattedValue}</Text>
                                    )}
                                />
                            </div>

                            <div className="form__field">
                                <NumberFormat
                                    label="Price €"
                                    fullWidth
                                    variant="outlined"
                                    customInput={TextField}
                                    decimalScale={2}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
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
                                        <p>Current Colors and Qties.</p>
                                    </FormLabel>
                                    <FormGroup row>
                                        <div className="form__field--checkboxesQty">
                                            {product.colors &&
                                                product.colors.map((color) => {
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
                                                                        defaultChecked={
                                                                            product.colors &&
                                                                            product.colors.some(
                                                                                (
                                                                                    c
                                                                                ) =>
                                                                                    c.id ===
                                                                                    color.id
                                                                            )
                                                                                ? true
                                                                                : false
                                                                        }
                                                                    />
                                                                }
                                                                label={
                                                                    color.color_name
                                                                }
                                                                name="color"
                                                            />

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
                                                                defaultValue={
                                                                    color.pivot
                                                                        .color_quantity
                                                                }
                                                                type="number"
                                                                onChange={
                                                                    handleColorNQty
                                                                }
                                                                required
                                                            />
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
                                        <p>Add new Product Colors.</p>
                                        <p>
                                            Bellow you will find all available
                                            colors you can choose from.
                                        </p>
                                    </FormLabel>
                                    <FormGroup row>
                                        <div className="form__field--checkboxesQty">
                                            {productDetails.colors &&
                                                productDetails.colors.map(
                                                    (color) => {
                                                        return product.colors &&
                                                            product.colors.some(
                                                                (c) =>
                                                                    c.id ===
                                                                    color.id
                                                            ) ? (
                                                            ""
                                                        ) : (
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
                                                    }
                                                )}
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
                                        <p>Current Sizes and Qties.</p>
                                    </FormLabel>
                                    <FormGroup row>
                                        <div className="form__field--checkboxesQty">
                                            {product.sizes &&
                                                product.sizes.map((size) => {
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
                                                                        defaultChecked={
                                                                            product.sizes &&
                                                                            product.sizes.some(
                                                                                (
                                                                                    c
                                                                                ) =>
                                                                                    c.id ===
                                                                                    size.id
                                                                            )
                                                                                ? true
                                                                                : false
                                                                        }
                                                                    />
                                                                }
                                                                label={
                                                                    size.size_name
                                                                }
                                                                name="size"
                                                            />

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
                                                                defaultValue={
                                                                    size.pivot
                                                                        .size_quantity
                                                                }
                                                                type="number"
                                                                onChange={
                                                                    handleSizeNQty
                                                                }
                                                                required
                                                            />
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
                                        <p>Add new Product Sizes.</p>
                                        <p>
                                            Bellow you will find all available
                                            sizes you can choose from.
                                        </p>
                                    </FormLabel>
                                    <FormGroup row>
                                        <div className="form__field--checkboxesQty">
                                            {productDetails.sizes &&
                                                productDetails.sizes.map(
                                                    (size) => {
                                                        return product.sizes &&
                                                            product.sizes.some(
                                                                (c) =>
                                                                    c.id ===
                                                                    size.id
                                                            ) ? (
                                                            ""
                                                        ) : (
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
                                                    }
                                                )}
                                        </div>
                                    </FormGroup>
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
                            Edit Product
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default EditProductScreen;
