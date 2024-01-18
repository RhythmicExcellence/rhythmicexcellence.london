import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../layouts/index';

function Registrations({ data }) {
  /* eslint-disable react/no-danger */
  return (
    <Layout>
      <div className="container">
        <h1>Registration Forms</h1>

        {data.allMarkdownRemark.edges.map((registrations) => (
          <div key={registrations.node.fields.slug}>
            <h3>
              <Link to={registrations.node.frontmatter.link}>{registrations.node.frontmatter.title}</Link>
              <p>{registrations.node.frontmatter.description}</p>
            </h3>
            <br />
            <hr />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Registrations;

export const pageQuery = graphql`
  {
    allMarkdownRemark(filter: { fields: { category: { eq: "registrations" } } }, limit: 10) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            link
          }
        }
      }
    }
  }
`;
