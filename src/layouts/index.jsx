import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { CookiesProvider } from 'react-cookie';

import '../reset.css';
import '../colors.css';
import '../buttons.css';
import './layout.css';

import { Topbar } from '../components/Topbar';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CookiePolicy } from '../components/CookiePolicy';
import { SWBanner } from '../components/SWBanner';
import { Menu } from '../components/Menu';

function Layout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        {
          siteTitle: site {
            siteMetadata {
              title
            }
          }
          disciplines: allMarkdownRemark(
            filter: { fields: { category: { eq: "discipline" } } }
            sort: { fields: [frontmatter___position], order: ASC }
            limit: 10
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
          legals: allMarkdownRemark(
            filter: { fields: { category: { eq: "legal" } } }
            sort: { fields: [frontmatter___position], order: ASC }
            limit: 10
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
          socials: allMarkdownRemark(
            filter: { fields: { category: { eq: "socials" } } }
            sort: { fields: [frontmatter___position], order: ASC }
            limit: 10
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
                  position
                  icon
                  link
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <CookiesProvider>
            <main>
              <Navbar />
              <Topbar />
              <Menu />
              {children}
              <Footer
                courses={data.disciplines.edges}
                legals={data.legals.edges}
                socials={data.socials.edges}
              />
            </main>
            <CookiePolicy />
            <SWBanner />
          </CookiesProvider>
      )}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
