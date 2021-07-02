import Axios from "axios";
import {
    ADDRESS_ADMIN_LIST_FAIL,
    ADDRESS_ADMIN_LIST_REQUEST,
    ADDRESS_ADMIN_LIST_SUCCESS,
    ADDRESS_CREATE_FAIL,
    ADDRESS_CREATE_REQUEST,
    ADDRESS_CREATE_SUCCESS,
    ADDRESS_DELETE_FAIL,
    ADDRESS_DELETE_REQUEST,
    ADDRESS_DELETE_SUCCESS,
    ADDRESS_EDIT_FAIL,
    ADDRESS_EDIT_REQUEST,
    ADDRESS_EDIT_SUCCESS,
    ADDRESS_GET_DETAILS_FAIL,
    ADDRESS_GET_DETAILS_REQUEST,
    ADDRESS_GET_DETAILS_SUCCESS,
} from "../constants/addressConstants";

export const adminListAddresses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADDRESS_ADMIN_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/address`, config);

        dispatch({ type: ADDRESS_ADMIN_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADDRESS_ADMIN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createAddress =
    (
        userId,
        name,
        surname,
        country,
        city,
        address,
        postal_code,
        phone_number
    ) =>
    async (dispatch, getState) => {
        try {
            dispatch({ type: ADDRESS_CREATE_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                },
            };

            const { data } = await Axios.post(
                `/api/address`,
                {
                    userId,
                    name,
                    surname,
                    country,
                    city,
                    address,
                    postal_code,
                    phone_number,
                },
                config
            );

            dispatch({ type: ADDRESS_CREATE_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: ADDRESS_CREATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const getEditAddressDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADDRESS_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/address/${id}`, config);

        dispatch({ type: ADDRESS_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADDRESS_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editAddress =
    (
        addressId,
        name,
        surname,
        country,
        city,
        address,
        postal_code,
        phone_number
    ) =>
    async (dispatch, getState) => {
        try {
            dispatch({ type: ADDRESS_EDIT_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                },
            };

            const { data } = await Axios.patch(
                `/api/address/${addressId}`,
                {
                    name,
                    surname,
                    country,
                    city,
                    address,
                    postal_code,
                    phone_number,
                },
                config
            );

            dispatch({ type: ADDRESS_EDIT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: ADDRESS_EDIT_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const deleteAddress = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADDRESS_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/address/${id}`, config);

        dispatch({ type: ADDRESS_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADDRESS_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
