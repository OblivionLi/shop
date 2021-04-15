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
} from "./reducers/productReducers";
import {
    brandAdminListReducer,
    brandCreateReducer,
    brandGetEditDetailsReducer,
    brandEditReducer,
    brandDeleteReducer,
} from "./reducers/brandReducers";

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
    parentCatCreateReducer,
    parentCatGetEditDetailsReducer,
    parentCatEditReducer,
    parentCatDeleteReducer,
} from "./reducers/parentCatReducers";

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

    brandAdminList: brandAdminListReducer,
    brandCreate: brandCreateReducer,
    brandGetEditDetails: brandGetEditDetailsReducer,
    brandEdit: brandEditReducer,
    brandDelete: brandDeleteReducer,

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
});

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage,
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
