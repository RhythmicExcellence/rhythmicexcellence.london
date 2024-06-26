import React from 'react';
import propTypes from 'prop-types';

import './Homepage.css';

export function Homepage({ node }) {
  const content = node.html;

  /* eslint-disable react/no-danger */
  return (
    <div className="Homepage">
      <div className="container content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

/* eslint-disable react/forbid-prop-types */
Homepage.propTypes = {
  node: propTypes.any.isRequired,
};
