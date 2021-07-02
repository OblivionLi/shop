import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstant";

export const addToCart = (id, qty) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
        },
    };

    const { data } = await Axios.get(`/api/product/${id}`, config);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.data.id,
            name: data.data.name,
            brand: data.data.brand.brand_name,
            product_code: data.data.product_code,
            discount: data.data.discount,
            price: data.data.price,
            description: data.data.description,
            material_description: data.data.material_description,
            total_quantities: data.data.total_quantities,
            size_name: data.data.sizes[0].size_name,
            color_name: data.data.colors[0].color_name,
            sizeQty: data.data.sizes[0].pivot.size_quantity,
            colorQty: data.data.colors[0].pivot.color_quantity,
            qty
        }
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const removeFromCart = id => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};