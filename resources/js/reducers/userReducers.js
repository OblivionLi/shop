import {
    RESET_USER_FAIL,
    RESET_USER_REQUEST,
    RESET_USER_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_RESET,
    USER_REGISTER_SUCCESS,
    USER_RESET_PASS_FAIL,
    USER_RESET_PASS_REQUEST,
    USER_RESET_PASS_SUCCESS,
} from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };

        case USER_REGISTER_RESET:
            return {};

        default:
            return state;
    }
};

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };

        case USER_LOGOUT:
            return {};

        default:
            return state;
    }
};

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true, users: [] };

        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };

        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };

        case USER_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const userResetPassReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_RESET_PASS_REQUEST:
            return { loading: true };

        case USER_RESET_PASS_SUCCESS:
            return { loading: false, success: true };

        case USER_RESET_PASS_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const getUserResetReducer = (state = {}, action) => {
    switch (action.type) {
        case RESET_USER_REQUEST:
            return { loading: true };

        case RESET_USER_SUCCESS:
            return { loading: false, success: true, userReset: action.payload };

        case RESET_USER_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};