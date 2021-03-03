import {
    PRODUCT_ADMIN_LIST_FAIL,
    PRODUCT_ADMIN_LIST_REQUEST,
    PRODUCT_ADMIN_LIST_RESET,
    PRODUCT_ADMIN_LIST_SUCCESS,
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
