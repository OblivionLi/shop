import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/public/users/LoginScreen';
import RegisterScreen from './screens/public/users/RegisterScreen';
import ResetPasswordScreen from './screens/public/users/ResetPasswordScreen';
import ForgotPasswordScreen from './screens/public/users/ForgotPasswordScreen';
import AdminScreen from './screens/AdminScreen'
import ShowProductScreen from './screens/public/products/ShowProductScreen';
import ReviewsScreen from './screens/public/products/ReviewsScreen';
import CartScreen from './screens/public/shop/CartScreen';
import PlaceOrderScreen from './screens/public/shop/PlaceOrderScreen';
import ShippingScreen from './screens/public/shop/ShippingScreen';
import ShowOrderScreen from './screens/public/shop/ShowOrderScreen';
import ProfileScreen from './screens/public/users/ProfileScreen';
import SettingsScreen from './screens/public/users/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import ProductsListScreen from './screens/public/products/ProductsListScreen';

function Index() {
    return (
        <Router>
            <Switch>
                {/* Users */}
                <Route path="/" component={HomeScreen} exact />
                <Route path="/login" component={LoginScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/reset-password/:id" component={ResetPasswordScreen} />
                <Route path="/forgot-password" component={ForgotPasswordScreen} />
                <Route path="/profile" component={ProfileScreen} exact />
                <Route path="/profile/settings" component={SettingsScreen}/>

                {/* About */}
                <Route path="/about" component={AboutScreen}/>

                {/* Products */}
                <Route path="/product/:id" component={ShowProductScreen} />
                <Route path="/products/type/:type/parent-category/:pCat/child-category/:cCat" component={ProductsListScreen} exact />
                <Route path="/products/type/:type/parent-category/:pCat/child-category/:cCat/:page?" component={ProductsListScreen} />

                {/* Reviews */}
                <Route path="/reviews/product/:id" component={ReviewsScreen} exact />
                <Route path="/reviews/product/:id/:page?" component={ReviewsScreen} />

                {/* Cart */}
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/shipping/:id?" component={ShippingScreen} />
                <Route path="/placeorder/:id?" component={PlaceOrderScreen} />

                {/* Order */}
                <Route path="/order/:id?" component={ShowOrderScreen} />

                {/* Admin View */}
                <Route path="/admin" component={AdminScreen} />
            </Switch>
        </Router>
    );
}

export default Index;

if (document.getElementById("app")) {
    ReactDOM.render(
        <Provider store={store}>
            <Index />
        </Provider>,
        document.getElementById("app")
    );
}
