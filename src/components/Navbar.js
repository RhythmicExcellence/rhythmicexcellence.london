import React, { useEffect, useState } from 'react';
import { slide as BurgerMenu } from 'react-burger-menu';
import { Link } from 'gatsby';

import './Navbar.css';

export const Navbar = () => {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.innerWidth < 768);
  }, []);

  if (!isMobile) {
    return null;
  }

  return (
    <BurgerMenu right isOpen={false}>
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
      <Link to="/policies" activeClassName="selected">
        Club Policies
      </Link>
      <Link to="/legal" activeClassName="selected">
        Legal
      </Link>
    </BurgerMenu>
  );
};
