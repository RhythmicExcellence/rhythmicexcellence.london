import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';

function NewsPost({ data }) {
  const { markdownRemark: post } = data;

  /* eslint-disable react/no-danger */
  return (
    <Layout>
      <div className="container">
        <h1>{post.frontmatter.title}</h1>
        <p>{post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
}

export default NewsPost;

export const postQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
