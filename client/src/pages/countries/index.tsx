import React from 'react';
import IPageProps from '../../interface/pages';
import { Box, Container, makeStyles, Theme, Typography } from '@material-ui/core';
import CountryByNamePage from './countryByName';
import AllCountriesPage from './allCountries';
import Header from '../../components/header';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flex: 1
    },
    marginGird: {
        marginTop: 20
    }
}));
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`a11y-tabpanel-${index}`} aria-labelledby={`a11y-tab-${index}`} {...other}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const CountriesPage: React.FunctionComponent<IPageProps> = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <main className={classes.root}>
            <Container>
                <Header title="COUNTRIES">
                    <Tabs className={classes.marginGird} value={value} onChange={handleChange} variant="fullWidth" indicatorColor="primary" textColor="primary" aria-label="icon tabs example">
                        <Tab label="Search By Name" aria-controls="a11y-tabpanel-0" id="a11y-tab-0" />
                        <Tab label="All Countries" aria-controls="a11y-tabpanel-1" id="a11y-tab-1" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <CountryByNamePage />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <AllCountriesPage />
                    </TabPanel>
                </Header>
            </Container>
        </main>
    );
};

export default CountriesPage;
