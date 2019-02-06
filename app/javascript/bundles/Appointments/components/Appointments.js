import React from "react"
import PropTypes from "prop-types"
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import FormErrors from './FormErrors';
class Appointments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: props.appointments,
      title: '',
      appt_time: '',
      formErrors: {},
      formValid: true,
    };
  }

  handleUserInput = obj => {
    const { validateForm } = this;
    this.setState(prevState => ({
      ...prevState,
      ...obj,
    }), () => {
      validateForm();
    });
  };

  validateForm = () => {
    this.setState(prevState => ({
      ...prevState,
      formValid: prevState.title.trim().length > 2,
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
      formValid: true,
    }));
  };

  handleFormSubmit = () => {
    const { title, appt_time } = this.state;
    const { addNewAppointment, resetFormErrors } = this;
    $.post(
      '/appointments',
      { appointment: { title, appt_time } },
    ).done(data => {
      addNewAppointment(data);
      resetFormErrors();
    }).fail(response => {
      this.setState(prevState => ({
        ...prevState,
        formErrors: response.responseJSON,
      }));
    });
  };

  resetFormErrors = () => {
    this.setState(prevState => ({
      ...prevState,
      formErrors: {},
    }));
  };

  render () {
    const { appointments, title, appt_time, formErrors, formValid } = this.state;
    const { handleUserInput, handleFormSubmit } = this;
    return (
      <React.Fragment>
        <FormErrors formErrors={formErrors} />
        <AppointmentForm
          title={title}
          appt_time={appt_time}
          onUserInput={handleUserInput}
          onFormSubmit={handleFormSubmit}
          formValid={formValid}
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
