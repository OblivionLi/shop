import {
    PERMISSION_CREATE_FAIL,
    PERMISSION_CREATE_REQUEST,
    PERMISSION_CREATE_RESET,
    PERMISSION_CREATE_SUCCESS,
    PERMISSION_DELETE_FAIL,
    PERMISSION_DELETE_REQUEST,
    PERMISSION_DELETE_SUCCESS,
    PERMISSION_EDIT_FAIL,
    PERMISSION_EDIT_REQUEST,
    PERMISSION_EDIT_RESET,
    PERMISSION_EDIT_SUCCESS,
    PERMISSION_GET_DETAILS_FAIL,
    PERMISSION_GET_DETAILS_REQUEST,
    PERMISSION_GET_DETAILS_RESET,
    PERMISSION_GET_DETAILS_SUCCESS,
    PERMISSION_LIST_FAIL,
    PERMISSION_LIST_REQUEST,
    PERMISSION_LIST_RESET,
    PERMISSION_LIST_SUCCESS,
} from "../constants/permissionConstants";

export const permissionListReducer = (state = { permissions: [] }, action) => {
    switch (action.type) {
        case PERMISSION_LIST_REQUEST:
            return { loading: true, permissions: [] };

        case PERMISSION_LIST_SUCCESS:
            return { loading: false, permissions: action.payload };

        case PERMISSION_LIST_FAIL:
            return { loading: false, error: action.payload };

        case PERMISSION_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const permissionGetEditDetailsReducer = (state = { permission: {} }, action) => {
    switch (action.type) {
        case PERMISSION_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case PERMISSION_GET_DETAILS_SUCCESS:
            return { loading: false, permission: action.payload };

        case PERMISSION_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case PERMISSION_GET_DETAILS_RESET:
            return {
                permission: {},
            };
        default:
            return state;
    }
};

export const permissionEditReducer = (state = { permission: {} }, action) => {
    switch (action.type) {
        case PERMISSION_EDIT_REQUEST:
            return { loading: true };

        case PERMISSION_EDIT_SUCCESS:
            return { loading: false, success: true, permission: action.payload };

        case PERMISSION_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case PERMISSION_EDIT_RESET:
            return {
                permission: {},
            };
        default:
            return state;
    }
};

export const permissionCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PERMISSION_CREATE_REQUEST:
            return { loading: true };

        case PERMISSION_CREATE_SUCCESS:
            return { loading: false, success: true, permission: action.payload };

        case PERMISSION_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case PERMISSION_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

export const permissionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PERMISSION_DELETE_REQUEST:
            return { loading: true };

        case PERMISSION_DELETE_SUCCESS:
            return { loading: false, success: true };

        case PERMISSION_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};