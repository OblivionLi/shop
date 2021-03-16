import Axios from "axios";
import {
    BRAND_ADMIN_LIST_FAIL,
    BRAND_ADMIN_LIST_REQUEST,
    BRAND_ADMIN_LIST_SUCCESS,
    BRAND_CREATE_FAIL,
    BRAND_CREATE_REQUEST,
    BRAND_CREATE_SUCCESS,
    BRAND_DELETE_FAIL,
    BRAND_DELETE_REQUEST,
    BRAND_DELETE_SUCCESS,
    BRAND_EDIT_FAIL,
    BRAND_EDIT_REQUEST,
    BRAND_EDIT_SUCCESS,
    BRAND_GET_DETAILS_FAIL,
    BRAND_GET_DETAILS_REQUEST,
    BRAND_GET_DETAILS_SUCCESS,
} from "../constants/brandConstants";

export const adminListBrands = () => async (dispatch, getState) => {
    try {
        dispatch({ type: BRAND_ADMIN_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/brand`, config);

        dispatch({ type: BRAND_ADMIN_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BRAND_ADMIN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createBrand = (brand_name) => async (dispatch, getState) => {
    try {
        dispatch({ type: BRAND_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(`/api/brand`, {brand_name}, config);

        dispatch({ type: BRAND_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BRAND_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditBrandDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BRAND_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/brand/${id}`, config);

        dispatch({ type: BRAND_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BRAND_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editBrand = (
    brandId,
    brand_name,
    brand_quantity
) => async (dispatch, getState) => {
    try {
        dispatch({ type: BRAND_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/brand/${brandId}`,
            {
                brand_name,
                brand_quantity
            },
            config
        );

        dispatch({ type: BRAND_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BRAND_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteBrand = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BRAND_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/brand/${id}`, config);

        dispatch({ type: BRAND_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BRAND_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};