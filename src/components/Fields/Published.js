import React from 'react'
import Datetime from './_Datetime'
import { Warning } from '../Util'

const Published = props => {
  const selectedDate =
    props.value && props.value[0] ? new Date(props.value[0]) : null
  const now = new Date()
  const nowString =
    now.getFullYear() +
    '-' +
    (now.getMonth() + 1) +
    '-' +
    now.getDate() +
    ' ' +
    now.getHours() +
    ':' +
    now.getMinutes()

  return (
    <Datetime {...props} placeholderText={nowString}>
      {selectedDate && selectedDate > new Date() && (
        <Warning dismissable>
          Warning: If your website doesn't support scheduled posting this will
          likely be published instantly
        </Warning>
      )}
    </Datetime>
  )
}

Published.defaultProps = { property: 'published', label: 'Publish Date' }

export default Published
