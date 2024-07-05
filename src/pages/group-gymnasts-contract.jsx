import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';

function GymnastsContract({ data }) {
  /* eslint-disable react/no-danger */
  const {node} = data.allMarkdownRemark.edges[0];

  return (
    <Layout>
      <div className="container">
        <h1>{node.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: node.html }} />
      </div>
    </Layout>
  );
}

export default GymnastsContract;

export const pageQuery = graphql`
  {
    allMarkdownRemark(filter: { fields: { category: { eq: "group-gymnasts-contract" } } }) {
      edges {
        node {
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`;
