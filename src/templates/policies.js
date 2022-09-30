import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';

const Policies = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <div className="container">
        <h1>POLICY</h1>
        <p>{post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
};

export default Policies;

export const postQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
