import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productAdminListReducer,
    productGetEditDetailsReducer,
    productEditReducer,
    productCreateReducer,
    productDeleteReducer,
    productGetRelDetailsReducer,
    productImageReplaceReducer,
    productImageCreateReducer,
    productImageDeleteReducer,
    productReviewCreateReducer,
    productOrderByListReducer
} from "./reducers/productReducers";
import {
    brandAdminListReducer,
    brandCreateReducer,
    brandGetEditDetailsReducer,
    brandEditReducer,
    brandDeleteReducer,
} from "./reducers/brandReducers";

import {
    addressAdminListReducer,
    addressCreateReducer,
    addressGetEditDetailsReducer,
    addressEditReducer,
    addressDeleteReducer,
} from "./reducers/addressReducers";

import {
    typeAdminListReducer,
    typeCreateReducer,
    typeGetEditDetailsReducer,
    typeEditReducer,
    typeDeleteReducer,
} from "./reducers/typeReducers";

import {
    reviewAdminListReducer,
    reviewGetEditDetailsReducer,
    reviewEditReducer,
    reviewDeleteReducer,
    reviewListPagReducer
} from "./reducers/reviewReducers";

import {
    sizeAdminListReducer,
    sizeCreateReducer,
    sizeGetEditDetailsReducer,
    sizeEditReducer,
    sizeDeleteReducer,
} from "./reducers/sizeReducers";

import {
    colorAdminListReducer,
    colorCreateReducer,
    colorGetEditDetailsReducer,
    colorEditReducer,
    colorDeleteReducer,
} from "./reducers/colorReducers";

import {
    userRegisterReducer,
    userLoginReducer,
    userListReducer,
    userResetPassReducer,
    getUserResetReducer,
    userDeleteReducer,
    userGetEditDetailsReducer,
    userEditReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from "./reducers/userReducers";

import {
    roleListReducer,
    roleGetEditDetailsReducer,
    roleEditReducer,
    roleCreateReducer,
    roleDeleteReducer,
} from "./reducers/roleReducers";

import {
    permissionListReducer,
    permissionGetEditDetailsReducer,
    permissionEditReducer,
    permissionCreateReducer,
    permissionDeleteReducer,
} from "./reducers/permissionReducers";

import {
    childCatAdminListReducer,
    childCatCreateReducer,
    childCatGetEditDetailsReducer,
    childCatEditReducer,
    childCatDeleteReducer,
} from "./reducers/childCatReducers";

import {
    parentCatAdminListReducer,
    parentCatListReducer,
    parentCatCreateReducer,
    parentCatGetEditDetailsReducer,
    parentCatEditReducer,
    parentCatDeleteReducer,
} from "./reducers/parentCatReducers";

import {
    cartReducer
} from "./reducers/cartReducers";

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderUserListReducer,
    orderListReducer,
    orderDeliverReducer,
    orderAdminListReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
    productAdminList: productAdminListReducer,
    productGetEditDetails: productGetEditDetailsReducer,
    productEdit: productEditReducer,
    productCreate: productCreateReducer,
    productDelete: productDeleteReducer,
    productGetRelDetails: productGetRelDetailsReducer,
    productImageReplace: productImageReplaceReducer,
    productImageCreate: productImageCreateReducer,
    productImageDelete: productImageDeleteReducer,
    productReviewCreate: productReviewCreateReducer,
    productOrderByList: productOrderByListReducer,

    brandAdminList: brandAdminListReducer,
    brandCreate: brandCreateReducer,
    brandGetEditDetails: brandGetEditDetailsReducer,
    brandEdit: brandEditReducer,
    brandDelete: brandDeleteReducer,

    addressAdminList: addressAdminListReducer,
    addressCreate: addressCreateReducer,
    addressGetEditDetails: addressGetEditDetailsReducer,
    addressEdit: addressEditReducer,
    addressDelete: addressDeleteReducer,

    typeAdminList: typeAdminListReducer,
    typeCreate: typeCreateReducer,
    typeGetEditDetails: typeGetEditDetailsReducer,
    typeEdit: typeEditReducer,
    typeDelete: typeDeleteReducer,

    reviewAdminList: reviewAdminListReducer,
    reviewListPag: reviewListPagReducer,
    reviewGetEditDetails: reviewGetEditDetailsReducer,
    reviewEdit: reviewEditReducer,
    reviewDelete: reviewDeleteReducer,

    sizeAdminList: sizeAdminListReducer,
    sizeCreate: sizeCreateReducer,
    sizeGetEditDetails: sizeGetEditDetailsReducer,
    sizeEdit: sizeEditReducer,
    sizeDelete: sizeDeleteReducer,

    childCatAdminList: childCatAdminListReducer,
    childCatCreate: childCatCreateReducer,
    childCatGetEditDetails: childCatGetEditDetailsReducer,
    childCatEdit: childCatEditReducer,
    childCatDelete: childCatDeleteReducer,

    parentCatList: parentCatListReducer,
    parentCatAdminList: parentCatAdminListReducer,
    parentCatCreate: parentCatCreateReducer,
    parentCatGetEditDetails: parentCatGetEditDetailsReducer,
    parentCatEdit: parentCatEditReducer,
    parentCatDelete: parentCatDeleteReducer,

    colorAdminList: colorAdminListReducer,
    colorCreate: colorCreateReducer,
    colorGetEditDetails: colorGetEditDetailsReducer,
    colorEdit: colorEditReducer,
    colorDelete: colorDeleteReducer,

    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userList: userListReducer,
    userResetPass: userResetPassReducer,
    getUserReset: getUserResetReducer,
    userDelete: userDeleteReducer,
    userGetEditDetails: userGetEditDetailsReducer,
    userEdit: userEditReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,

    roleList: roleListReducer,
    roleGetEditDetails: roleGetEditDetailsReducer,
    roleEdit: roleEditReducer,
    roleCreate: roleCreateReducer,
    roleDelete: roleDeleteReducer,

    permissionList: permissionListReducer,
    permissionGetEditDetails: permissionGetEditDetailsReducer,
    permissionEdit: permissionEditReducer,
    permissionCreate: permissionCreateReducer,
    permissionDelete: permissionDeleteReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderList: orderListReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    listUserOrder: orderUserListReducer,
    orderAdminList: orderAdminListReducer,

    cart: cartReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage,
    },

    cart: {
        cartItems: cartItemsFromStorage,
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
