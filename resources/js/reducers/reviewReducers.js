import {
    REVIEW_ADMIN_LIST_FAIL,
    REVIEW_ADMIN_LIST_REQUEST,
    REVIEW_ADMIN_LIST_RESET,
    REVIEW_ADMIN_LIST_SUCCESS,
    REVIEW_DELETE_FAIL,
    REVIEW_DELETE_REQUEST,
    REVIEW_DELETE_SUCCESS,
    REVIEW_EDIT_FAIL,
    REVIEW_EDIT_REQUEST,
    REVIEW_EDIT_RESET,
    REVIEW_EDIT_SUCCESS,
    REVIEW_GET_DETAILS_FAIL,
    REVIEW_GET_DETAILS_REQUEST,
    REVIEW_GET_DETAILS_RESET,
    REVIEW_GET_DETAILS_SUCCESS,
    REVIEW_LIST_PAG_FAIL,
    REVIEW_LIST_PAG_REQUEST,
    REVIEW_LIST_PAG_RESET,
    REVIEW_LIST_PAG_SUCCESS,
} from "../constants/reviewConstants";

export const reviewAdminListReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case REVIEW_ADMIN_LIST_REQUEST:
            return { loading: true, reviews: [] };
        case REVIEW_ADMIN_LIST_SUCCESS:
            return { loading: false, reviews: action.payload };
        case REVIEW_ADMIN_LIST_FAIL:
            return { loading: false, error: action.payload };
        case REVIEW_ADMIN_LIST_RESET:
            return {};
        default:
            return state;
    }
};

export const reviewListPagReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case REVIEW_LIST_PAG_REQUEST:
            return { loading: true, reviews: [] };
        case REVIEW_LIST_PAG_SUCCESS:
            return { loading: false, reviews: action.payload };
        case REVIEW_LIST_PAG_FAIL:
            return { loading: false, error: action.payload };
        case REVIEW_LIST_PAG_RESET:
            return {};
        default:
            return state;
    }
};

export const reviewGetEditDetailsReducer = (state = { review: {} }, action) => {
    switch (action.type) {
        case REVIEW_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case REVIEW_GET_DETAILS_SUCCESS:
            return { loading: false, review: action.payload };

        case REVIEW_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case REVIEW_GET_DETAILS_RESET:
            return {
                review: {},
            };
        default:
            return state;
    }
};

export const reviewEditReducer = (state = { review: {} }, action) => {
    switch (action.type) {
        case REVIEW_EDIT_REQUEST:
            return { loading: true };

        case REVIEW_EDIT_SUCCESS:
            return { loading: false, success: true, review: action.payload };

        case REVIEW_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case REVIEW_EDIT_RESET:
            return {
                review: {},
            };
        default:
            return state;
    }
};

export const reviewDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_DELETE_REQUEST:
            return { loading: true };

        case REVIEW_DELETE_SUCCESS:
            return { loading: false, success: true };

        case REVIEW_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
