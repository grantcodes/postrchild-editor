import React from 'react'
import Datetime from './_Datetime'

const Start = props => {
  return <Datetime {...props}></Datetime>
}

Start.defaultProps = { property: 'start', label: 'Start Date' }

export default Start
