import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    useTheme,
    Button,
    Collapse,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Loader from "../components/Loader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { logout } from "../actions/userActions";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ProductsScreen from "../screens/admin/products/ProductsScreen";
import BrandsScreen from "../screens/admin/brands/BrandsScreen";
import ColorsScreen from "../screens/admin/colors/ColorsScreen";
import SizesScreen from "../screens/admin/sizes/SizesScreen";
import ParentCatScreen from "../screens/admin/parentCats/ParentCatScreen";
import ChildCatScreen from "../screens/admin/childCats/ChildCatScreen";
import UsersScreen from "../screens/admin/users/UsersScreen";
import RolesScreen from "../screens/admin/users/roles/RolesScreen";
import PermissionsScreen from "../screens/admin/users/permissions/PermissionsScreen";
import { GiClothes, GiFactory } from "react-icons/gi";
import { TiFlowChildren } from "react-icons/ti";
import { AiOutlineBgColors } from "react-icons/ai";
import { IoResizeSharp } from "react-icons/io5";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { FaUsers, FaUsersCog, FaUserTag } from "react-icons/fa";
import TypesScreen from "../screens/admin/types/TypesScreen";
// import ReviewsScreen from "../screens/admin/review"

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    icons: {
        height: "24px",
        width: "24px",
    },
    rel: {
        margin: "0 35px",
    },
}));

