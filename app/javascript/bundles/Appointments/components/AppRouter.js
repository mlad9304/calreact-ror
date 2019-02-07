import React from 'react';
import { StaticRouter as Router, Route } from 'react-router-dom';
import Appointments from './Appointments';

const AppRouter = (props) => {
    return (
        <Router context={{}}>
            <Route path="/" render={routeProps => (
                <Appointments {...routeProps} appointments={props.appointments} />
            )} />
        </Router>
    );
}

export default AppRouter