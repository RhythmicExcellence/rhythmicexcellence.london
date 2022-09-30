import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../layouts/index';

const Policies = ({ data }) => (
  <Layout>
    <div className="container">
      <h1>Club Policies</h1>

      {data.allMarkdownRemark.edges.map((policy, id) => (
        <div key={id}>
          <h3>
            <Link href={policy.node.frontmatter.file} target="_blank">
              {policy.node.frontmatter.title}
            </Link>
          </h3>
          <br />
          <hr />
        </div>
      ))}
    </div>
  </Layout>
);

export default Policies;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { category: { eq: "policies" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 20
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            file
          }
        }
      }
    }
  }
`;
