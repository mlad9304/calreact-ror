import React from "react"
import PropTypes from "prop-types"
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime';
class AppointmentForm extends React.Component {
  handleChange = e => {
    const { onUserInput } = this.props;
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    onUserInput(fieldName, fieldValue);
  };

  handleSubmit = e => {
    const { onFormSubmit } = this.props;
    e.preventDefault();
    onFormSubmit();
  };

  setApptTime = e => {
    const fieldName = 'appt_time';
    const fieldValue = e.toDate();
    this.props.onUserInput(fieldName, fieldValue);
  }

  render () {
    const { title, appt_time, formValid } = this.props;
    const { handleChange, handleSubmit, setApptTime } = this;
    const inputProps = {
      name: 'appt_time',
    };
    return (
      <React.Fragment>
        <h2>Make a new appointment</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Appointment title"
            value={title.value}
            onChange={handleChange}
          />
          <Datetime input={false} open={true} inputProps={inputProps}
            value={appt_time.value}
            onChange={event => setApptTime(event)}
          />
          <input
            type="submit"
            value="Make appointment"
            className="submit-button"
            disabled={!formValid}
          />
        </form>
      </React.Fragment>
    );
  }
}

AppointmentForm.propTypes = {
  title: PropTypes.shape({
    value: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
  }),
  appt_time: PropTypes.shape({
    value: PropTypes.instanceOf(Date).isRequired,
    valid: PropTypes.bool.isRequired,
  }),
  formValid: PropTypes.bool,
  onUserInput: PropTypes.func,
  onFormSubmit: PropTypes.func,
};

export default AppointmentForm
