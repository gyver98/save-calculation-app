import React from 'react';
import PropTypes from 'prop-types';
import './personal-details-form.scss';

class PersonalDetailsForm extends React.Component {

    render() {
        return (
            <section className="PersonalDetailsForm">
                <div className="personal-details-container">
                    <form className="details-form">
                        <div className={`details-form form-group ${this.props.formErrors.firstName ? 'has-error' : ''}`}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Your Name"
                                className="form-control"
                                value={this.props.details.firstName}
                                onChange={(event) => this.props.handleUserInput(event)}/>
                            <small className="help-block">{this.props.formErrors[`firstName`]}</small>
                        </div>
                        <div className={`details-form form-group ${this.props.formErrors.email ? 'has-error' : ''}`}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="form-control"
                                value={this.props.details.email}
                                onChange={(event) => this.props.handleUserInput(event)}
                                required/>
                            <small className="tcs light-grey">By clicking switch you are no committing to a contract and can opt out during the sign up process</small>
                            <small className="help-block">{this.props.formErrors[`email`]}</small>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

PersonalDetailsForm.propTypes = {
    details: PropTypes.object.isRequired,
    formErrors: PropTypes.object.isRequired,
    handleUserInput: PropTypes.func.isRequired
}

export default PersonalDetailsForm;