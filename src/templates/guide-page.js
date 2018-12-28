import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import slugify from 'react-slugify'
import M from 'materialize-css'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export class GuidePageTemplate extends React.Component {
  constructor(props) {
    // Called in every React Component's constructor.
    super(props)

    // Reference to Table of Contents and CMS Content.
    this.tocRef = React.createRef()
    this.contentRef = React.createRef()

    // Initial state
    this.state = {
      tableofcontents: null,
      minit: false
    }
  } // Constructor

  componentDidMount() {
    const headings = Array.from(document.querySelectorAll('.content h2, .content h3'))

    // Build the list.
    let isNested = false
    const tocItems = headings.map((e, i) => {
      // Null?! Escape!
      if (e === null) return null;

      // Mutate headings: add slugify'd IDs and 'scrollspy' class.
      e.id = slugify(e.textContent)
      e.classList.add('scrollspy')

      // Add opening tags for this element to the Table of Contents.
      let preItem = ``
      let href = `#${slugify(e.textContent)}`
      let tocItem = `<a href="${href}">${e.textContent}</a>`

      // Nested vs Non-nested
      if (isNested) {
        // isNested
        if (e.tagName === 'H2') {
          // Nested H2
          isNested = false
          preItem = `</li></ul><li>`
        } else if (e.tagName === 'H3') {
          // Nested H3
          preItem = `</li><li>`
        }
      } else {
        // !isNested
        if (e.tagName === 'H2') {
          // Non-nested H2
          preItem = (i===0) ? `<li>` : `</li><li>`
        } else if (e.tagName === 'H3') {
          // Non-nested H3
          preItem = `<ul><li>`
          isNested = true
        }
      } // if(isNested)
      return `${preItem}${tocItem}`
    }).join('')

    // Set the built list to our ToC state.
    this.setState({ tableofcontents: `${tocItems}` })

    // MaterializeCSS Component Init:
    this.mdInt = setInterval( () => {
      // Check if the Table of Content has loaded.
      let ppElem = document.querySelector('.toc-nav')

      // If Table of Contents exist:
      if(ppElem!==null) {
        // Scrollspy Elements (Nav Items)
        const ssElems = document.querySelectorAll('.content h2, .content h3')
        // Scrollspy Options
        const ssOptions = { throttle: 10 }
        // Init Scrollspy
        M.ScrollSpy.init(ssElems, ssOptions)

        // Pushpin/sticky Element (Table of Contents)
        let ppTop = ppElem.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop)
        let ppOptions = { top: ppTop }
        M.Pushpin.init(ppElem, ppOptions)

        // Things fired, let this go.
        clearInterval(this.mdInt);
      } // if(ppElem)
    }, 10)



  } // componentDidMount()

  render() {
    const { title, content, contentComponent } = this.props
    const PageContent = contentComponent || Content

    // Hide Table of Contents column if empty.
    let tocClass = ``
    let contentClass = ``
    if (this.state.tableofcontents !== null) {
      tocClass = `col s12 m4 l3`
      contentClass = `col s12 m8 l9`
    } else {
      tocClass = `hide`
      contentClass = `col s12`
    }

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
              <div className={tocClass}>
                <ClassWrapper wrap="toc-wrapper" ref={ref => this.tocRef = ref}>
                  <ul className="toc-nav" dangerouslySetInnerHTML={{ __html: this.state.tableofcontents }} />
                </ClassWrapper>
              </div>
              <div className={contentClass}>
                <ClassWrapper wrap="content-wrapper" ref={ref => this.contentRef = ref}>
                  <PageContent className="content" content={content} />
                </ClassWrapper>
              </div>
            </div>
          </div>
        </section>
      </main>
    ) // return()
  } // render()
} // GuidePageTemplate

// Refs require class declarations (to create instances to ref)
class ClassWrapper extends React.Component {
  render() {
    const { wrap } = this.props
    return(
      <div className={wrap}>
        {this.props.children}
      </div>
    )
  }
} // ClassWrapper

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
