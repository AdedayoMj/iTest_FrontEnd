import React, { useState } from 'react';
import { Paper, ThemeProvider } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import NavPage from './components/nav';
import { createTheme } from '@material-ui/core/styles';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import CountriesPage from './pages/countries';
import SqlQuestionPage from './pages/sqlQuestions';
import PageNotFound from './pages/notFound';
import SlotMachinePage from './pages/slotmachine';

const Application: React.FunctionComponent = () => {
    const [darkMode, setDartMode] = useState(true);
    //create global theme
    const theme = createTheme({
        palette: {
            primary: { main: darkMode ? '#0f85a3' : '#04b542' },
            type: darkMode ? 'dark' : 'light'
        }
    });
    //function to toggle themchange
    const handletoggleTheme = () => {
        setDartMode(!darkMode);
    };

    const paperStyle = {
        backgroundColor: theme.palette.type === 'dark' ? '#073642' : 'light'
    };

    // switch router to all the path
    return (
        <ThemeProvider theme={theme}>
            <Paper style={paperStyle}>
                <NavPage homeThem={theme.palette.type} handletoggleTheme={() => handletoggleTheme()}>
                    <Switch>
                        <Route exact path="/" component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path="/slot" component={SlotMachinePage} />
                        <Route exact path="/countries" component={CountriesPage} />
                        <Route exact path="/sql" component={SqlQuestionPage} />
                        {/* <PrivateRoute exact path="/countries" component={CountriesPage} />
                        <PrivateRoute exact path="/favourites" component={CountriesPage} /> */}
                        <Route component={PageNotFound} />
                    </Switch>
                </NavPage>
            </Paper>
        </ThemeProvider>
    );
};

export default Application;
