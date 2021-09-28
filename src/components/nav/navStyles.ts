import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 240;
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        },
        root: {
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: theme.palette.type === 'dark' ? '#073642' : 'white'
        },
        appBar: {
            backgroundColor: theme.palette.type === 'dark' ? '#073642' : 'white',
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton: {
            marginRight: 36
        },
        hide: {
            display: 'none'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            backgroundColor: theme.palette.type === 'dark' ? '#073642' : 'white',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            backgroundColor: theme.palette.type === 'dark' ? '#073642' : 'white',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1
            }
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar
        },

        bottomPush: {
            position: 'fixed',
            bottom: 30,
            textAlign: 'center'
            // paddingBottom: 10,
        }
    })
);

// export const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         toproot: {
//             flexGrow: 1,
//             height: '100vh',
//             overflow: 'hidden',
//             position: 'fixed',
//             display: 'flex',
//             width: '100%'
//         },
//         root: {
//             flexGrow: 1,
//             minHeight: '100vh',
//             zIndex: 1,
//             overflow: 'hidden',
//             backgroundColor: theme.palette.type === 'dark' ? '#073642' : 'white'
//         },
//         iconToolBar: {
//             marginTop: 20
//         },
//         appBar: {
//             position: 'absolute',
//             backgroundColor: theme.palette.type === 'dark' ? '#073642' : 'white',
//             marginLeft: drawerWidth,
//             [theme.breakpoints.up('sm')]: {
//                 width: '100%'
//             },
//             [theme.breakpoints.up('lg')]: {
//                 display: 'none'
//             },
//             [theme.breakpoints.up('md')]: {
//                 display: 'none'
//             }
//         },
//         navIconHide: {
//             [theme.breakpoints.up('md')]: {
//                 display: 'none'
//             }
//         },
//         toolbar: theme.mixins.toolbar,
//         menu: {
//             '& .MuiPaper-root': {
//                 backgroundColor: theme.palette.type === 'dark' ? '#073642' : 'white'
//             }
//         },
//         drawerPaper: {
//             transition: theme.transitions.create('width', {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen
//             }),

//             overflowX: 'hidden',
//             backgroundColor: theme.palette.type === 'dark' ? '#073642' : 'white',
//             width: drawerWidth,
//             [theme.breakpoints.up('md')]: {
//                 position: 'absolute',

//                 // backgroundColor: theme.palette.type === "dark" ? "#073642" : "light",
//                 width: theme.spacing(7) + 1
//             }
//         },

//         iconMargin: {
//             [theme.breakpoints.up('md')]: {
//                 marginTop: 10,
//                 marginBottom: 10,
//                 marginLeft: 0
//             },
//             marginTop: 10,
//             marginBottom: 10,
//             marginLeft: 10
//         },

//         content: {
//             flexGrow: 1,
//             padding: theme.spacing(3)
//         },
//         paper: {
//             backgroundColor: theme.palette.type === 'dark' ? '#073642' : 'light',
//             position: 'absolute',
//             width: '100%',
//             minHeight: '100vh'
//         },

//     })
// );
