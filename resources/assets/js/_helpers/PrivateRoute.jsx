import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, logout, ...rest }) => (
    <Route {...rest} render={props => (
        (!logout && localStorage.getItem('user'))
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
