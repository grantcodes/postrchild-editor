import React from 'react'
import UrlWithPreview from './_UrlWithPreview'

const LikeOf = props => <UrlWithPreview {...props} />

LikeOf.defaultProps = { property: 'like-of', label: 'Like of' }

export default LikeOf
