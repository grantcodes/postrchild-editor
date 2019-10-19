import React from 'react'
import PropTypes from 'prop-types'
import { CheckGroup, CheckGroupItem } from '../Util'
import defaultComponents from '../../default-components'

const options = ['yes', 'maybe', 'no', 'interested']

const Rsvp = ({
  value,
  onChange,
  syndication,
  propertyComponent: Property,
  ...props
}) => (
  <Property label="RSVP" {...props}>
    <CheckGroup>
      {options.map(option => (
        <CheckGroupItem
          key={`rsvp-${option}`}
          checked={value && value[0] === option}
          value={option}
          onChange={e => onChange([option])}
        />
      ))}
    </CheckGroup>
  </Property>
)

Rsvp.defaultProps = {
  property: 'rsvp',
  ...defaultComponents,
}

Rsvp.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
}

export default Rsvp
