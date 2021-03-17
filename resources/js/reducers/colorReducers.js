import {
    COLOR_ADMIN_LIST_FAIL,
    COLOR_ADMIN_LIST_REQUEST,
    COLOR_ADMIN_LIST_RESET,
    COLOR_ADMIN_LIST_SUCCESS,
    COLOR_CREATE_FAIL,
    COLOR_CREATE_REQUEST,
    COLOR_CREATE_RESET,
    COLOR_CREATE_SUCCESS,
    COLOR_DELETE_FAIL,
    COLOR_DELETE_REQUEST,
    COLOR_DELETE_SUCCESS,
    COLOR_EDIT_FAIL,
    COLOR_EDIT_REQUEST,
    COLOR_EDIT_RESET,
    COLOR_EDIT_SUCCESS,
    COLOR_GET_DETAILS_FAIL,
    COLOR_GET_DETAILS_REQUEST,
    COLOR_GET_DETAILS_RESET,
    COLOR_GET_DETAILS_SUCCESS,
} from "../constants/colorConstants";

export const colorAdminListReducer = (state = { colors: [] }, action) => {
    switch (action.type) {
        case COLOR_ADMIN_LIST_REQUEST:
            return { loading: true, colors: [] };
        case COLOR_ADMIN_LIST_SUCCESS:
            return { loading: false, colors: action.payload };
        case COLOR_ADMIN_LIST_FAIL:
            return { loading: false, error: action.payload };
        case COLOR_ADMIN_LIST_RESET:
            return {};
        default:
            return state;
    }
};

export const colorCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case COLOR_CREATE_REQUEST:
            return { loading: true };
        case COLOR_CREATE_SUCCESS:
            return { loading: false, success: true, color: action.payload };
        case COLOR_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case COLOR_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const colorGetEditDetailsReducer = (state = { color: {} }, action) => {
    switch (action.type) {
        case COLOR_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case COLOR_GET_DETAILS_SUCCESS:
            return { loading: false, color: action.payload };

        case COLOR_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case COLOR_GET_DETAILS_RESET:
            return {
                color: {},
            };
        default:
            return state;
    }
};

export const colorEditReducer = (state = { color: {} }, action) => {
    switch (action.type) {
        case COLOR_EDIT_REQUEST:
            return { loading: true };

        case COLOR_EDIT_SUCCESS:
            return { loading: false, success: true, color: action.payload };

        case COLOR_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case COLOR_EDIT_RESET:
            return {
                color: {},
            };
        default:
            return state;
    }
};

export const colorDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case COLOR_DELETE_REQUEST:
            return { loading: true };

        case COLOR_DELETE_SUCCESS:
            return { loading: false, success: true };

        case COLOR_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
