import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../layouts/index';

import './registrations.css';

function Registrations({ data }) {
  /* eslint-disable react/no-danger */
  return (
    <Layout>
      <div className="container">
        <h1>Registration Documents</h1>

        {data.allMarkdownRemark.edges.map((registrations) => (
          <div key={registrations.node.fields.slug}>
            <div>
              <h3>
                <Link to={registrations.node.frontmatter.link} target="_blank" rel="noopener">
                  {registrations.node.frontmatter.title}
                </Link>
              </h3>
              <h4 className="registrations_subtitle">{registrations.node.frontmatter.subtitle}</h4>
              <p className="registrations_description">
                {registrations.node.frontmatter.description}
              </p>
            </div>
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
            subtitle
            description
            link
          }
        }
      }
    }
  }
`;
