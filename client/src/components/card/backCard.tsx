import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';

import { Box, Container } from '@material-ui/core';

import IBackCardProps from '../../interface/card';

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

const BackCard: React.FunctionComponent<IBackCardProps> = (props) => {
    const classes = useStyles();
    const { name, population, timezones, region, handleFlipCard, currencies } = props;
    return (
        <Card className={classes.backcard}>
            <Box className={classes.textCard}>
                <Typography className={classes.textTitle} variant="body2" color="textSecondary" component="p">
                    {name}
                </Typography>
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 10
                        }}
                    >
                        <Typography variant="body2" color="textSecondary" style={{ fontWeight: 'inherit', flexGrow: 1 }}>
                            Currency
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {currencies?.[0].code}
                        </Typography>
                    </Box>
                    <hr />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 10
                        }}
                    >
                        <Typography variant="body2" color="textSecondary" style={{ fontWeight: 'inherit', flexGrow: 1 }}>
                            Timezone
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {timezones}
                        </Typography>
                    </Box>

                    <hr />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 10
                        }}
                    >
                        <Typography variant="body2" color="textSecondary" style={{ fontWeight: 'inherit', flexGrow: 1 }}>
                            Population
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {population}
                        </Typography>
                    </Box>
                </Container>
            </Box>
            <CardContent>
                <Typography style={{ textAlign: 'center' }} variant="body2" color="textSecondary" component="p">
                    {region}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon style={{ color: 'red' }} />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton className={clsx(classes.expand)} onClick={handleFlipCard}>
                    <ThreeDRotationIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};
export default BackCard;
