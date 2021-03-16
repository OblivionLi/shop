import {
    SIZE_ADMIN_LIST_FAIL,
    SIZE_ADMIN_LIST_REQUEST,
    SIZE_ADMIN_LIST_RESET,
    SIZE_ADMIN_LIST_SUCCESS,
    SIZE_CREATE_FAIL,
    SIZE_CREATE_REQUEST,
    SIZE_CREATE_RESET,
    SIZE_CREATE_SUCCESS,
    SIZE_DELETE_FAIL,
    SIZE_DELETE_REQUEST,
    SIZE_DELETE_SUCCESS,
    SIZE_EDIT_FAIL,
    SIZE_EDIT_REQUEST,
    SIZE_EDIT_RESET,
    SIZE_EDIT_SUCCESS,
    SIZE_GET_DETAILS_FAIL,
    SIZE_GET_DETAILS_REQUEST,
    SIZE_GET_DETAILS_RESET,
    SIZE_GET_DETAILS_SUCCESS,
} from "../constants/sizeConstants";

export const sizeAdminListReducer = (state = { sizes: [] }, action) => {
    switch (action.type) {
        case SIZE_ADMIN_LIST_REQUEST:
            return { loading: true, sizes: [] };
        case SIZE_ADMIN_LIST_SUCCESS:
            return { loading: false, sizes: action.payload };
        case SIZE_ADMIN_LIST_FAIL:
            return { loading: false, error: action.payload };
        case SIZE_ADMIN_LIST_RESET:
            return {};
        default:
            return state;
    }
};

export const sizeCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SIZE_CREATE_REQUEST:
            return { loading: true };
        case SIZE_CREATE_SUCCESS:
            return { loading: false, success: true, size: action.payload };
        case SIZE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case SIZE_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const sizeGetEditDetailsReducer = (state = { size: {} }, action) => {
    switch (action.type) {
        case SIZE_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case SIZE_GET_DETAILS_SUCCESS:
            return { loading: false, size: action.payload };

        case SIZE_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case SIZE_GET_DETAILS_RESET:
            return {
                size: {},
            };
        default:
            return state;
    }
};

export const sizeEditReducer = (state = { size: {} }, action) => {
    switch (action.type) {
        case SIZE_EDIT_REQUEST:
            return { loading: true };

        case SIZE_EDIT_SUCCESS:
            return { loading: false, success: true, size: action.payload };

        case SIZE_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case SIZE_EDIT_RESET:
            return {
                size: {},
            };
        default:
            return state;
    }
};

export const sizeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SIZE_DELETE_REQUEST:
            return { loading: true };

        case SIZE_DELETE_SUCCESS:
            return { loading: false, success: true };

        case SIZE_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
