import React from 'react'
import MediaField from './_Media'

const Photo = props => <MediaField {...props} accept="image/*" multiple />

Photo.defaultProps = { property: 'photo', label: 'Photo(s)' }

export default Photo
