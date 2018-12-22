import React from 'react'
import PropTypes from 'prop-types'
import { GuidePageTemplate } from '../../templates/guide-page'

const GuidePagePreview = ({ entry, widgetFor }) => (
  <GuidePageTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    title={entry.getIn(['data', 'title'])}
  />
)

GuidePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default GuidePagePreview
