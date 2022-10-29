import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';

function Faq({ data }) {
  /* eslint-disable react/no-danger */
  return (
    <Layout>
      <div className="container">
        <h1>Frequently Asked Questions and Answers</h1>

        {data.allMarkdownRemark.edges.map((faq) => (
          <div key={faq.node.id}>
            <h3>{faq.node.frontmatter.title}</h3>
            <p>{faq.node.frontmatter.answer}</p>
            <br />
            <hr />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Faq;

export const pageQuery = graphql`
  {
    allMarkdownRemark(filter: { fields: { category: { eq: "faq" } } }, limit: 100) {
      edges {
        node {
          id
          frontmatter {
            title
            answer
            position
          }
        }
      }
    }
  }
`;
