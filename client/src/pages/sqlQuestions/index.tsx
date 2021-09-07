import React from 'react';
import { Box, Card, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import { Container } from 'reactstrap';
import Header from '../../components/header';

const useStyles = makeStyles(() => ({
    media: { width: '100%', height: 700 },
    sql: { color: 'orange', marginTop: 20 },
    query: { color: 'red', marginTop: 20 }
}));
const SqlQuestionPage: React.FunctionComponent = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <Header title="SQL QUESTIONS">
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={8}>
                            <Card className={classes.media}>
                                <CardMedia className={classes.media} image="/schema.png" title="schema" />
                            </Card>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Card style={{ padding: 20 }}>
                                <Box>
                                    <Typography className={classes.sql}>GAMES TABLE</Typography>
                                    <Typography>CREATE TABLE Games ( GameID int NOT NULL UNIQUE, Name varchar(255) NOT NULL, PRIMARY KEY (GameID) );</Typography>
                                </Box>
                                <Box>
                                    <Typography className={classes.sql}>COUNTRY TABLE</Typography>
                                    <Typography>
                                        CREATE TABLE Country_Match ( CountryID int NOT NULL UNIQUE, CountryName varchar(255) NOT NULL, PRIMARY KEY (CountryID), CONSTRAINT CHK_Person CHECK GameID int
                                        FOREIGN KEY REFERENCES Games(GameID) BetID int FOREIGN KEY REFERENCES Gambling_Match(BetID) );
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography className={classes.sql}>GAMBLING TABLE</Typography>
                                    <Typography>
                                        CREATE TABLE Gambling_Match ( BetID int NOT NULL UNIQUE, bet int NOT NULL, PRIMARY KEY (BetID), GameID int FOREIGN KEY REFERENCES Games(GameID) );
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography className={classes.sql}>FAVOURITES TABLE</Typography>
                                    <Typography>CREATE TABLE Favourites_Games ( FavID varchar(255) NOT NULL UNIQUE, PRIMARY KEY (FavID), GameID int FOREIGN KEY REFERENCES Games(GameID) );</Typography>
                                </Box>
                                <Box>
                                    <Typography className={classes.sql}>USERS TABLE</Typography>
                                    <Typography>
                                        CREATE TABLE Users ( UserID int NOT NULL UNIQUE, UserName varchar(255) NOT NULL, PRIMARY KEY (UserID), FavID varchar(255) NULL FOREIGN KEY REFERENCES
                                        Favourites_Games(FavID) CountryID int FOREIGN KEY REFERENCES Country_Match(CountryID) );
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography className={classes.query}>SELECT ALL USERS QUERY</Typography>
                                    <Typography>SELECT * FROM Users AS u JOIN Favourites_Games AS f ON u.FavID=f.FavID JOIN Games AS g ON f.GameID= g.GameID WHERE g.Name=`{'SLOT'}`)</Typography>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Header>
        </Container>
    );
};
export default SqlQuestionPage;
