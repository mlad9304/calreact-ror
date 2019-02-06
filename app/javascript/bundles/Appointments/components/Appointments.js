import React from "react"
import PropTypes from "prop-types"
import moment from 'moment';
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import FormErrors from './FormErrors';
class Appointments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: props.appointments,
      title: { value: '', valid: false },
      appt_time: { value: new Date(), valid: false },
      formErrors: {},
      formValid: false,
    };
  }

  handleUserInput = (fieldName, fieldValue) => {
    const { validateField } = this;
    this.setState(prevState => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        value: fieldValue,
      },
    }), () => {
      validateField(fieldName, fieldValue);
    });
  };

  validateField = (fieldName, fieldValue) => {
    let fieldValid;
    let formErrors = [];
    const { validateForm } = this;
    switch (fieldName) {
      case 'title':
        fieldValid = fieldValue.trim().length > 2;
        if (!fieldValid) {
          formErrors = [' should be at least 3 characters long'];
        }
        break;
      case 'appt_time':
        fieldValid = moment(fieldValue).isValid() &&
          moment(fieldValue).isAfter();

          if (!fieldValid) {
            formErrors = [' should not be in the past'];
          }
        break;
    }
    this.setState(prevState => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        valid: fieldValid,
      },
      formErrors: {
        [fieldName]: formErrors,
      },
    }), () => {
      validateForm();
    })
  };

  validateForm = () => {
    this.setState(prevState => ({
      ...prevState,
      formValid: prevState.title.valid &&
        prevState.appt_time.valid,
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
      { 
        appointment: {
          title: title.value,
          appt_time: appt_time.value,
        },
      },
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
