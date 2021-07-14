import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HelpIcon from "@material-ui/icons/Help";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import { logout } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
    registerLink: {
        margin: "auto 0",
        fontWeight: "600",
        fontSize: "19px",
        color: "#3a446b",
        opacity: "0.5",
        "&:hover": {
            textDecoration: "none",
            // opacity: '1'
        },
    },
    grow: {
        flexGrow: 1,
        width: '80%',
        margin: '0 auto'
    },
    appbar: {
        backgroundColor: "seashell",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    img: {
        color: "#3a446b",
    },
    sectionDesktop: {
        display: "none",

        "@media (min-width: 575.98px)": {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        "@media (min-width: 575.98px)": {
            display: "none",
        },
    },
    icons: {
        color: "#3a446b",
    },
}));

const Navbar = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const cart = useSelector((state) => state.cart);

    const logoutHandler = () => {
        dispatch(logout());
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.icons}
                >
                    <AccountCircle />
                </IconButton>
                <Link to="/profile">Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <IconButton className={classes.icons}>
                    <SettingsIcon />
                </IconButton>
                <Link to="/profile/settings">Settings</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <IconButton className={classes.icons}>
                    <ExitToAppIcon />
                </IconButton>
                <a href="/" onClick={logoutHandler}>
                    Logout
                </a>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton color="inherit" className={classes.icons}>
                    <HelpIcon />
                </IconButton>
                <Link to="/about">About</Link>
            </MenuItem>
            <MenuItem>
                <IconButton color="inherit" className={classes.icons}>
                    <Badge
                        badgeContent={cart.cartItems.length}
                        color="secondary"
                    >
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <Link to="/cart">Cart</Link>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.icons}
                >
                    <AccountCircle />
                </IconButton>
                <Link to="/profile">Profile</Link>
            </MenuItem>
        </Menu>
    );
    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <div className="brand">
                        <Link to="/">
                            <img
                                src={`http://127.0.0.1:8000/images/logo.png`}
                                className={classes.img}
                            />
                        </Link>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Link to="/about">
                            <IconButton
                                color="inherit"
                                className={classes.icons}
                            >
                                <HelpIcon />
                            </IconButton>
                        </Link>
                        <Link to="/cart">
                            <IconButton
                                color="inherit"
                                className={classes.icons}
                            >
                                <Badge
                                    badgeContent={cart.cartItems.length}
                                    color="secondary"
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Link>

                        {userInfo ? (
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                                className={classes.icons}
                            >
                                <AccountCircle />
                            </IconButton>
                        ) : (
                            <Link to="/login" className={classes.registerLink}>
                                Login
                            </Link>
                        )}
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                            className={classes.icons}
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
};

export default Navbar;
