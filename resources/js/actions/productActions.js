import Axios from "axios";
import {
    PRODUCT_ADMIN_LIST_FAIL,
    PRODUCT_ADMIN_LIST_REQUEST,
    PRODUCT_ADMIN_LIST_SUCCESS,
} from "../constants/productConstants";

export const adminListProducts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_ADMIN_LIST_REQUEST });

        const { data } = await Axios.get(`/api/product`);

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
