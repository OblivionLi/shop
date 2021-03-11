import {
    ROLE_CREATE_FAIL,
    ROLE_CREATE_REQUEST,
    ROLE_CREATE_RESET,
    ROLE_CREATE_SUCCESS,
    ROLE_DELETE_FAIL,
    ROLE_DELETE_REQUEST,
    ROLE_DELETE_SUCCESS,
    ROLE_EDIT_FAIL,
    ROLE_EDIT_REQUEST,
    ROLE_EDIT_RESET,
    ROLE_EDIT_SUCCESS,
    ROLE_GET_DETAILS_FAIL,
    ROLE_GET_DETAILS_REQUEST,
    ROLE_GET_DETAILS_RESET,
    ROLE_GET_DETAILS_SUCCESS,
    ROLE_LIST_FAIL,
    ROLE_LIST_REQUEST,
    ROLE_LIST_RESET,
    ROLE_LIST_SUCCESS,
} from "../constants/roleConstants";

export const roleListReducer = (state = { roles: [] }, action) => {
    switch (action.type) {
        case ROLE_LIST_REQUEST:
            return { loading: true, roles: [] };

        case ROLE_LIST_SUCCESS:
            return { loading: false, roles: action.payload };

        case ROLE_LIST_FAIL:
            return { loading: false, error: action.payload };

        case ROLE_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const roleGetEditDetailsReducer = (state = { role: {} }, action) => {
    switch (action.type) {
        case ROLE_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case ROLE_GET_DETAILS_SUCCESS:
            return { loading: false, role: action.payload };

        case ROLE_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case ROLE_GET_DETAILS_RESET:
            return {
                role: {},
            };
        default:
            return state;
    }
};

export const roleEditReducer = (state = { role: {} }, action) => {
    switch (action.type) {
        case ROLE_EDIT_REQUEST:
            return { loading: true };

        case ROLE_EDIT_SUCCESS:
            return { loading: false, success: true, role: action.payload };

        case ROLE_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case ROLE_EDIT_RESET:
            return {
                role: {},
            };
        default:
            return state;
    }
};

export const roleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ROLE_CREATE_REQUEST:
            return { loading: true };

        case ROLE_CREATE_SUCCESS:
            return { loading: false, success: true, role: action.payload };

        case ROLE_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case ROLE_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

export const roleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ROLE_DELETE_REQUEST:
            return { loading: true };

        case ROLE_DELETE_SUCCESS:
            return { loading: false, success: true };

        case ROLE_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
