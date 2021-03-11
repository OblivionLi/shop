import Axios from "axios";
import {
    PERMISSION_CREATE_FAIL,
    PERMISSION_CREATE_REQUEST,
    PERMISSION_CREATE_SUCCESS,
    PERMISSION_DELETE_FAIL,
    PERMISSION_DELETE_REQUEST,
    PERMISSION_DELETE_SUCCESS,
    PERMISSION_EDIT_FAIL,
    PERMISSION_EDIT_REQUEST,
    PERMISSION_EDIT_SUCCESS,
    PERMISSION_GET_DETAILS_FAIL,
    PERMISSION_GET_DETAILS_REQUEST,
    PERMISSION_GET_DETAILS_SUCCESS,
    PERMISSION_LIST_FAIL,
    PERMISSION_LIST_REQUEST,
    PERMISSION_LIST_SUCCESS,
} from "../constants/permissionConstants";

export const listPermissions = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PERMISSION_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/permissions`, config);

        dispatch({ type: PERMISSION_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PERMISSION_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditPermissionDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PERMISSION_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/permissions/${id}`, config);

        dispatch({ type: PERMISSION_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PERMISSION_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editPermission = (id, name) => async (dispatch, getState) => {
    try {
        dispatch({ type: PERMISSION_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/permissions/${id}`,
            { name },
            config
        );

        dispatch({ type: PERMISSION_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PERMISSION_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createPermission = (name) => async (dispatch, getState) => {
    try {
        dispatch({ type: PERMISSION_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post("/api/permissions", { name }, config);

        dispatch({ type: PERMISSION_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PERMISSION_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deletePermission = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PERMISSION_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/permissions/${id}`, config);

        dispatch({ type: PERMISSION_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PERMISSION_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
