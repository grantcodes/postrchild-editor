import React from 'react'
import MediaField from './_Media'

const Video = props => <MediaField {...props} accept="video/*" multiple />

Video.defaultProps = { property: 'video', label: 'Video(s)' }

export default Video
