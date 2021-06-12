import {
    PRODUCT_ADMIN_LIST_FAIL,
    PRODUCT_ADMIN_LIST_REQUEST,
    PRODUCT_ADMIN_LIST_RESET,
    PRODUCT_ADMIN_LIST_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_RESET,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_GET_DETAILS_FAIL,
    PRODUCT_GET_DETAILS_REQUEST,
    PRODUCT_GET_DETAILS_RESET,
    PRODUCT_GET_DETAILS_SUCCESS,
    PRODUCT_GET_REL_DETAILS_FAIL,
    PRODUCT_GET_REL_DETAILS_REQUEST,
    PRODUCT_GET_REL_DETAILS_RESET,
    PRODUCT_GET_REL_DETAILS_SUCCESS,
    PRODUCT_IMAGE_CREATE_FAIL,
    PRODUCT_IMAGE_CREATE_REQUEST,
    PRODUCT_IMAGE_CREATE_RESET,
    PRODUCT_IMAGE_CREATE_SUCCESS,
    PRODUCT_IMAGE_DELETE_FAIL,
    PRODUCT_IMAGE_DELETE_REQUEST,
    PRODUCT_IMAGE_DELETE_SUCCESS,
    PRODUCT_IMAGE_REPLACE_FAIL,
    PRODUCT_IMAGE_REPLACE_REQUEST,
    PRODUCT_IMAGE_REPLACE_RESET,
    PRODUCT_IMAGE_REPLACE_SUCCESS,
    PRODUCT_ORDERBY_LIST_FAIL,
    PRODUCT_ORDERBY_LIST_REQUEST,
    PRODUCT_ORDERBY_LIST_RESET,
    PRODUCT_ORDERBY_LIST_SUCCESS,
} from "../constants/productConstants";

export const productAdminListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_ADMIN_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_ADMIN_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_ADMIN_LIST_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_ADMIN_LIST_RESET:
            return {};
        default:
            return state;
    }
};

export const productOrderByListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_ORDERBY_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_ORDERBY_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_ORDERBY_LIST_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_ORDERBY_LIST_RESET:
            return {};
        default:
            return state;
    }
};

export const productGetEditDetailsReducer = (
    state = { product: {} },
    action
) => {
    switch (action.type) {
        case PRODUCT_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case PRODUCT_GET_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };

        case PRODUCT_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_GET_DETAILS_RESET:
            return {
                product: {},
            };
        default:
            return state;
    }
};

export const productGetRelDetailsReducer = (
    state = { productDetails: [] },
    action
) => {
    switch (action.type) {
        case PRODUCT_GET_REL_DETAILS_REQUEST:
            return { loading: true, productDetails: [] };

        case PRODUCT_GET_REL_DETAILS_SUCCESS:
            return { loading: false, productDetails: action.payload };

        case PRODUCT_GET_REL_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_GET_REL_DETAILS_RESET:
            return {};
        default:
            return state;
    }
};

export const productEditReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_EDIT_REQUEST:
            return { loading: true };

        case PRODUCT_EDIT_SUCCESS:
            return { loading: false, success: true, product: action.payload };

        case PRODUCT_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_EDIT_RESET:
            return {
                product: {},
            };
        default:
            return state;
    }
};

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };

        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };

        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true };

        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };

        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const productImageCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_IMAGE_CREATE_REQUEST:
            return { loading: true };

        case PRODUCT_IMAGE_CREATE_SUCCESS:
            return { loading: false, success: true, image: action.payload };

        case PRODUCT_IMAGE_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_IMAGE_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

export const productImageReplaceReducer = (state = { productImage: {} }, action) => {
    switch (action.type) {
        case PRODUCT_IMAGE_REPLACE_REQUEST:
            return { loading: true };

        case PRODUCT_IMAGE_REPLACE_SUCCESS:
            return { loading: false, success: true, productImage: action.payload };

        case PRODUCT_IMAGE_REPLACE_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_IMAGE_REPLACE_RESET:
            return {
                productImage: {},
            };
        default:
            return state;
    }
};

export const productImageDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_IMAGE_DELETE_REQUEST:
            return { loading: true };

        case PRODUCT_IMAGE_DELETE_SUCCESS:
            return { loading: false, success: true };

        case PRODUCT_IMAGE_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};
