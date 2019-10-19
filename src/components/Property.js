import React from 'react'
import PropTypes, { array } from 'prop-types'
import defaultComponents from '../default-components'

const Property = ({
  labelComponent: Label,
  divComponent: Div,
  children,
  property,
  label,
  mpConfig,
  ...props
}) => {
  // If there is a properties config supplied hide unsupported fields
  if (mpConfig && mpConfig.properties && Array.isArray(mpConfig.properties)) {
    if (
      !mpConfig.properties.find(item =>
        typeof item === 'object' && item.name
          ? item.name === property
          : item === property
      )
    ) {
      return null
    }
  }

  // These are potentially dangerous fields. I don't want to show them unless they are definitely supported
  const dangerousProperties = ['post-status', 'visibility']
  if (
    dangerousProperties.includes(property) &&
    (!mpConfig.properties || !mpConfig[property])
  ) {
    return null
  }

  // Output the regular html now
  return (
    <Div
      className={
        'micropub-client-editor__property micropub-client-editor__property--' +
        property
      }
    >
      <Label
        className="micropub-client-editor__label"
        htmlFor={'mf2_' + property}
      >
        {label}
      </Label>
      {children}
    </Div>
  )
}

Property.defaultProps = {
  ...defaultComponents,
}

Property.propTypes = {
  labelComponent: PropTypes.func.isRequired,
  divComponent: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default Property