const AdminScreen = ({ history }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const [anchorEl2, setAnchorEl2] = useState(null);

    const dispatch = useDispatch();

    const handleClose = () => {
        setAnchorEl2(null);
    };

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [isAdmin, setIsAdmin] = useState(false);

    function handleClick() {
        setOpen2(!open2);
    }

    function handleClick2() {
        setOpen3(!open3);
    }

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push("/login");
        } else {
            setIsAdmin(true);
        }
    }, [dispatch]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logoutHandler = () => {
        dispatch(logout());
        history.push("/login");
    };

    return (
        <div className={classes.root}>
            {!isAdmin ? (
                <Loader />
            ) : (
                <>
                    <Router>
                        <CssBaseline />
                        <AppBar
                            position="fixed"
                            className={clsx(classes.appBar, {
                                [classes.appBarShift]: open,
                            })}
                        >
                            <Toolbar className="toolbar-nav">
                                <div className="toolbar-nav--left">
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawerOpen}
                                        edge="start"
                                        className={clsx(classes.menuButton, {
                                            [classes.hide]: open,
                                        })}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h6" noWrap>
                                        Administration Area
                                    </Typography>
                                </div>

                                <div className="toolbar-nav--right">
                                    <ul className="toolbar-nav--right--links">
                                        <li className="toolbar-nav--right--item">
                                            <Button
                                                variant="contained"
                                                href="/"
                                                className="toolbar-nav--right-btn"
                                            >
                                                Home
                                            </Button>
                                        </li>

                                        <li className="toolbar-nav--right--item">
                                            <Button
                                                variant="contained"
                                                aria-controls="auth-menu"
                                                aria-haspopup="true"
                                                onClick={(e) =>
                                                    setAnchorEl2(
                                                        e.currentTarget
                                                    )
                                                }
                                                className="toolbar-nav--right-btn"
                                            >
                                                {userInfo.name}
                                            </Button>
                                            <Menu
                                                id="auth-menu"
                                                anchorEl={anchorEl2}
                                                keepMounted
                                                open={Boolean(anchorEl2)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={handleClose}>
                                                    <a href="/profile">
                                                        Profile
                                                    </a>
                                                </MenuItem>

                                                <MenuItem onClick={handleClose}>
                                                    <Link
                                                        to="/"
                                                        onClick={logoutHandler}
                                                    >
                                                        Logout
                                                    </Link>
                                                </MenuItem>
                                            </Menu>
                                        </li>
                                    </ul>
                                </div>
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            variant="permanent"
                            className={clsx(classes.drawer, {
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            })}
                            classes={{
                                paper: clsx({
                                    [classes.drawerOpen]: open,
                                    [classes.drawerClose]: !open,
                                }),
                            }}
                        >
                            <div className={classes.toolbar}>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === "rtl" ? (
                                        <ChevronRightIcon />
                                    ) : (
                                        <ChevronLeftIcon />
                                    )}
                                </IconButton>
                            </div>
                            <Divider />
                            <List>
                                <ListItem button>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <Link to="/admin" className="admin--links">
                                        Dashboard
                                    </Link>
                                </ListItem>

                                <Divider />

                                <ListItem button>
                                    <ListItemIcon>
                                        <GiClothes className={classes.icons} />
                                    </ListItemIcon>
                                    <Link
                                        to="/admin/products"
                                        className="admin--links"
                                    >
                                        Products
                                    </Link>
                                </ListItem>

                                <ListItem button onClick={handleClick}>
                                    <ListItemIcon>
                                        <TiFlowChildren
                                            className={classes.icons}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Products Relationship"
                                        className="admin--links-drop"
                                    />
                                    {open2 ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </ListItem>
                                <Collapse
                                    in={open2}
                                    timeout="auto"
                                    unmountOnExit
                                    className="reportsMenu"
                                >
                                    <Divider />
                                    <List className={classes.rel}>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <GiFactory
                                                    className={classes.icons}
                                                />
                                            </ListItemIcon>
                                            <Link
                                                to="/admin/products/brands"
                                                className="admin--links"
                                            >
                                                Brands
                                            </Link>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <AiOutlineBgColors
                                                    className={classes.icons}
                                                />
                                            </ListItemIcon>
                                            <Link
                                                to="/admin/products/colors"
                                                className="admin--links"
                                            >
                                                Colors
                                            </Link>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <IoResizeSharp
                                                    className={classes.icons}
                                                />
                                            </ListItemIcon>
                                            <Link
                                                to="/admin/products/sizes"
                                                className="admin--links"
                                            >
                                                Sizes
                                            </Link>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <AccountTreeIcon
                                                    className={classes.icons}
                                                />
                                            </ListItemIcon>
                                            <Link
                                                to="/admin/products/parent-categories"
                                                className="admin--links"
                                            >
                                                Parent Cat.
                                            </Link>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <AccountTreeIcon
                                                    className={classes.icons}
                                                />
                                            </ListItemIcon>
                                            <Link
                                                to="/admin/products/child-categories"
                                                className="admin--links"
                                            >
                                                Child Cat.
                                            </Link>
                                        </ListItem>

                                        <ListItem button>
                                            <ListItemIcon>
                                                <AccountTreeIcon
                                                    className={classes.icons}
                                                />
                                            </ListItemIcon>
                                            <Link
                                                to="/admin/products/types"
                                                className="admin--links"
                                            >
                                                Types
                                            </Link>
                                        </ListItem>
                                    </List>
                                </Collapse>

                                <Divider />

                                <ListItem button>
                                    <ListItemIcon>
                                        <FaUsers className={classes.icons} />
                                    </ListItemIcon>
                                    <Link
                                        to="/admin/users"
                                        className="admin--links"
                                    >
                                        Users
                                    </Link>
                                </ListItem>

                                <ListItem button onClick={handleClick2}>
                                    <ListItemIcon>
                                        <FaUsersCog className={classes.icons} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Users Relationship"
                                        className="admin--links-drop"
                                    />
                                    {open3 ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </ListItem>
                                <Collapse
                                    in={open3}
                                    timeout="auto"
                                    unmountOnExit
                                    className="reportsMenu"
                                >
                                    <Divider />
                                    <List className={classes.rel}>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <FaUserTag
                                                    className={classes.icons}
                                                />
                                            </ListItemIcon>
                                            <Link
                                                to="/admin/users/roles"
                                                className="admin--links"
                                            >
                                                Roles
                                            </Link>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <RemoveCircleIcon
                                                    className={classes.icons}
                                                />
                                            </ListItemIcon>
                                            <Link
                                                to="/admin/users/permissions"
                                                className="admin--links"
                                            >
                                                Permissions
                                            </Link>
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </List>
                        </Drawer>
                        <main className={classes.content}>
                            <div className={classes.toolbar} />

                            <Switch>
                                {/* Public View */}
                                <Route
                                    path="/admin/products"
                                    component={ProductsScreen}
                                    exact
                                />

                                <Route
                                    path="/admin/products/brands"
                                    component={BrandsScreen}
                                />

                                <Route
                                    path="/admin/products/colors"
                                    component={ColorsScreen}
                                />

                                <Route
                                    path="/admin/products/sizes"
                                    component={SizesScreen}
                                />

                                <Route
                                    path="/admin/products/parent-categories"
                                    component={ParentCatScreen}
                                />

                                <Route
                                    path="/admin/products/child-categories"
                                    component={ChildCatScreen}
                                />

                                <Route
                                    path="/admin/products/types"
                                    component={TypesScreen}
                                />

                                <Route
                                    path="/admin/users"
                                    component={UsersScreen}
                                    exact
                                />

                                <Route
                                    path="/admin/users/roles"
                                    component={RolesScreen}
                                />
                                
                                 
                                <Route
                                    path="/admin/users/permissions"
                                    component={PermissionsScreen}
                                />

                                {/* <Route
                                    path='/admin/reviews'
                                    component={ReviewsScreen}
                                    
                                /> */}
                            </Switch>
                        </main>
                    </Router>
                </>
            )}
        </div>
    );
};

export default AdminScreen;
