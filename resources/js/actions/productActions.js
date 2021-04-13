import Axios from "axios";
import {
    PRODUCT_ADMIN_LIST_FAIL,
    PRODUCT_ADMIN_LIST_REQUEST,
    PRODUCT_ADMIN_LIST_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_GET_DETAILS_FAIL,
    PRODUCT_GET_DETAILS_REQUEST,
    PRODUCT_GET_DETAILS_SUCCESS,
    PRODUCT_GET_REL_DETAILS_FAIL,
    PRODUCT_GET_REL_DETAILS_REQUEST,
    PRODUCT_GET_REL_DETAILS_SUCCESS,
    PRODUCT_IMAGE_CREATE_FAIL,
    PRODUCT_IMAGE_CREATE_REQUEST,
    PRODUCT_IMAGE_CREATE_SUCCESS,
    PRODUCT_IMAGE_DELETE_FAIL,
    PRODUCT_IMAGE_DELETE_REQUEST,
    PRODUCT_IMAGE_DELETE_SUCCESS,
} from "../constants/productConstants";

export const adminListProducts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_ADMIN_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/product`, config);

        dispatch({ type: PRODUCT_ADMIN_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_ADMIN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditProductRelDetails = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_GET_REL_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/relDetails`, config);

        dispatch({ type: PRODUCT_GET_REL_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_GET_REL_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditProductDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/product/${id}`, config);

        dispatch({ type: PRODUCT_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProduct = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
                "Content-Type": "multipart/form-data"
            },
        };

        const { data } = await Axios.post(
            "/api/product",
            formData,
            config
        );

        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editProduct = (
    productId,
    product_name,
    product_code,
    price,
    discount,
    description,
    material_description,
    type,
    brand_name,
    child_cat,
    colorNqty,
    sizeNqty
) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/product/${productId}`,
            {
                product_name,
                product_code,
                price,
                discount,
                description,
                material_description,
                type,
                brand_name,
                child_cat,
                colorNqty,
                sizeNqty
            },
            config
        );

        dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/product/${id}`, config);

        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProductImage = (productId, formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_IMAGE_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
                "Content-Type": "multipart/form-data"
            },
        };

        const { data } = await Axios.post(
            `/api/productImage/${productId}`,
            formData,
            config
        );

        dispatch({ type: PRODUCT_IMAGE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_IMAGE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const replaceProductImage = (
    productImageId,
    formData
) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
                "Content-Type": "multipart/form-data"
            },
        };

        const { data } = await Axios.put(
            `/api/productImage/${productImageId}`,
            formData,
            config
        );

        dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteProductImage = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_IMAGE_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/productImage/${id}`, config);

        dispatch({ type: PRODUCT_IMAGE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_IMAGE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
