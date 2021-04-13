import Axios from "axios";
import {
    COLOR_ADMIN_LIST_FAIL,
    COLOR_ADMIN_LIST_REQUEST,
    COLOR_ADMIN_LIST_SUCCESS,
    COLOR_CREATE_FAIL,
    COLOR_CREATE_REQUEST,
    COLOR_CREATE_SUCCESS,
    COLOR_DELETE_FAIL,
    COLOR_DELETE_REQUEST,
    COLOR_DELETE_SUCCESS,
    COLOR_EDIT_FAIL,
    COLOR_EDIT_REQUEST,
    COLOR_EDIT_SUCCESS,
    COLOR_GET_DETAILS_FAIL,
    COLOR_GET_DETAILS_REQUEST,
    COLOR_GET_DETAILS_SUCCESS,
} from "../constants/colorConstants";

export const adminListColors = () => async (dispatch, getState) => {
    try {
        dispatch({ type: COLOR_ADMIN_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/color`, config);

        dispatch({ type: COLOR_ADMIN_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COLOR_ADMIN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createColor = (color_name) => async (dispatch, getState) => {
    try {
        dispatch({ type: COLOR_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(`/api/color`, { color_name }, config);

        dispatch({ type: COLOR_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COLOR_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditColorDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: COLOR_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/color/${id}`, config);

        dispatch({ type: COLOR_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COLOR_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editColor = (colorId, color_name) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: COLOR_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/color/${colorId}`,
            {
                color_name
            },
            config
        );

        dispatch({ type: COLOR_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COLOR_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteColor = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: COLOR_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/color/${id}`, config);

        dispatch({ type: COLOR_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COLOR_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
