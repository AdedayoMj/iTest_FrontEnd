import React, { useState } from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { Container } from 'reactstrap';
import Header from '../../components/header';
import cherry from '../../assets/images/cherry.jpg';
import apple from '../../assets/images/apple.jpg';
import lemon from '../../assets/images/lemon.jpg';
import banana from '../../assets/images/banana.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { totalTally } from '../../selector/slot';
import { addWins, removeWins } from '../../slices/slotSLice';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
// import { ConditionSlot } from './conditions';
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISlotMachineProps {}
const useStyles = makeStyles(() => ({
    paper: {
        margin: 20,
        padding: 30,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        background: '#05586e',
        borderRadius: 10
    },
    slots: { display: 'flex', justifyContent: 'space-between' },
    slot: {
        height: 170,
        width: 130,
        border: '2px solid white',
        borderRadius: 10,
        // background: 'red',
        margin: 0.5,
        padding: 0.5,
        transition: 'all 500ms'
    },
    spin: {
        marginTop: 60,
        borderRadius: 10,
        width: 100,
        height: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        background: 'orange',
        color: 'white',
        userSelect: 'none',
        '&:hover, &:focus': {
            cursor: 'pointer',
            backgroundColor: 'aqua'
        }
    },
    title: {
        height: 60,
        width: 400,
        background: '#073642',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 26,
        color: 'white',
        borderRadius: 10
    },
    total: {
        margin: 32,
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        fontSize: 20,
        background: 'white',
        borderRadius: 10
    }
}));
const SlotMachinePage: React.FunctionComponent = () => {
    const classes = useStyles();
    const totaltally = useSelector(totalTally);
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    // The dispatch function for dispatching actions when we
    // call our action creators.
    const dispatch = useDispatch();

    const baseReel1 = [cherry, lemon, apple, lemon, banana, banana, lemon, lemon];
    const baseReel2 = [lemon, apple, lemon, lemon, cherry, apple, banana, lemon];
    const baseReel3 = [lemon, apple, lemon, apple, cherry, lemon, banana, lemon];

    // By default, the slot machine colors are all grey. You can change
    // this if you want.
    const [newReel1, setReel1] = useState([cherry, apple, banana]);
    const [newReel2, setReel2] = useState([lemon, banana, apple]);
    const [newReel3, setReel3] = useState([apple, lemon, cherry]);

    const spin = () => {
        const convertnumber: number = +totalTally;
        console.log(convertnumber);

        const reel1: string[] = [];
        const reel2: string[] = [];
        const reel3: string[] = [];
        let i = 0;
        // Randomizing the the reel.
        while (i < 3) {
            const reel1Random = baseReel1[Math.floor(Math.random() * baseReel1.length)];
            reel1.push(reel1Random);
            const reel2Random = baseReel2[Math.floor(Math.random() * baseReel2.length)];
            reel2.push(reel2Random);
            const reel3Random = baseReel3[Math.floor(Math.random() * baseReel3.length)];
            reel3.push(reel3Random);
            i++;
        }

        dispatch(removeWins(1));

        // Set state with randomized colours.
        setReel1(reel1);
        setReel2(reel2);
        setReel3(reel3);

        const conditionReel1 = [reel1.every((c) => c === banana), reel1.every((c) => c === apple), reel1.every((c) => c === cherry), reel1.every((c) => c === lemon)];
        const conditionReel2 = [reel2.every((c) => c === banana), reel2.every((c) => c === apple), reel2.every((c) => c === cherry), reel2.every((c) => c === lemon)];
        const conditionReel3 = [reel3.every((c) => c === banana), reel3.every((c) => c === apple), reel3.every((c) => c === cherry), reel3.every((c) => c === lemon)];

        // // Check here if all colours are the same.
        if (conditionReel1[0]) {
            dispatch(addWins(15));
        } else if (conditionReel1[1]) {
            dispatch(addWins(20));
        } else if (conditionReel1[2]) {
            dispatch(addWins(50));
        } else if (conditionReel1[3]) {
            dispatch(addWins(3));
        } else if (reel1[0] === banana && reel1[1] === banana) {
            dispatch(addWins(5));
        } else if (reel1[0] === cherry && reel1[1] === cherry) {
            dispatch(addWins(40));
        } else if (reel1[0] === apple && reel1[1] === apple) {
            dispatch(addWins(10));
        }

        if (conditionReel2[0]) {
            dispatch(addWins(15));
        } else if (conditionReel2[1]) {
            dispatch(addWins(20));
        } else if (conditionReel2[2]) {
            dispatch(addWins(50));
        } else if (conditionReel2[3]) {
            dispatch(addWins(3));
        } else if (reel2[0] === banana && reel2[1] === banana) {
            dispatch(addWins(5));
        } else if (reel2[0] === cherry && reel2[1] === cherry) {
            dispatch(addWins(40));
        } else if (reel2[0] === apple && reel2[1] === apple) {
            dispatch(addWins(10));
        }
        if (conditionReel3[0]) {
            dispatch(addWins(15));
        } else if (conditionReel3[1]) {
            dispatch(addWins(20));
        } else if (conditionReel3[2]) {
            dispatch(addWins(50));
        } else if (conditionReel3[3]) {
            dispatch(addWins(3));
        } else if (reel3[0] === banana && reel3[1] === banana) {
            dispatch(addWins(5));
        } else if (reel3[0] === cherry && reel3[1] === cherry) {
            dispatch(addWins(40));
        } else if (reel3[0] === apple && reel3[1] === apple) {
            dispatch(addWins(10));
        }
    };

    const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };

    // Within the Slots div, create 3 slots. (Create a styled component called 'Slot'
    // and render it out 3 times). Their background colors should be those stored
    // in the newColors array. (Use inline styling)
    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="error">
                    You have no coin available
                </Alert>
            </Snackbar>
            <Header title="SLOT MACHINE">
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <Box className={classes.paper}>
                                <Box className={classes.slots}>
                                    {newReel1.map((slot) => (
                                        <Box
                                            key={Math.random()}
                                            className={classes.slot}
                                            style={{
                                                background: `url(${slot}) center center`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                transition: 'all 1000ms'
                                            }}
                                        />
                                    ))}
                                </Box>
                                <Box className={classes.slots}>
                                    {newReel2.map((slot) => (
                                        <Box
                                            key={Math.random()}
                                            className={classes.slot}
                                            style={{
                                                background: `url(${slot}) center center`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                transition: 'all 1000ms'
                                            }}
                                        />
                                    ))}
                                </Box>
                                <Box className={classes.slots}>
                                    {newReel3.map((slot) => (
                                        <Box
                                            key={Math.random()}
                                            className={classes.slot}
                                            style={{
                                                background: `url(${slot}) center center`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                transition: 'all 1000ms'
                                            }}
                                        />
                                    ))}
                                </Box>
                                {/* disabled={tally.wins === 5} */}
                                <Box onClick={() => spin()} className={classes.spin}>
                                    Spin!
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} lg={4}>
                            <Box className={classes.paper}>
                                <Box className={classes.title}>Total Coins</Box>
                                <Box style={{ margin: '1rem' }}>You have {totaltally} total coins left</Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Header>
        </Container>
    );
};

export default SlotMachinePage;
