import React from 'react';
import { Link } from 'gatsby';
import propTypes from 'prop-types';

import './Courses.css';

const Course = ({ title, link }) => (
  <Link className="Course" to={link}>
    <h3>{title}</h3>
  </Link>
);

Course.propTypes = {
  title: propTypes.string.isRequired,
  link: propTypes.string.isRequired,
};

Course.defaultProps = {
  link: '/',
};

export const Courses = ({ courses }) => (
  <div className="Courses__wrapper">
    <h2 className="title">Our Courses</h2>
    <div className="Courses container">
      {(courses &&
        courses.edges &&
        courses.edges.map((course, key) => (
          <Course
            key={key}
            title={course.node && course.node.frontmatter && course.node.frontmatter.title}
            link={course.node && course.node.fields && course.node.fields.slug}
          />
        ))) || <div>No course available. Try again later.</div>}
    </div>
  </div>
);
