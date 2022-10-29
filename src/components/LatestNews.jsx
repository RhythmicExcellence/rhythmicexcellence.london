import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'gatsby';

import './LatestNews.css';

function NewsCard({
  title, date, excerpt, slug,
}) {
  return (
    <div className="LatestNews__card__wrapper">
      <Link to={slug} className="LatestNews__card">
        <h4>{title}</h4>
        <div className="LatestNews__card__content">
          <p>{excerpt}</p>
        </div>
        <div className="LatestNews__card__footer">
          <span>{date}</span>
        </div>
      </Link>
    </div>
  );
}

NewsCard.propTypes = {
  title: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  excerpt: propTypes.string.isRequired,
  slug: propTypes.string.isRequired,
};

export function LatestNews({ edges }) {
  return (
    <div className="LatestNews">
      <h2 className="title">Latest News</h2>
      <div className="LatestNews__wrapper">
        <div className="LatestNews__cards__wrapper">
          {edges.map((edge) => (
            <NewsCard
              key={`news--${edge.node.fields.slug}`}
              excerpt={edge.node && edge.node.excerpt}
              title={edge.node && edge.node.frontmatter && edge.node.frontmatter.title}
              date={edge.node && edge.node.frontmatter && edge.node.frontmatter.date}
              slug={edge.node && edge.node.fields && edge.node.fields.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable react/forbid-prop-types */
LatestNews.propTypes = {
  edges: propTypes.any.isRequired,
};
