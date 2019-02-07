import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Appointments from './Appointments';
import Appointment from './Appointment';

const AppRouter = (props) => {
    return (
        <Router>
            <div>
                <Route path="/" render={routeProps => (
                    <Appointments {...routeProps} appointments={props.appointments} />
                )} />
                <Route path="/appointments/:id" render={routeProps => (
                    <Appointment {...routeProps} />
                )} />
            </div>
        </Router>
    );
}

export default AppRouter