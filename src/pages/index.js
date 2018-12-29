import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: guides } = data.allMarkdownRemark;

    const bodyStyles = {
      backgroundColor: '#f0f0f0'
    }

    return (
      <Layout>
        <section className="section" style={bodyStyles}>
          <div class="container">
            {guides.map(({ node: guide }) => (
              <div class="col s12">
                <div class="card-panel" key={guide.id}>
                  <Link className="has-text-primary" to={guide.fields.slug}>
                    {guide.frontmatter.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>

    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: ASC, fields: [fields___slug] }
      filter: { frontmatter: { templateKey: { eq: "guide-page" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
          }
        }
      }
    }
  }
`;
