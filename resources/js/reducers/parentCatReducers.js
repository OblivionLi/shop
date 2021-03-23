import {
    PARENT_CATEGORY_ADMIN_LIST_FAIL,
    PARENT_CATEGORY_ADMIN_LIST_REQUEST,
    PARENT_CATEGORY_ADMIN_LIST_RESET,
    PARENT_CATEGORY_ADMIN_LIST_SUCCESS,
    PARENT_CATEGORY_CREATE_FAIL,
    PARENT_CATEGORY_CREATE_REQUEST,
    PARENT_CATEGORY_CREATE_RESET,
    PARENT_CATEGORY_CREATE_SUCCESS,
    PARENT_CATEGORY_DELETE_FAIL,
    PARENT_CATEGORY_DELETE_REQUEST,
    PARENT_CATEGORY_DELETE_SUCCESS,
    PARENT_CATEGORY_EDIT_FAIL,
    PARENT_CATEGORY_EDIT_REQUEST,
    PARENT_CATEGORY_EDIT_RESET,
    PARENT_CATEGORY_EDIT_SUCCESS,
    PARENT_CATEGORY_GET_DETAILS_FAIL,
    PARENT_CATEGORY_GET_DETAILS_REQUEST,
    PARENT_CATEGORY_GET_DETAILS_RESET,
    PARENT_CATEGORY_GET_DETAILS_SUCCESS,
} from "../constants/parentCatConstants";

export const parentCatAdminListReducer = (state = { parentCats: [] }, action) => {
    switch (action.type) {
        case PARENT_CATEGORY_ADMIN_LIST_REQUEST:
            return { loading: true, parentCats: [] };
        case PARENT_CATEGORY_ADMIN_LIST_SUCCESS:
            return { loading: false, parentCats: action.payload };
        case PARENT_CATEGORY_ADMIN_LIST_FAIL:
            return { loading: false, error: action.payload };
        case PARENT_CATEGORY_ADMIN_LIST_RESET:
            return {};
        default:
            return state;
    }
};

export const parentCatCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PARENT_CATEGORY_CREATE_REQUEST:
            return { loading: true };
        case PARENT_CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true, parentCat: action.payload };
        case PARENT_CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PARENT_CATEGORY_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const parentCatGetEditDetailsReducer = (state = { parentCat: {} }, action) => {
    switch (action.type) {
        case PARENT_CATEGORY_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case PARENT_CATEGORY_GET_DETAILS_SUCCESS:
            return { loading: false, parentCat: action.payload };

        case PARENT_CATEGORY_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case PARENT_CATEGORY_GET_DETAILS_RESET:
            return {
                parentCat: {},
            };
        default:
            return state;
    }
};

export const parentCatEditReducer = (state = { parentCat: {} }, action) => {
    switch (action.type) {
        case PARENT_CATEGORY_EDIT_REQUEST:
            return { loading: true };

        case PARENT_CATEGORY_EDIT_SUCCESS:
            return { loading: false, success: true, parentCat: action.payload };

        case PARENT_CATEGORY_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case PARENT_CATEGORY_EDIT_RESET:
            return {
                parentCat: {},
            };
        default:
            return state;
    }
};

export const parentCatDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PARENT_CATEGORY_DELETE_REQUEST:
            return { loading: true };

        case PARENT_CATEGORY_DELETE_SUCCESS:
            return { loading: false, success: true };

        case PARENT_CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
