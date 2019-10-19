import React from 'react'
import UrlWithPreview from './_UrlWithPreview'

const RepostOf = props => <UrlWithPreview {...props} />

RepostOf.defaultProps = { property: 'repost-of', label: 'Repost of' }

export default RepostOf
