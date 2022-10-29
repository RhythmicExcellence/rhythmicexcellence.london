import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { TeamMember } from '../components/Team';

import Layout from '../layouts/index';

import './team.css';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMember: null,
      show: false,
    };

    this.bindActive = this.bindActive.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ show: true }));
  }

  bindActive (elementToActivate = null) {
    this.setState({
      activeMember: elementToActivate,
    });

    document.body.classList.toggle('no-scroll', elementToActivate !== null);
  };

  render() {
    const { data } = this.props;
    const { show, activeMember } = this.state;

    return (
      <Layout>
        <div className="Team container">
          <div className="title">
            <p className="sub-title">Hi, have you met</p>
            <h2 className="title">Our Team?</h2>
          </div>

          <div className="TeamList">
            {data.allMarkdownRemark.edges.map((teamMembers, key) => (
              <TeamMember
                show={show}
                key={teamMembers.node.fields.slug}
                id={key}
                name={teamMembers.node.frontmatter.title}
                titles={teamMembers.node.frontmatter.titles}
                picture={teamMembers.node.frontmatter.avatar}
                content={teamMembers.node.frontmatter.details}
                slug={teamMembers.node.fields.slug}
                onActive={(id) => this.bindActive(id)}
                onDismiss={this.bindActive}
                active={activeMember === key}
              />
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Team;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { category: { eq: "team" } } }
      sort: { fields: [frontmatter___position], order: ASC }
      limit: 100
    ) {
      edges {
        node {
          fields {
            slug
            category
          }
          frontmatter {
            title
            titles
            avatar
            details
          }
        }
      }
    }
  }
`;
