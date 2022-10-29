import React from 'react';
import propTypes from 'prop-types';

import './Homepage.css';

export function Homepage({ node }) {
  const title = node.frontmatter && node.frontmatter.title;
  const content = node.html;

  /* eslint-disable react/no-danger */
  return (
    <div className="Homepage">
      <div className="container content">
        <h2 className="title">{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

/* eslint-disable react/forbid-prop-types */
Homepage.propTypes = {
  node: propTypes.any.isRequired,
};
