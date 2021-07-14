import React from "react";
import { Divider } from "@material-ui/core";
import { FaChild, FaMale, FaFemale, FaPhoneAlt } from "react-icons/fa";
import { MdLocalOffer, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__cat">
                <div className="footer__cat--wrapper">
                    <h4 className="footer__cat--title">Categories</h4>
                    <Divider />

                    <ul className="footer__cat--links">
                        <li>
                            <span className="footer__cat--links-icon">
                                <FaMale />
                            </span>
                            <Link
                                to={`/products/type/${"men"}`}
                                className="menu"
                            >
                                MEN
                            </Link>
                        </li>
                        <li>
                            <span className="footer__cat--links-icon">
                                <FaFemale />
                            </span>
                            <Link
                                to={`/products/type/${"women"}`}
                                className="menu"
                            >
                                WOMEN
                            </Link>
                        </li>
                        <li>
                            <span className="footer__cat--links-icon">
                                <FaChild />
                            </span>
                            <Link
                                to={`/products/type/${"kids"}`}
                                className="menu"
                            >
                                KIDS
                            </Link>
                        </li>
                        <li>
                            <span className="footer__cat--links-icon">
                                <MdLocalOffer />
                            </span>
                            <Link
                                to={`/products/type/${"offers"}`}
                                className="menu"
                            >
                                OFFERS
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="footer__cat--wrapper">
                    <h4 className="footer__cat--title">Contact Us</h4>
                    <Divider />

                    <ul className="footer__cat--links">
                        <li>
                            <span className="footer__cat--links-icon">
                                <FaPhoneAlt />
                            </span>
                            <span className="phoneNumber">
                                +(00) 123 456 789
                            </span>
                        </li>
                        <li>
                            <span className="footer__cat--links-icon">
                                <MdEmail />
                            </span>
                            <a href="mailto:shop@contact.us" className="menu">
                                shop@contact.us
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <Divider />

            <div className="footer__copyright">
                <p>&copy;2021. All rights reserved.</p>
                <p>
                    Website created by{" "}
                    <a
                        target="_blank"
                        href="https://github.com/OblivionLi"
                        className="menu"
                    >
                        OblivionLi
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
