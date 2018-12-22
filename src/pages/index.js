import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: guides } = data.allMarkdownRemark;

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <ul className="collection">
              {guides.map(({ node: guide }) => (
                <li className="collection-item" key={guide.id}>
                  <Link className="has-text-primary" to={guide.fields.slug}>
                    {guide.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
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
      sort: { order: DESC, fields: [frontmatter___date] }
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
