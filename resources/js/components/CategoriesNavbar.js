import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getEditProductRelDetails,
} from "../actions/productActions";

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
                        <Link to={`/products/type/${'men'}`} className="menu">
                            MEN
                        </Link>

                        <div className="menu__content">
                            <div className="menu__content-lists">
                                {parentCats &&
                                    parentCats.map((pCats) =>
                                        pCats.type.name == "MEN" ? (
                                            <ul key={pCats.id}>
                                                <li>
                                                    <Link
                                                        to={`/products/type/${'men'}/parent-category/${pCats.parent_category_name.toLowerCase()}`}
                                                        className="menu__content-titleM"
                                                    >
                                                        {
                                                            pCats.parent_category_name
                                                        }
                                                    </Link>
                                                </li>

                                                {pCats.child_cats.map(
                                                    (childCat) => (
                                                        <li key={childCat.id}>
                                                            <Link
                                                                to={`/products/type/${pCats.type_id}/parent-category/${pCats.id}/child-category/${childCat.id}`}
                                                                className="menu__content-lists--linkM"
                                                            >
                                                                {
                                                                    childCat.child_category_name
                                                                }
                                                            </Link>
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
                        <Link to={`/products/type/${'women'}`} className="menu">
                            WOMEN
                        </Link>

                        <div className="menu__content">
                            <div className="menu__content-lists">
                                {parentCats &&
                                    parentCats.map((pCats) =>
                                        pCats.type.name == "WOMEN" ? (
                                            <ul key={pCats.id}>
                                                <li>
                                                    <Link
                                                        to={`/products/type/${'women'}/parent-category/${pCats.parent_category_name}`}
                                                        className="menu__content-titleF"
                                                    >
                                                        {
                                                            pCats.parent_category_name
                                                        }
                                                    </Link>
                                                </li>

                                                {pCats.child_cats.map(
                                                    (childCat) => (
                                                        <li key={childCat.id}>
                                                            <Link
                                                                to={`/products/type/${pCats.type_id}/parent-category/${pCats.id}/child-category/${childCat.id}`}
                                                                className="menu__content-lists--linkF"
                                                            >
                                                                {
                                                                    childCat.child_category_name
                                                                }
                                                            </Link>
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
                        <Link to={`/products/type/${'kids'}`} className="menu">
                            KIDS
                        </Link>

                        <div className="menu__content">
                            <div className="menu__content-lists">
                                {parentCats &&
                                    parentCats.map((pCats) =>
                                        pCats.type.name == "KIDS" ? (
                                            <ul key={pCats.id}>
                                                <li>
                                                    <Link
                                                        to={`/products/type/${'kids'}/parent-category/${pCats.parent_category_name}`}
                                                        className="menu__content-titleK"
                                                    >
                                                        {
                                                            pCats.parent_category_name
                                                        }
                                                    </Link>
                                                </li>

                                                {pCats.child_cats.map(
                                                    (childCat) => (
                                                        <li key={childCat.id}>
                                                            <Link
                                                                to={`/products/type/${pCats.type_id}/parent-category/${pCats.id}/child-category/${childCat.id}`}
                                                                className="menu__content-lists--linkK"
                                                            >
                                                                {
                                                                    childCat.child_category_name
                                                                }
                                                            </Link>
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
                        <Link to={`/products/type/${'offers'}`} className="menu">
                            OFFERS
                        </Link>

                        <div className="menu__content">
                            <div className="menu__content-lists">
                                {parentCats &&
                                    parentCats.map((pCats) =>
                                        pCats.type.name == "OFFERS" ? (
                                            <ul key={pCats.id}>
                                                <li>
                                                    <Link
                                                        to={`/products/type/${'offers'}/parent-category/${pCats.parent_category_name}`}
                                                        className="menu__content-titleO"
                                                    >
                                                        {
                                                            pCats.parent_category_name
                                                        }
                                                    </Link>
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
