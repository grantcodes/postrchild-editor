import React from 'react'
import PropTypes from 'prop-types'
import defaultComponents from '../../default-components'

const Visibility = ({
  value,
  onChange,
  mpConfig,
  selectComponent: Select,
  propertyComponent: Property,
  ...props
}) => {
  if (!mpConfig || !mpConfig.visibility || mpConfig.visibility.length === 0) {
    return null
  }

  return (
    <Property label="Visibility" {...props}>
      <Select
        id={`mf2_${props.property}`}
        value={value[0]}
        onChange={e => onChange([e.target.value])}
      >
        {mpConfig.visibility.map(v => (
          <option value={v} key={`visibility-option-${v}`}>
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </option>
        ))}
      </Select>
    </Property>
  )
}

Visibility.defaultProps = {
  property: 'visibility',
  ...defaultComponents,
}

Visibility.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
}

export default Visibility
