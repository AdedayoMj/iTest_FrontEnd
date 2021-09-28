import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import IFrontCardProps from '../../interface/card';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    backcard: {
        width: 290,
        height: 310,
        backgroundColor: theme.palette.type === 'dark' ? 'black' : 'grey'
    },
    card: {
        width: 290,
        height: 310,
        backgroundColor: theme.palette.type === 'dark' ? '#0a4352' : 'light',
        marginBottom: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
    },
    textCard: {
        height: 170
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 19,
        marginTop: 10
    },

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    avatar: {
        backgroundColor: red[500]
    }
}));

const FrontCard: React.FunctionComponent<IFrontCardProps> = (props) => {
    const classes = useStyles();
    const { flag, name, handleFlipCard, handleOpenSnack, capital } = props;
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={flag} title="Paella dish" />
            <CardContent>
                <Typography className={classes.textTitle} variant="body2" color="textSecondary" component="p">
                    {name}
                </Typography>
                <Typography style={{ textAlign: 'center' }} variant="body2" color="textSecondary" component="p">
                    {capital}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title="Add to Favourites">
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon style={{ color: 'red' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Share Country Info">
                    <IconButton onClick={handleOpenSnack} aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Flip Card">
                    <IconButton className={clsx(classes.expand)} onClick={handleFlipCard}>
                        <ThreeDRotationIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};
export default FrontCard;
