import React from 'react'
import UrlWithPreview from './_UrlWithPreview'

const BookmarkOf = props => <UrlWithPreview {...props} />

BookmarkOf.defaultProps = { property: 'bookmark-of', label: 'Bookmark of' }

export default BookmarkOf
