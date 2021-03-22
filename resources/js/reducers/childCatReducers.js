import {
    CHILD_CATEGORY_ADMIN_LIST_FAIL,
    CHILD_CATEGORY_ADMIN_LIST_REQUEST,
    CHILD_CATEGORY_ADMIN_LIST_RESET,
    CHILD_CATEGORY_ADMIN_LIST_SUCCESS,
    CHILD_CATEGORY_CREATE_FAIL,
    CHILD_CATEGORY_CREATE_REQUEST,
    CHILD_CATEGORY_CREATE_RESET,
    CHILD_CATEGORY_CREATE_SUCCESS,
    CHILD_CATEGORY_DELETE_FAIL,
    CHILD_CATEGORY_DELETE_REQUEST,
    CHILD_CATEGORY_DELETE_SUCCESS,
    CHILD_CATEGORY_EDIT_FAIL,
    CHILD_CATEGORY_EDIT_REQUEST,
    CHILD_CATEGORY_EDIT_RESET,
    CHILD_CATEGORY_EDIT_SUCCESS,
    CHILD_CATEGORY_GET_DETAILS_FAIL,
    CHILD_CATEGORY_GET_DETAILS_REQUEST,
    CHILD_CATEGORY_GET_DETAILS_RESET,
    CHILD_CATEGORY_GET_DETAILS_SUCCESS,
} from "../constants/childCatConstants";

export const childCatAdminListReducer = (state = { childCats: [] }, action) => {
    switch (action.type) {
        case CHILD_CATEGORY_ADMIN_LIST_REQUEST:
            return { loading: true, childCats: [] };
        case CHILD_CATEGORY_ADMIN_LIST_SUCCESS:
            return { loading: false, childCats: action.payload };
        case CHILD_CATEGORY_ADMIN_LIST_FAIL:
            return { loading: false, error: action.payload };
        case CHILD_CATEGORY_ADMIN_LIST_RESET:
            return {};
        default:
            return state;
    }
};

export const childCatCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CHILD_CATEGORY_CREATE_REQUEST:
            return { loading: true };
        case CHILD_CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true, childCat: action.payload };
        case CHILD_CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case CHILD_CATEGORY_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const childCatGetEditDetailsReducer = (state = { childCat: {} }, action) => {
    switch (action.type) {
        case CHILD_CATEGORY_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case CHILD_CATEGORY_GET_DETAILS_SUCCESS:
            return { loading: false, childCat: action.payload };

        case CHILD_CATEGORY_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case CHILD_CATEGORY_GET_DETAILS_RESET:
            return {
                childCat: {},
            };
        default:
            return state;
    }
};

export const childCatEditReducer = (state = { childCat: {} }, action) => {
    switch (action.type) {
        case CHILD_CATEGORY_EDIT_REQUEST:
            return { loading: true };

        case CHILD_CATEGORY_EDIT_SUCCESS:
            return { loading: false, success: true, childCat: action.payload };

        case CHILD_CATEGORY_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case CHILD_CATEGORY_EDIT_RESET:
            return {
                childCat: {},
            };
        default:
            return state;
    }
};

export const childCatDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CHILD_CATEGORY_DELETE_REQUEST:
            return { loading: true };

        case CHILD_CATEGORY_DELETE_SUCCESS:
            return { loading: false, success: true };

        case CHILD_CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
