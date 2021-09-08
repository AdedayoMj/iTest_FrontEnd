import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isFireSelector, isLoading } from '../../selector/auth';
interface Props extends RouteProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any;
}

//Function to protect path route
const PrivateRoute: React.FunctionComponent<Props> = (props) => {
    const isFireTokenSelector = useSelector(isFireSelector); // get fire token
    const laoding = useSelector(isLoading);
    // const { isAuthenticated, loading } = auth;
    const { component: Component, ...rest } = props;

    return (
        <Route {...rest} render={(props) => (laoding ? <p>Loading...</p> : isFireTokenSelector ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)} />
    );
};

export default PrivateRoute;
