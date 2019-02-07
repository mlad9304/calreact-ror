import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/format';
class Appointment extends React.Component {
  render () {
    const { appointment } = this.props;
    return (
      <div className="appointment">
        <Link to={`/appointments/${appointment.id}`}>
          <h3>{appointment.title}</h3>
        </Link>
        <p>{formatDate(appointment.appt_time)}</p>
      </div>
    );
  }
}

Appointment.propTypes = {
  appointment: PropTypes.object
};

Appointment.defaultProps = {
  appointment: {},
};
export default Appointment
