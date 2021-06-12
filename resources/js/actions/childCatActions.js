import Axios from "axios";
import {
    CHILD_CATEGORY_ADMIN_LIST_FAIL,
    CHILD_CATEGORY_ADMIN_LIST_REQUEST,
    CHILD_CATEGORY_ADMIN_LIST_SUCCESS,
    CHILD_CATEGORY_CREATE_FAIL,
    CHILD_CATEGORY_CREATE_REQUEST,
    CHILD_CATEGORY_CREATE_SUCCESS,
    CHILD_CATEGORY_DELETE_FAIL,
    CHILD_CATEGORY_DELETE_REQUEST,
    CHILD_CATEGORY_DELETE_SUCCESS,
    CHILD_CATEGORY_EDIT_FAIL,
    CHILD_CATEGORY_EDIT_REQUEST,
    CHILD_CATEGORY_EDIT_SUCCESS,
    CHILD_CATEGORY_GET_DETAILS_FAIL,
    CHILD_CATEGORY_GET_DETAILS_REQUEST,
    CHILD_CATEGORY_GET_DETAILS_SUCCESS,
} from "../constants/childCatConstants";

export const adminListChildCats = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CHILD_CATEGORY_ADMIN_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/childCat`, config);

        dispatch({ type: CHILD_CATEGORY_ADMIN_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CHILD_CATEGORY_ADMIN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createChildCat = (child_category_name, parent_category_name) => async (dispatch, getState) => {
    try {
        dispatch({ type: CHILD_CATEGORY_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(`/api/childCat`, { child_category_name, parent_category_name }, config);

        dispatch({ type: CHILD_CATEGORY_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CHILD_CATEGORY_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditChildCatDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CHILD_CATEGORY_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/childCat/${id}`, config);

        dispatch({ type: CHILD_CATEGORY_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CHILD_CATEGORY_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editChildCat = (childId, child_category_name, parent_category_name) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: CHILD_CATEGORY_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/childCat/${childId}`,
            {
                child_category_name,
                parent_category_name,
            },
            config
        );

        dispatch({ type: CHILD_CATEGORY_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CHILD_CATEGORY_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteChildCat = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CHILD_CATEGORY_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/childCat/${id}`, config);

        dispatch({ type: CHILD_CATEGORY_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CHILD_CATEGORY_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
