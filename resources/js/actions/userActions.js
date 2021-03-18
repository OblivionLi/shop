import Axios from "axios";

import {
    RESET_USER_FAIL,
    RESET_USER_REQUEST,
    RESET_USER_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_EDIT_FAIL,
    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_GET_DETAILS_FAIL,
    USER_GET_DETAILS_REQUEST,
    USER_GET_DETAILS_SUCCESS,
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

export const register = (
    name,
    email,
    password,
    password_confirmation
) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
        };

        const { data } = await Axios.post(
            "/api/register",
            {
                name,
                email,
                password,
                password_confirmation,
            },
            config
        );

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const login = (email, password, remember_me) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "aplication/json",
                "X-Requested-With": "XMLHttpRequest",
            },
        };

        const { data } = await Axios.post(
            "/api/login",
            {
                email,
                password,
                remember_me,
            },
            config
        );

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_REGISTER_RESET });
    dispatch({ type: USER_LIST_RESET });
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/users`, config);

        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const resetPass = (
    email,
    password,
    password_confirmation
) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_RESET_PASS_REQUEST });

        const { data } = await Axios.patch(
            `/api/reset-password/${email}`,
            {
                email,
                password,
                password_confirmation
            }
        );

        dispatch({ type: USER_RESET_PASS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_RESET_PASS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const getUserToReset = (
    id
) => async (dispatch, getState) => {
    try {
        dispatch({ type: RESET_USER_REQUEST });

        const { data } = await Axios.get(
            `/api/reset-password/${id}`,
        );

        dispatch({ type: RESET_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: RESET_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/users/${id}`, config);

        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/users/${id}`, config);

        dispatch({ type: USER_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editUser = (id, name, email, role) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: USER_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/users/${id}`,
            { name, email, role },
            config
        );

        dispatch({ type: USER_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
