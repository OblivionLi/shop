import {
    ADDRESS_ADMIN_LIST_FAIL,
    ADDRESS_ADMIN_LIST_REQUEST,
    ADDRESS_ADMIN_LIST_RESET,
    ADDRESS_ADMIN_LIST_SUCCESS,
    ADDRESS_CREATE_FAIL,
    ADDRESS_CREATE_REQUEST,
    ADDRESS_CREATE_RESET,
    ADDRESS_CREATE_SUCCESS,
    ADDRESS_DELETE_FAIL,
    ADDRESS_DELETE_REQUEST,
    ADDRESS_DELETE_SUCCESS,
    ADDRESS_EDIT_FAIL,
    ADDRESS_EDIT_REQUEST,
    ADDRESS_EDIT_RESET,
    ADDRESS_EDIT_SUCCESS,
    ADDRESS_GET_DETAILS_FAIL,
    ADDRESS_GET_DETAILS_REQUEST,
    ADDRESS_GET_DETAILS_RESET,
    ADDRESS_GET_DETAILS_SUCCESS,
} from "../constants/addressConstants";

export const addressAdminListReducer = (state = { addresses: [] }, action) => {
    switch (action.type) {
        case ADDRESS_ADMIN_LIST_REQUEST:
            return { loading: true, addresses: [] };
        case ADDRESS_ADMIN_LIST_SUCCESS:
            return { loading: false, addresses: action.payload };
        case ADDRESS_ADMIN_LIST_FAIL:
            return { loading: false, error: action.payload };
        case ADDRESS_ADMIN_LIST_RESET:
            return {};
        default:
            return state;
    }
};

export const addressCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ADDRESS_CREATE_REQUEST:
            return { loading: true };
        case ADDRESS_CREATE_SUCCESS:
            return { loading: false, success: true, address: action.payload };
        case ADDRESS_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ADDRESS_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const addressGetEditDetailsReducer = (
    state = { address: {} },
    action
) => {
    switch (action.type) {
        case ADDRESS_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case ADDRESS_GET_DETAILS_SUCCESS:
            return { loading: false, address: action.payload };

        case ADDRESS_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case ADDRESS_GET_DETAILS_RESET:
            return {
                address: {},
            };
        default:
            return state;
    }
};

export const addressEditReducer = (state = { address: {} }, action) => {
    switch (action.type) {
        case ADDRESS_EDIT_REQUEST:
            return { loading: true };

        case ADDRESS_EDIT_SUCCESS:
            return { loading: false, success: true, address: action.payload };

        case ADDRESS_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case ADDRESS_EDIT_RESET:
            return {
                address: {},
            };
        default:
            return state;
    }
};

export const addressDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ADDRESS_DELETE_REQUEST:
            return { loading: true };

        case ADDRESS_DELETE_SUCCESS:
            return { loading: false, success: true };

        case ADDRESS_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};