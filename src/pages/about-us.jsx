import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { TeamMember } from '../components/Team';

import Layout from '../layouts/index';

import './about-us.css';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMember: null,
      show: false,
      readMore: false,
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
    const { readMore } = this.state;
    const {node} = data.about.edges[0];
    const shortHtml = node.html.split(' ').slice(0, 20).join(' ');

    return (
      <Layout>
        <div className="Team container">
          <div className="title">
            <h2 className="title">RE presentation</h2>
          </div>
          <div className="container">
            {readMore ? <div dangerouslySetInnerHTML={{ __html: node.html }} /> : <div dangerouslySetInnerHTML={{ __html: shortHtml }} />}
            {!readMore && <a href="#" onClick={() => this.setState({ readMore: true })}>Read more</a>}
          </div>
          <div className="title">
            <h2 className="title">Coaches</h2>
          </div>

          <div className="TeamList">
            {data.team.edges.map((teamMembers, key) => (
              <TeamMember
                show={show}
                key={teamMembers.node.id}
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
    team: allMarkdownRemark(
      filter: { fields: { category: { eq: "team" } } }
      sort: { fields: [frontmatter___position], order: ASC }
      limit: 100
    ) {
      edges {
        node {
          id
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
    about: allMarkdownRemark(
      filter: { fields: { category: { eq: "about" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
