import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HelpIcon from "@material-ui/icons/Help";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
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
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade("#3a446b", 0.85),
        "&:hover": {
            backgroundColor: fade("#3a446b", 1),
        },
        margin: "0 auto",
        width: "40%",
        height: "100%",

        "@media (max-width: 575.98px)": {
            width: "100%",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",

        "@media (max-width: 575.98px)": {
            width: "20ch",
        },
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
                <a href="#">Profile</a>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <IconButton className={classes.icons}>
                    <SettingsIcon />
                </IconButton>
                <a href="#">Settings</a>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <IconButton className={classes.icons}>
                    <ExitToAppIcon />
                </IconButton>
                <Link to="/" onClick={logoutHandler}>
                    Logout
                </Link>
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
                    <MailIcon />
                </IconButton>
                <a href="#">Contact</a>
            </MenuItem>
            <MenuItem>
                <IconButton
                    aria-label="show 11 new notifications"
                    color="inherit"
                    className={classes.icons}
                >
                    <Badge badgeContent={11} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <a href="#">Cart</a>
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
                <a href="#">Profile</a>
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

                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ "aria-label": "search" }}
                            />
                        </div>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton color="inherit" className={classes.icons}>
                            <HelpIcon />
                        </IconButton>
                        <IconButton
                            aria-label="show 2 new notifications"
                            color="inherit"
                            className={classes.icons}
                        >
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

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
