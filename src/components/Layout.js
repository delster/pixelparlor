import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import 'materialize-css/dist/css/materialize.min.css'

import Navbar from '../components/Navbar'
import './main.scss'

// Only run WebFont.load in the browser.
if (typeof window !== 'undefined') {
  var WebFont = require('webfontloader');

  WebFont.load({
    google: {
      families: ['Montserrat:300,400,700', 'Material+Icons']
    }
  })
}

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
            }
          }
        }
    `}
    render={data => (
      <div>
        <Helmet>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description} />
          <meta name="theme-color" content="#008ef3" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
        </Helmet>
        <Navbar />
        {children}
      </div>
    )}
  />
)

export default TemplateWrapper
