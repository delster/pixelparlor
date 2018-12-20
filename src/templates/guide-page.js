import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const GuidePageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col s12 m4 l3">
            <h2 className="toc-heading">Table of Contents</h2>
            <p>AUTOMAGICALLY POPULATE THIS WITH ToC</p>
          </div>
          <div class="col s12 m8 l9">
            <h1 className="page-heading">{title}</h1>
            <PageContent className="content" content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

GuidePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const GuidePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <GuidePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

GuidePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default GuidePage

export const GuidePageQuery = graphql`
  query GuidePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
