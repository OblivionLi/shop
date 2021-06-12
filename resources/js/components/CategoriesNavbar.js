import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
    adminListProducts,
    getEditProductRelDetails,
} from "../actions/productActions";
import { adminListTypes } from "../actions/typeActions";
import Loader from "./Loader";
import Message from "./Message";
import Swal from "sweetalert2";
import Moment from "react-moment";

const Navbar2 = () => {
    const dispatch = useDispatch();

    const productGetRelDetails = useSelector((state) => state.productGetRelDetails);
    const { productDetails } = productGetRelDetails;

    const { parentCats } = productDetails;

    useEffect(() => {
        dispatch(getEditProductRelDetails());
    }, [dispatch]);

    return (
        <div className="main">
            <nav className="main__navbar">
                <ul className="main__navbar--lists">
                    <li className="main__navbar--list men">
                        <a href="#men" className="menu">
                            MEN
                        </a>

                        <div className="menu__content">
                            <div className="menu__content-lists">
                                {parentCats &&
                                    parentCats.map((pCats) =>
                                        pCats.type.name == "MEN" ? (
                                            <ul key={pCats.id}>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="menu__content-titleM"
                                                    >
                                                        {
                                                            pCats.parent_category_name
                                                        }
                                                    </a>
                                                </li>

                                                {pCats.child_cats.map(
                                                    (childCat) => (
                                                        <li key={childCat.id}>
                                                            <a
                                                                href="#"
                                                                className="menu__content-lists--linkM"
                                                            >
                                                                {
                                                                    childCat.child_category_name
                                                                }
                                                            </a>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : null
                                    )}
                            </div>
                        </div>
                    </li>

                    <li className="main__navbar--list women">
                        <a href="#men" className="menu">
                            WOMEN
                        </a>

                        <div className="menu__content">
                            <div className="menu__content-lists">
                                {parentCats &&
                                    parentCats.map((pCats) =>
                                        pCats.type.name == "WOMEN" ? (
                                            <ul key={pCats.id}>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="menu__content-titleF"
                                                    >
                                                        {
                                                            pCats.parent_category_name
                                                        }
                                                    </a>
                                                </li>

                                                {pCats.child_cats.map(
                                                    (childCat) => (
                                                        <li key={childCat.id}>
                                                            <a
                                                                href="#"
                                                                className="menu__content-lists--linkF"
                                                            >
                                                                {
                                                                    childCat.child_category_name
                                                                }
                                                            </a>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : null
                                    )}
                            </div>
                        </div>
                    </li>

                    <li className="main__navbar--list kids">
                        <a href="#men" className="menu">
                            KIDS
                        </a>

                        <div className="menu__content">
                            <div className="menu__content-lists">
                                {parentCats &&
                                    parentCats.map((pCats) =>
                                        pCats.type.name == "KIDS" ? (
                                            <ul key={pCats.id}>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="menu__content-titleK"
                                                    >
                                                        {
                                                            pCats.parent_category_name
                                                        }
                                                    </a>
                                                </li>

                                                {pCats.child_cats.map(
                                                    (childCat) => (
                                                        <li key={childCat.id}>
                                                            <a
                                                                href="#"
                                                                className="menu__content-lists--linkK"
                                                            >
                                                                {
                                                                    childCat.child_category_name
                                                                }
                                                            </a>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : null
                                    )}
                            </div>
                        </div>
                    </li>

                    <li className="main__navbar--list offers">
                        <a href="#men" className="menu">
                            OFFERS
                        </a>

                        <div className="menu__content">
                            <div className="menu__content-lists">
                                {parentCats &&
                                    parentCats.map((pCats) =>
                                        pCats.type.name == "OFFERS" ? (
                                            <ul key={pCats.id}>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="menu__content-titleO"
                                                    >
                                                        {
                                                            pCats.parent_category_name
                                                        }
                                                    </a>
                                                </li>

                                                {pCats.child_cats.map(
                                                    (childCat) => (
                                                        <li key={childCat.id}>
                                                            <a
                                                                href="#"
                                                                className="menu__content-lists--linkO"
                                                            >
                                                                {
                                                                    childCat.child_category_name
                                                                }
                                                            </a>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : null
                                    )}
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar2;
