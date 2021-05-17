import Axios from "axios";
import {
    TYPE_ADMIN_LIST_FAIL,
    TYPE_ADMIN_LIST_REQUEST,
    TYPE_ADMIN_LIST_SUCCESS,
    TYPE_CREATE_FAIL,
    TYPE_CREATE_REQUEST,
    TYPE_CREATE_SUCCESS,
    TYPE_DELETE_FAIL,
    TYPE_DELETE_REQUEST,
    TYPE_DELETE_SUCCESS,
    TYPE_EDIT_FAIL,
    TYPE_EDIT_REQUEST,
    TYPE_EDIT_SUCCESS,
    TYPE_GET_DETAILS_FAIL,
    TYPE_GET_DETAILS_REQUEST,
    TYPE_GET_DETAILS_SUCCESS,
} from "../constants/typeConstants";

export const adminListTypes = () => async (dispatch, getState) => {
    try {
        dispatch({ type: TYPE_ADMIN_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/type`, config);

        dispatch({ type: TYPE_ADMIN_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TYPE_ADMIN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createType = (name) => async (dispatch, getState) => {
    try {
        dispatch({ type: TYPE_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(`/api/type`, {name}, config);

        dispatch({ type: TYPE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TYPE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditTypeDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TYPE_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/type/${id}`, config);

        dispatch({ type: TYPE_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TYPE_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editType = (
    typeId,
    type_name
) => async (dispatch, getState) => {
    try {
        dispatch({ type: TYPE_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/type/${typeId}`,
            {
                type_name
            },
            config
        );

        dispatch({ type: TYPE_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TYPE_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteType = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TYPE_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/type/${id}`, config);

        dispatch({ type: TYPE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TYPE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};