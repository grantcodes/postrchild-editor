import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Input } from '../Util'

const FileClose = styled.button`
  display: block;
  position: absolute;
  appearance: none;
  width: 1.8em;
  height: 1.8em;
  padding: 0.4em;
  top: 0;
  right: 0;
  font-size: 1.1em;
  line-height: 1;
  text-align: center;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover,
  &:focus {
    background: ${props => props.theme.palette.main};
    color: ${props => props.theme.palette.background};
  }

  svg {
    display: block;
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
`

const fileLoading = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(500%);
  }
`

const FileWrapper = styled.div`
  position: relative;
  overflow: hidden;

  :before {
    content: '';
    display: ${props => (props.loading ? 'block' : 'none')};
    position: absolute;
    top: 0;
    right: 100%;
    width: 25%;
    height: 4px;
    background: ${props => props.theme.palette.main};
    animation: ${fileLoading} 2s infinite linear;
  }
  ${FileClose} {
    opacity: 0;
  }
  :hover {
    ${FileClose} {
      opacity: 1;
    }
  }
`

const AltContainer = styled(Input).attrs(props => ({ as: 'label' }))`
  display: flex;
  flex-direction: row;
  margin-top: 0.25em;

  input {
    display: block;
    padding: 0;
    line-height: 1.3;
    font-size: 1em;
    margin-left: 0.5em;
    appearance: none;
    border: none;
    background: none;
    outline: none;
  }
`

const FileUrl = styled.span`
  display: block;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 0.8em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1;
  padding: 0.5em;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
`

const AltField = ({ setAlt, alt = '' }) => {
  return (
    <AltContainer>
      Alt:
      <input type="text" value={alt} onChange={e => setAlt(e.target.value)} />
    </AltContainer>
  )
}

const File = ({
  children,
  loading,
  url,
  showAlt = false,
  removeFile,
  setAlt,
  alt,
}) => {
  return (
    <FileWrapper loading={loading}>
      <FileClose onClick={removeFile}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
        </svg>
      </FileClose>
      {children}
      {!!url && <FileUrl>{{ url }}</FileUrl>}
      {!!showAlt && <AltField alt={alt} setAlt={setAlt} />}
    </FileWrapper>
  )
}

export default File
