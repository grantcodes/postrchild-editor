import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import isUrl from 'is-url'
import { ReactTinyLink } from 'react-tiny-link'
import { useDebounce } from 'react-use'
import defaultComponents from '../../default-components'

const Preview = styled.div`
  /* Bit of a trick to make sure border radiuses are never out of place */
  padding-right: ${props => props.theme.borderRadius};
  padding-left: ${props => props.theme.borderRadius};

  .react_tinylink_card {
    font-size: 1em;
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.palette.text};
    background: ${props => props.theme.palette.background};
    border: 1px solid ${props => props.theme.palette.border};
    line-height: ${props => props.theme.inputLineHeight};
    border-top: none;
    border-radius: ${props => props.theme.borderRadius};
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: none;

    &:hover {
      border-color: ${props => props.theme.palette.color};
      background-color: ${props => props.theme.palette.background};
    }
  }

  .react_tinylink_card_media {
    flex: 0 0 125px;
  }

  .react_tinylink_card_content_wrapper {
    font-size: 1em;
    opacity: 0.8;
  }

  .react_tinylink_card_content_header {
    font-size: 1em;
  }

  .react_tinylink_card_content {
    font-size: 0.85em;
    line-height: ${props => props.theme.inputLineHeight};
  }

  .react_tinylink_footer {
    font-size: 0.7em;
  }
`
const UrlWithPreview = ({
  label,
  value,
  onChange,
  inputComponent: Input,
  propertyComponent: Property,
  ...props
}) => {
  const [debouncedValue, setDebouncedValue] = useState(value[0])
  const hasUrl = isUrl(debouncedValue)

  useDebounce(
    () => {
      setDebouncedValue(value[0])
    },
    800,
    [value[0]]
  )

  return (
    <Property label={label} {...props}>
      <Input
        id={`mf2_${props.property}`}
        value={value[0]}
        onChange={e => onChange([e.target.value])}
        type="url"
      />
      {hasUrl && (
        <Preview>
          <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url={debouncedValue}
          />
        </Preview>
      )}
    </Property>
  )
}

UrlWithPreview.defaultProps = {
  type: 'text',
  ...defaultComponents,
}

UrlWithPreview.propTypes = {
  property: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default UrlWithPreview
