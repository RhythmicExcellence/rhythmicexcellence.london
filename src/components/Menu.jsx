import React from 'react';
import { Link } from 'gatsby';

import './Menu.css';

export function Menu() {
  return (
    <div className="Header">
      <div className="Header__left">
        <h1 className='Title'>
          <Link className="home" exact="true" to="/">
            Rhythmic Excellence
          </Link>
        </h1>
      </div>

      <div className="Header__right">
        <Link to="/courses" activeClassName="selected">
          Courses
        </Link>
        <Link to="/team" activeClassName="selected">
          About Us
        </Link>
        <Link to="/timetable" activeClassName="selected">
          Timetable
        </Link>
        <Link to="/customer-info" activeClassName="selected">
          Customer Info
        </Link>
        <Link to="/#contact-us" activeClassName="selected">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
