import React from 'react'
import Datetime from './_Datetime'

const End = props => <Datetime {...props}></Datetime>

End.defaultProps = { property: 'end', label: 'End Date' }

export default End
