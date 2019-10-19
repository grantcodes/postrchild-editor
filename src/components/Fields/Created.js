import React from 'react'
import Datetime from './_Datetime'

const Created = props => {
  return <Datetime {...props} maxDate={new Date()}></Datetime>
}

Created.defaultProps = { property: 'created', label: 'Created Date' }

export default Created
