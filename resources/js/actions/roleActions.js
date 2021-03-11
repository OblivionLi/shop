import Axios from "axios";
import {
    ROLE_CREATE_FAIL,
    ROLE_CREATE_REQUEST,
    ROLE_CREATE_SUCCESS,
    ROLE_DELETE_FAIL,
    ROLE_DELETE_REQUEST,
    ROLE_DELETE_SUCCESS,
    ROLE_EDIT_FAIL,
    ROLE_EDIT_REQUEST,
    ROLE_EDIT_SUCCESS,
    ROLE_GET_DETAILS_FAIL,
    ROLE_GET_DETAILS_REQUEST,
    ROLE_GET_DETAILS_SUCCESS,
    ROLE_LIST_FAIL,
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,
} from "../constants/roleConstants";

export const listRoles = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ROLE_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/roles`, config);

        dispatch({ type: ROLE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ROLE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditRoleDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROLE_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/roles/${id}`, config);

        dispatch({ type: ROLE_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ROLE_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editRole = (id, name, is_admin, perms) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: ROLE_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/roles/${id}`,
            { name, is_admin, perms },
            config
        );

        dispatch({ type: ROLE_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ROLE_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createRole = (name) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROLE_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post("/api/roles", { name }, config);

        dispatch({ type: ROLE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ROLE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteRole = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROLE_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/roles/${id}`, config);

        dispatch({ type: ROLE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ROLE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
