import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PublicIcon from '@material-ui/icons/Public';
import StorageIcon from '@material-ui/icons/Storage';
import INavProps from '../../interface/nav';
import { useStyles } from './navStyles';
import { Box, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from '../../app/store';
import { isFireSelector } from '../../selector/auth';
import CasinoIcon from '@material-ui/icons/Casino';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';

export const iconArray = [
    {
        title: 'Countries',
        icon: <PublicIcon />,
        navlink: '/countries'
    },
    {
        title: 'Slot Machine',
        icon: <CasinoIcon />,
        navlink: '/slot'
    },
    {
        title: 'SQL Questions',
        icon: <StorageIcon />,
        navlink: '/sql'
    }
];

const NavPage: React.FunctionComponent<INavProps> = (props) => {
    const { homeThem, handletoggleTheme, children } = props;
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const dispatch = useDispatch();
    const icon = homeThem === 'dark' ? <Brightness7Icon /> : <Brightness3Icon />;
    const [open, setOpen] = React.useState(false);
    const fireSelector = useSelector(isFireSelector);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
    };
    //return mini variant material ui navigation
    return (
        <Box className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img style={{ height: 70, width: 70 }} alt="logo" src="/itest.png" />
                    <Typography style={{ flex: 1 }}>iTest</Typography>
                    <Tooltip title="Change Theme">
                        <IconButton onClick={handletoggleTheme}>{icon}</IconButton>
                    </Tooltip>
                    {fireSelector !== '' && (
                        <Tooltip title="Logout">
                            <IconButton onClick={handleLogout} style={{ color: 'orange' }}>
                                <ExitToAppIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            >
                <Box className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
                </Box>
                <Divider />

                <List>
                    {fireSelector === '' && (
                        <List>
                            <ListItem button onClick={() => history.push('/')}>
                                <Tooltip title="Login">
                                    <ListItemIcon>
                                        <VpnKeyIcon />
                                    </ListItemIcon>
                                </Tooltip>
                                <ListItemText primary="Login" />
                            </ListItem>
                            <Divider />
                        </List>
                    )}
                    <List>
                        {iconArray.map((item, index) => (
                            <ListItem button key={index} onClick={() => history.push(item.navlink)}>
                                <Tooltip title={item.title}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                </Tooltip>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        ))}
                    </List>
                </List>
            </Drawer>
            <main className={classes.content}>
                <Box className={classes.toolbar} />
                {children}
            </main>
            {/* </Paper> */}
        </Box>
    );
};

export default NavPage;
