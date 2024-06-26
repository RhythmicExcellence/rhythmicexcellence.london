import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';

import './pages.css';

function DisciplinePage({ data }) {
  const { markdownRemark: post } = data;

  /* eslint-disable react/no-danger */
  return (
    <Layout>
      <div className="container">
        <h2 className="title">{post.frontmatter.title}</h2>
        <p>{post.frontmatter.date}</p>
        <div className="page" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
}

export default DisciplinePage;

export const disciplineQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        title
      }
    }
  }
`;
