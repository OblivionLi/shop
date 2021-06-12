import Axios from "axios";
import {
    PARENT_CATEGORY_ADMIN_LIST_FAIL,
    PARENT_CATEGORY_ADMIN_LIST_REQUEST,
    PARENT_CATEGORY_ADMIN_LIST_SUCCESS,
    PARENT_CATEGORY_CREATE_FAIL,
    PARENT_CATEGORY_CREATE_REQUEST,
    PARENT_CATEGORY_CREATE_SUCCESS,
    PARENT_CATEGORY_DELETE_FAIL,
    PARENT_CATEGORY_DELETE_REQUEST,
    PARENT_CATEGORY_DELETE_SUCCESS,
    PARENT_CATEGORY_EDIT_FAIL,
    PARENT_CATEGORY_EDIT_REQUEST,
    PARENT_CATEGORY_EDIT_SUCCESS,
    PARENT_CATEGORY_GET_DETAILS_FAIL,
    PARENT_CATEGORY_GET_DETAILS_REQUEST,
    PARENT_CATEGORY_GET_DETAILS_SUCCESS,
    PARENT_CATEGORY_LIST_FAIL,
    PARENT_CATEGORY_LIST_REQUEST,
    PARENT_CATEGORY_LIST_SUCCESS,
} from "../constants/parentCatConstants";

export const adminListParentCats = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PARENT_CATEGORY_ADMIN_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/parentCat`, config);

        dispatch({ type: PARENT_CATEGORY_ADMIN_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PARENT_CATEGORY_ADMIN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listParentCats = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PARENT_CATEGORY_LIST_REQUEST });

        const { data } = await Axios.get(`/api/listParentCat`);

        dispatch({ type: PARENT_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PARENT_CATEGORY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createParentCat = (parent_category_name, type) => async (dispatch, getState) => {
    try {
        dispatch({ type: PARENT_CATEGORY_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(`/api/parentCat`, { parent_category_name, type }, config);

        dispatch({ type: PARENT_CATEGORY_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PARENT_CATEGORY_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditParentCatDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PARENT_CATEGORY_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/parentCat/${id}`, config);

        dispatch({ type: PARENT_CATEGORY_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PARENT_CATEGORY_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editParentCat = (parentId, parent_category_name, type) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: PARENT_CATEGORY_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/parentCat/${parentId}`,
            {
                parent_category_name, type
            },
            config
        );

        dispatch({ type: PARENT_CATEGORY_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PARENT_CATEGORY_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteParentCat = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PARENT_CATEGORY_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/parentCat/${id}`, config);

        dispatch({ type: PARENT_CATEGORY_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PARENT_CATEGORY_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
