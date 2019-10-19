import React from 'react'
import MediaField from './_Media'

const Featured = props => <MediaField {...props} accept="image/*" />

Featured.defaultProps = { property: 'featured', label: 'Featured Image' }

export default Featured
