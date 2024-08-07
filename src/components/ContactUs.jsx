import React, { useState, useRef } from 'react';
import axios from 'axios';
import { API_ROOT } from '../config';

import './ContactUs.css';

const initialState = {
  name: '',
  email: '',
  message: '',
  isWaiting: false,
};

export const ContactUs = () => {
  const [state, setState] = useState(initialState);
  const nameFieldRef = useRef();

  const validateField = (field) => field && field.length > 1;

  const handleFieldChange = (evt) => {
    const fieldName = evt.target?.id;
    const value = evt.target?.value;

    if (fieldName && value) {
      setState((currState) => ({
        ...currState,
        [fieldName]: value,
      }));
    }
  };

  const resetForm = () => {
    setState({
      name: '',
      email: '',
      message: '',
    });

    nameFieldRef.current.focus();
  };

  const formSubmitted = (successful = false) => {
    setState({ isWaiting: false });

    if (successful) {
      // eslint-disable-next-line no-alert
      alert('Message Sent.');
      return resetForm();
    }

    // eslint-disable-next-line no-alert
    alert(
      'Message failed to send. Please make sure all the mandatory fields are filled, then try again.'
    );
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = state;
    const data = { sender: name, email, body: message };

    setState({ isWaiting: true });

    axios({ method: 'POST', url: `${API_ROOT}/send`, data })
      .then((response) => {
        if (response.data.status === 'success') {
          return formSubmitted(true);
        }

        return formSubmitted();
      })
      .catch(() => formSubmitted());
  };

  const { name, email, message, isWaiting } = state;

  const isSubmitEnabled =
    [name, email, message].reduce((prev, cur) => prev && validateField(cur), true) && !isWaiting;

  return (
    <div className="ContactUs">
      <h2 className="title" id="contact-us">
        Stay in touch with us
      </h2>
      <p className="sub-title">Send us your questions</p>
      <div className="container">
        <form id="contact-form" onSubmit={handleSubmit} method="POST">
          <div className="form-group">
            <label htmlFor="name">*Name
              <input
                ref={nameFieldRef}
                type="text"
                className="form-control"
                id="name"
                onChange={handleFieldChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="email">*Email address
              <input type="email" className="form-control" id="email" onChange={handleFieldChange} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="message">*Message
              <textarea className="form-control" rows="5" id="message" onChange={handleFieldChange} />
            </label>
          </div>
          <button type="submit" className="button" disabled={!isSubmitEnabled}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
