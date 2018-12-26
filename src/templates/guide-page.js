import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import slugify from 'react-slugify'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import M from 'materialize-css'

export class GuidePageTemplate extends Component {
  componentDidMount() {
    // Scrollspy Elements (Nav Items)
    const ssElems = document.querySelectorAll('.scrollspy');
    const ssOptions = {};
    const ssInstances = M.ScrollSpy.init(ssElems, ssOptions);

    // Pushpin/sticky Element (Table of Contents)
    const ppElem = document.querySelector('.toc-nav');
    const top = ppElem.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
    const ppOptions = { top: top };
    const ppInstance = M.Pushpin.init(ppElem, ppOptions);
  }

  render() {
    const { title, content, contentComponent } = this.props
    const PageContent = contentComponent || Content
    const parser = new DOMParser()
    const parsedContent = parser.parseFromString(content, "text/html")
    const headings = parsedContent.querySelectorAll('h2,h3')

    let tableOfContents = `<ul class="toc-nav">`
    let isNested = false;
    headings.forEach((e,_) => {
      // Mutate headings: add slugify'd IDs and 'scrollspy' class.
      e.id = slugify(e.textContent);
      e.classList.add('scrollspy');

      // Add opening tags for this element to the Table of Contents.
      let preItem = ``
      let tocItem = `<a href="#${slugify(e.textContent)}">${e.textContent}</a>`

      // If not nested:
      if( isNested ) {
        // isNested
        if (e.tagName === 'H2') {
          // Nested H2
          isNested = false;
          preItem = `</li></ul><li>`;
        } else if (e.tagName === 'H3') {
          // Nested H3
          preItem = `</li><li>`;
        }
      } else {
        // !isNested
        if (e.tagName === 'H2') {
          // Non-nested H2
          preItem = `</li><li>`;
        } else if (e.tagName === 'H3') {
          // Non-nested H3
          preItem = `<ul><li>`;
          isNested = true;
        }
      } // if(isNested)
      tableOfContents = `${tableOfContents}
        ${preItem}${tocItem}`
    }); // headings.forEach()
    tableOfContents = `${tableOfContents}</ul>`

    const s = new XMLSerializer();
    const finalContent = s.serializeToString(parsedContent);

    return (
      <main id="main-content" className="main-content">
        <section className="section section--hero">
          <div className="container center-align">
            <h1>Website User Manual</h1>
            <span className="hero-byline">{title}</span>
          </div>
        </section>
        <section className="section--content">
          <div className="container">
            <div className="row">
              <div className="col s12 m4 l3">
                <div dangerouslySetInnerHTML={{ __html: tableOfContents}} />
              </div>
              <div className="col s12 m8 l9">
                <PageContent className="content" content={finalContent} />
              </div>
            </div>
          </div>
        </section>
      </main>
    ) // return()
  } // render()
} // GuidePageTemplate

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
