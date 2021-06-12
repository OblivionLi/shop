import Axios from "axios";
import {
    REVIEW_ADMIN_LIST_FAIL,
    REVIEW_ADMIN_LIST_REQUEST,
    REVIEW_ADMIN_LIST_SUCCESS,
    REVIEW_DELETE_FAIL,
    REVIEW_DELETE_REQUEST,
    REVIEW_DELETE_SUCCESS,
    REVIEW_EDIT_FAIL,
    REVIEW_EDIT_REQUEST,
    REVIEW_EDIT_SUCCESS,
    REVIEW_GET_DETAILS_FAIL,
    REVIEW_GET_DETAILS_REQUEST,
    REVIEW_GET_DETAILS_SUCCESS,
    REVIEW_LIST_PAG_FAIL,
    REVIEW_LIST_PAG_REQUEST,
    REVIEW_LIST_PAG_SUCCESS,
} from "../constants/reviewConstants";

export const adminListReviews = () => async (dispatch, getState) => {
    try {
        dispatch({ type: REVIEW_ADMIN_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/reviews`, config);

        dispatch({ type: REVIEW_ADMIN_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REVIEW_ADMIN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const reviewsListPag = (product_id, page="") => async (dispatch, getState) => {
    try {
        dispatch({ type: REVIEW_LIST_PAG_REQUEST });

        const { data } = await Axios.get(`/api/reviews/product/${product_id}?page=${page}`);

        dispatch({ type: REVIEW_LIST_PAG_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REVIEW_LIST_PAG_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditReviewDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: REVIEW_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/reviews/${id}`, config);

        dispatch({ type: REVIEW_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REVIEW_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editReview =
    (reviewId, comment, admin_comment) => async (dispatch, getState) => {
        try {
            dispatch({ type: REVIEW_EDIT_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                },
            };

            const { data } = await Axios.patch(
                `/api/reviews/${reviewId}`,
                {
                    comment,
                    admin_comment,
                },
                config
            );

            dispatch({ type: REVIEW_EDIT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: REVIEW_EDIT_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const deleteReview = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: REVIEW_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/reviews/${id}`, config);

        dispatch({ type: REVIEW_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REVIEW_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
