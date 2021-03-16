import Axios from "axios";
import {
    SIZE_ADMIN_LIST_FAIL,
    SIZE_ADMIN_LIST_REQUEST,
    SIZE_ADMIN_LIST_SUCCESS,
    SIZE_CREATE_FAIL,
    SIZE_CREATE_REQUEST,
    SIZE_CREATE_SUCCESS,
    SIZE_DELETE_FAIL,
    SIZE_DELETE_REQUEST,
    SIZE_DELETE_SUCCESS,
    SIZE_EDIT_FAIL,
    SIZE_EDIT_REQUEST,
    SIZE_EDIT_SUCCESS,
    SIZE_GET_DETAILS_FAIL,
    SIZE_GET_DETAILS_REQUEST,
    SIZE_GET_DETAILS_SUCCESS,
} from "../constants/sizeConstants";

export const adminListSizes = () => async (dispatch, getState) => {
    try {
        dispatch({ type: SIZE_ADMIN_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/size`, config);

        dispatch({ type: SIZE_ADMIN_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SIZE_ADMIN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createSize = (size_name) => async (dispatch, getState) => {
    try {
        dispatch({ type: SIZE_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(`/api/size`, { size_name }, config);

        dispatch({ type: SIZE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SIZE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditSizeDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SIZE_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/size/${id}`, config);

        dispatch({ type: SIZE_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SIZE_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editSize = (sizeId, size_name, size_quantity) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: SIZE_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/size/${sizeId}`,
            {
                size_name,
                size_quantity,
            },
            config
        );

        dispatch({ type: SIZE_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SIZE_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteSize = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SIZE_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/size/${id}`, config);

        dispatch({ type: SIZE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SIZE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
