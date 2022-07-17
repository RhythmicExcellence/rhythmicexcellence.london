import React, { Component } from 'react';
import axios from 'axios';
import { API_ROOT } from '../config';

import './ContactUs.css';

const BRANCH = 'HACKNEY';

export class ContactUs extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    isWaiting: false,
  };

  nameFieldRef = React.createRef();

  validateField = field => {
    return field && field.length > 1;
  };

  handleFieldChange = evt => {
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  };

  resetForm = () => {
    this.setState({
      name: '',
      email: '',
      message: '',
    });

    this.nameFieldRef.current.focus();
  };

  formSubmitted = (successful = false) => {
    this.setState({ isWaiting: false });

    if (successful) {
      alert('Message Sent.');
      return this.resetForm();
    }

    alert(
      'Message failed to send. Please make sure all the mandatory fields are filled, then try again.'
    );
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, email, message } = this.state;
    const data = { sender: name, branch: BRANCH, email, body: message };

    this.setState({ isWaiting: true });

    axios({ method: 'POST', url: `${API_ROOT}/send`, data })
      .then(response => {
        if (response.data.status === 'success') {
          return this.formSubmitted(true);
        }

        this.formSubmitted();
      })
      .catch(_ => this.formSubmitted());
  };

  render() {
    const { name, email, message, isWaiting } = this.state;
    const isSubmitEnabled =
      [name, email, message].reduce((prev, cur) => prev && this.validateField(cur), true) &&
      !isWaiting;

    return (
      <div className="ContactUs">
        <h2 className="title">Stay in touch with us</h2>
        <p className="sub-title">Send us your questions</p>
        <div className="container">
          <form id="contact-form" onSubmit={this.handleSubmit} method="POST">
            <div className="form-group">
              <label htmlFor="name">*Name</label>
              <input
                ref={this.nameFieldRef}
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">*Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">*Message</label>
              <textarea
                className="form-control"
                rows="5"
                id="message"
                value={message}
                onChange={this.handleFieldChange}
              />
            </div>
            <button type="submit" className="button" disabled={!isSubmitEnabled}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
