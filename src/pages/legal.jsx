import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../layouts/index';

function Legal({ data }) {
  /* eslint-disable react/no-danger */
  return (
    <Layout>
      <div className="container">
        <h1>Legal</h1>

        {data.allMarkdownRemark.edges.map((legal) => (
          <div key={legal.node.fields.slug}>
            <h3>{legal.node.frontmatter.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: legal.node.excerpt }} />
            <Link to={legal.node.fields.slug}>Read more</Link>
            <br />
            <hr />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Legal;

export const pageQuery = graphql`
  {
    allMarkdownRemark(filter: { fields: { category: { eq: "legal" } } }, limit: 100) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
