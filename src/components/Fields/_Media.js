import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import FilePreview from '../FilePreview'
import { Input, Button } from '../Util'
import defaultComponents from '../../default-components'
import { useDropArea, useDrop } from 'react-use'
import { hideVisually } from 'polished'

const fileDragCss = css`
  padding: 1em;
  &:after {
    border: 0.2em dashed;
    left: -1em;
    right: -1em;
    top: -1em;
    bottom: -1em;
    background: ${props => props.theme.palette.main};
    max-width: 100vw;
  }
`

const fileHoverCss = css`
  ${fileDragCss}
  background: red;
`

const InputWrapper = styled(Button).attrs(props => ({ as: 'div' }))`
  text-align: center;
  position: relative;


  &:before {
    content: "Drag and drop or click to upload ${props => props.label}";
    position: relative;
    z-index: 2;
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    border-radius: ${props => props.theme.borderRadius};
  }

  ${props => props.drag && fileDragCss}
  ${props => props.hover && fileHoverCss}

  ${Input} {
    ${hideVisually()}
  }
`

const MediaField = ({
  label,
  value,
  multiple,
  accept,
  onChange,
  type,
  inputComponent: Input,
  propertyComponent: Property,
  ...props
}) => {
  const inputRef = useRef(null)

  const setFiles = files => {
    // De duplicate files
    const filteredFiles = []
    for (const file of files) {
      if (
        !filteredFiles.find(
          f => f.name === file.name && f.lastModified === file.lastModified
        )
      ) {
        filteredFiles.push(file)
      }
    }

    onChange(multiple ? filteredFiles : filteredFiles ? [filteredFiles[0]] : [])
  }

  const handleInputFiles = files => {
    const newFiles = []
    for (const file of files) {
      if (file.type.startsWith(accept.replace('/*', '/'))) {
        newFiles.push(file)
      } else {
        alert("Sorry that type of file isn't supported here at the moment")
      }
    }
    setFiles([...value, ...newFiles])
  }

  const handlePageFiles = files => {
    const newFiles = []
    for (const file of files) {
      // If files are dropped in the page, it can be assumed audio files go in the audio property etc...
      if (
        file.type.startsWith(accept.replace('/*', '/')) &&
        ['photo', 'video', 'audio'].includes(props.property)
      ) {
        newFiles.push(file)
        setFiles([...value, ...newFiles])
      }
    }
  }

  const { over: fileDrag } = useDrop({
    onFiles: handlePageFiles,
  })

  const [bond, { over: fileHover }] = useDropArea({
    onFiles: handleInputFiles,
  })

  return (
    <Property label="" {...props}>
      <InputWrapper
        label={label}
        drag={fileDrag}
        hover={fileHover}
        onClick={e => {
          inputRef.current.click()
        }}
        {...bond}
      >
        <Input
          ref={inputRef}
          type="file"
          accept={accept}
          // value={value[0]}
          id={`mf2_${props.property}`}
          multiple={multiple}
          onChange={e => onChange([...e.target.files])}
        />
      </InputWrapper>
      <FilePreview files={value} {...props} onChange={onChange} />
    </Property>
  )
}

MediaField.defaultProps = {
  accept: null,
  multiple: false,
  ...defaultComponents,
}

MediaField.propTypes = {
  property: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool.isRequired,
  accept: PropTypes.string,
}

export default MediaField
