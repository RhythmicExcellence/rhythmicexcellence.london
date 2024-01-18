import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../layouts/index';

function NewsPost({ data }) {
  const { markdownRemark: post } = data;

  /* eslint-disable react/no-danger */
  return (
    <Layout>
      <div className="container">
        <Link to={post.frontmatter.link}>
          {post.frontmatter.title}
        </Link>
      </div>
    </Layout>
  );
}

export default NewsPost;

export const postQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        link
      }
    }
  }
`;
