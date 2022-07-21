import React from 'react';
import { Link } from 'gatsby';

import './Topbar.css';

export const Topbar = () => {
  return (
    <div className="Topbar">
      <h1>
        <Link className="home" exact="true" to="/">
          Rhythmic Excellence
        </Link>
      </h1>
    </div>
  );
};
