import React from "react"
import PropTypes from "prop-types"
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
class Appointments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: props.appointments,
      title: 'Team startup meeting',
      appt_time: 'Tomorrow at 9am',
    };
  }

  handleUserInput = obj => {
    this.setState(prevState => ({
      ...prevState,
      ...obj,
    }));
  };

  addNewAppointment = appointment => {
    const appointments = [
      ...this.state.appointments,
      appointment,
    ];
    this.setState(prevState => ({
      ...prevState,
      appointments: appointments.sort((a, b) => (new Date(a.appt_time) - new Date(b.appt_time))),
    }));
  };

  handleFormSubmit = () => {
    const { title, appt_time } = this.state;
    const { addNewAppointment } = this;
    $.post(
      '/appointments',
      { appointment: { title, appt_time } },
    ).done(data => {
      addNewAppointment(data);
    });
  };

  render () {
    const { appointments, title, appt_time } = this.state;
    const { handleUserInput, handleFormSubmit } = this;
    return (
      <React.Fragment>
        <AppointmentForm
          input_title={title}
          input_appt_time={appt_time}
          onUserInput={handleUserInput}
          onFormSubmit={handleFormSubmit}
        />
        <AppointmentList appointments={appointments} />
      </React.Fragment>
    );
  }
}

Appointments.propTypes = {
  appointments: PropTypes.array
};
export default Appointments
