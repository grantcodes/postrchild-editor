import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import File from './File'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background: ${props => props.theme.palette.text};
  color: ${props => props.theme.palette.background};
  border-radius: ${props => props.theme.borderRadius};
  margin-top: 0.3em;
  padding: 0.5em;

  &:empty {
    display: none;
  }

  & > * {
    display: block;
    margin: 0.25em;
    max-width: 26em;
  }
`

const Property = ({
  files,
  property,
  onChange,
  upload,
  imgComponent: Img,
  videoComponent: Video,
  audioComponent: Audio,
}) => {
  const removeFile = i => e => {
    files.splice(i, 1)
    console.log(files)
    onChange(files)
  }

  const setAlt = i => alt => {
    const value = files[i].value || files[i]
    files[i] = {
      value,
      alt,
    }
    onChange(files)
  }

  if (upload) {
  }

  return (
    <Container className="micropub-client-editor__file-previews">
      {files.map((file, index) => {
        const alt = file.alt || ''
        if (file.value) {
          file = file.value
        }
        if (file && file.type && file.type.startsWith('image/')) {
          const src = URL.createObjectURL(file)
          return (
            <File
              key={`file-preview-${index}`}
              showAlt={property === 'photo'}
              removeFileb={removeFile(index)}
              setAlt={setAlt(index)}
              alt={alt}
            >
              <Img
                className="micropub-client-editor__file-preview micropub-client-editor__file-preview--image"
                src={src}
              />
            </File>
          )
        }
        if (file && file.type && file.type.startsWith('video/')) {
          const src = URL.createObjectURL(file)
          return (
            <File
              key={`file-preview-${index}`}
              removeFileb={removeFile(index)}
              setAlt={setAlt(index)}
              alt={alt}
            >
              <Video
                className="micropub-client-editor__file-preview micropub-client-editor__file-preview--video"
                src={src}
                controls
              />
            </File>
          )
        }
        if (file && file.type && file.type.startsWith('audio/')) {
          const src = URL.createObjectURL(file)
          return (
            <File
              key={`file-preview-${index}`}
              removeFileb={removeFile(index)}
              setAlt={setAlt(index)}
              alt={alt}
            >
              <Audio
                className="micropub-client-editor__file-preview micropub-client-editor__file-preview--audio"
                src={src}
                controls
              />
            </File>
          )
        }
        return null
      })}
    </Container>
  )
}

Property.propTypes = {
  divComponent: PropTypes.func.isRequired,
  imgComponent: PropTypes.func.isRequired,
  videoComponent: PropTypes.func.isRequired,
  audioComponent: PropTypes.func.isRequired,
}

Property.defaultProps = {}

export default Property
