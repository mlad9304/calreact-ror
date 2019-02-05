import React from "react"
import PropTypes from "prop-types"
import { formatDate } from '../utils/format';
class Appointment extends React.Component {
  render () {
    const { appointment } = this.props;
    return (
      <div className="appointment">
        <h3>{appointment.title}</h3>
        <p>{formatDate(appointment.appt_time)}</p>
      </div>
    );
  }
}

Appointment.propTypes = {
  appointment: PropTypes.object
};
export default Appointment
