import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';

import './Menu.css';

export const Menu = () => {
  const [isMobile, setMobile] = useState(true);

  useEffect(() => {
    setMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <div className="Menu">
      <Link exact="true" to="/" activeClassName="selected">
        Home
      </Link>
      <Link to="/courses" activeClassName="selected">
        Courses
      </Link>
      <Link to="/timetable" activeClassName="selected">
        Timetable
      </Link>
      <Link to="/team" activeClassName="selected">
        Meet our team
      </Link>
      <Link to="/news" activeClassName="selected">
        News
      </Link>
      <Link to="/#contact-us" activeClassName="selected">
        Contact Us
      </Link>
      <Link to="/legal" activeClassName="selected">
        Legal
      </Link>
    </div>
  );
};