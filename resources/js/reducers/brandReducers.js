import {
    BRAND_ADMIN_LIST_FAIL,
    BRAND_ADMIN_LIST_REQUEST,
    BRAND_ADMIN_LIST_RESET,
    BRAND_ADMIN_LIST_SUCCESS,
    BRAND_CREATE_FAIL,
    BRAND_CREATE_REQUEST,
    BRAND_CREATE_RESET,
    BRAND_CREATE_SUCCESS,
    BRAND_DELETE_FAIL,
    BRAND_DELETE_REQUEST,
    BRAND_DELETE_SUCCESS,
    BRAND_EDIT_FAIL,
    BRAND_EDIT_REQUEST,
    BRAND_EDIT_RESET,
    BRAND_EDIT_SUCCESS,
    BRAND_GET_DETAILS_FAIL,
    BRAND_GET_DETAILS_REQUEST,
    BRAND_GET_DETAILS_RESET,
    BRAND_GET_DETAILS_SUCCESS,
} from "../constants/brandConstants";

export const brandAdminListReducer = (state = { brands: [] }, action) => {
    switch (action.type) {
        case BRAND_ADMIN_LIST_REQUEST:
            return { loading: true, brands: [] };
        case BRAND_ADMIN_LIST_SUCCESS:
            return { loading: false, brands: action.payload };
        case BRAND_ADMIN_LIST_FAIL:
            return { loading: false, error: action.payload };
        case BRAND_ADMIN_LIST_RESET:
            return {};
        default:
            return state;
    }
};

export const brandCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BRAND_CREATE_REQUEST:
            return { loading: true };
        case BRAND_CREATE_SUCCESS:
            return { loading: false, success: true, brand: action.payload };
        case BRAND_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case BRAND_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const brandGetEditDetailsReducer = (
    state = { brand: {} },
    action
) => {
    switch (action.type) {
        case BRAND_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case BRAND_GET_DETAILS_SUCCESS:
            return { loading: false, brand: action.payload };

        case BRAND_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case BRAND_GET_DETAILS_RESET:
            return {
                brand: {},
            };
        default:
            return state;
    }
};

export const brandEditReducer = (state = { brand: {} }, action) => {
    switch (action.type) {
        case BRAND_EDIT_REQUEST:
            return { loading: true };

        case BRAND_EDIT_SUCCESS:
            return { loading: false, success: true, brand: action.payload };

        case BRAND_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case BRAND_EDIT_RESET:
            return {
                brand: {},
            };
        default:
            return state;
    }
};

export const brandDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case BRAND_DELETE_REQUEST:
            return { loading: true };

        case BRAND_DELETE_SUCCESS:
            return { loading: false, success: true };

        case BRAND_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};