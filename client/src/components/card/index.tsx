import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Grid } from '@material-ui/core';
import FrontCard from './frontCard';
import BackCard from './backCard';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
import { Skeleton } from '@material-ui/lab';

interface CardMediaProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    arrayData: any;
    loading: boolean;
}

const CourseCard: React.FunctionComponent<CardMediaProps> = (props) => {
    const { arrayData, loading } = props;

    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };
    const handleOpenSnackbar = () => {
        setSnackBarOpen(true);
    };
    const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };
    //Return card component for front and back with help handleFlip to  toggle between front and back
    return (
        <Grid item xs={12} sm={4}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="warning">
                    This service is not available
                </Alert>
            </Snackbar>
            {!loading ? (
                <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                    <FrontCard name={arrayData.name} handleFlipCard={handleFlip} handleOpenSnack={handleOpenSnackbar} flag={arrayData.flag} />
                    <BackCard
                        name={arrayData.name}
                        handleOpenSnack={handleOpenSnackbar}
                        handleFlipCard={handleFlip}
                        population={arrayData.population}
                        region={arrayData.region}
                        timezones={arrayData.timezones}
                        currencies={arrayData.currencies}
                    />
                </ReactCardFlip>
            ) : (
                <Skeleton variant="rect" width={290} height={310} />
            )}
        </Grid>
    );
};

export default CourseCard;
