import {
    TYPE_ADMIN_LIST_FAIL,
    TYPE_ADMIN_LIST_REQUEST,
    TYPE_ADMIN_LIST_RESET,
    TYPE_ADMIN_LIST_SUCCESS,
    TYPE_CREATE_FAIL,
    TYPE_CREATE_REQUEST,
    TYPE_CREATE_RESET,
    TYPE_CREATE_SUCCESS,
    TYPE_DELETE_FAIL,
    TYPE_DELETE_REQUEST,
    TYPE_DELETE_SUCCESS,
    TYPE_EDIT_FAIL,
    TYPE_EDIT_REQUEST,
    TYPE_EDIT_RESET,
    TYPE_EDIT_SUCCESS,
    TYPE_GET_DETAILS_FAIL,
    TYPE_GET_DETAILS_REQUEST,
    TYPE_GET_DETAILS_RESET,
    TYPE_GET_DETAILS_SUCCESS,
} from "../constants/typeConstants";

export const typeAdminListReducer = (state = { types: [] }, action) => {
    switch (action.type) {
        case TYPE_ADMIN_LIST_REQUEST:
            return { loading: true, types: [] };
        case TYPE_ADMIN_LIST_SUCCESS:
            return { loading: false, types: action.payload };
        case TYPE_ADMIN_LIST_FAIL:
            return { loading: false, error: action.payload };
        case TYPE_ADMIN_LIST_RESET:
            return {};
        default:
            return state;
    }
};

export const typeCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case TYPE_CREATE_REQUEST:
            return { loading: true };
        case TYPE_CREATE_SUCCESS:
            return { loading: false, success: true, type: action.payload };
        case TYPE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case TYPE_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const typeGetEditDetailsReducer = (state = { type: {} }, action) => {
    switch (action.type) {
        case TYPE_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case TYPE_GET_DETAILS_SUCCESS:
            return { loading: false, type: action.payload };

        case TYPE_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case TYPE_GET_DETAILS_RESET:
            return {
                type: {},
            };
        default:
            return state;
    }
};

export const typeEditReducer = (state = { type: {} }, action) => {
    switch (action.type) {
        case TYPE_EDIT_REQUEST:
            return { loading: true };

        case TYPE_EDIT_SUCCESS:
            return { loading: false, success: true, type: action.payload };

        case TYPE_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case TYPE_EDIT_RESET:
            return {
                type: {},
            };
        default:
            return state;
    }
};

export const typeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TYPE_DELETE_REQUEST:
            return { loading: true };

        case TYPE_DELETE_SUCCESS:
            return { loading: false, success: true };

        case TYPE_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
