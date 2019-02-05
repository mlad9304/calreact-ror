import React from "react"
import PropTypes from "prop-types"
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime';
class AppointmentForm extends React.Component {
  handleChange = e => {
    const { onUserInput } = this.props;
    onUserInput({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    const { onFormSubmit } = this.props;
    e.preventDefault();
    onFormSubmit();
  };

  setApptTime = e => {
    const name = 'appt_time';
    const obj = {};
    if(obj[name] = e.toDate()) {
      this.props.onUserInput(obj);
    }
  }

  render () {
    const { input_title, input_appt_time } = this.props;
    const { handleChange, handleSubmit, setApptTime } = this;
    const inputProps = {
      name: 'input_appt_time',
    };
    return (
      <React.Fragment>
        <h2>Make a new appointment</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Appointment title"
            value={input_title}
            onChange={handleChange}
          />
          <input
            name="appt_time"
            placeholder="Date and Time"
            value={input_appt_time}
            onChange={handleChange}
          />
          <Datetime input={false} open={true} inputProps={inputProps}
            value={input_appt_time}
            onChange={event => setApptTime(event)}
          />
          <input type="submit" value="Make appointment" className="submit-button" />
        </form>
      </React.Fragment>
    );
  }
}

AppointmentForm.propTypes = {
  input_title: PropTypes.string,
  input_appt_time: PropTypes.any,
  onUserInput: PropTypes.func,
  onFormSubmit: PropTypes.func,
};

export default AppointmentForm
