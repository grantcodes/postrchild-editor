import React from 'react'
import MediaField from './_Media'

const Audio = props => <MediaField {...props} accept="audio/*" multiple />

Audio.defaultProps = { property: 'audio', label: 'Audio(s)' }

export default Audio
