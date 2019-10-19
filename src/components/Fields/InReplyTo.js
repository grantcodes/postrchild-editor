import React from 'react'
import UrlWithPreview from './_UrlWithPreview'

const InReplyTo = props => <UrlWithPreview {...props} />

InReplyTo.defaultProps = { property: 'in-reply-to', label: 'In Reply To' }

export default InReplyTo
