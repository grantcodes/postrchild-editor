import React, { useState } from 'react'
import styled from 'styled-components'
import { Cancel as CloseIcon } from 'styled-icons/material'

const Wrapper = styled.span`
  position: relative;
  display: block;
  font-family: ${props => props.theme.fontFamily};
  font-weight: normal;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.palette.background};
  background-color: ${props => props.theme.palette.warning};
  padding: 0.2em 0.5em;
  line-height: 1.2;
  font-size: 0.9em;
  margin-top: 0.5em;
`

const Dismiss = styled.button`
  appearance: none;
  display: block;
  margin: 0;
  padding: 0;
  text-align: center;
  background: transparent;
  border: none;
  color: inherit;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  max-height: 2em;
  cursor: pointer;
  outline: none;

  svg {
    padding: 0.2em;
  }
`

export default ({ dismissable = false, children, ...props }) => {
  const [open, setOpen] = useState(true)

  if (!open) {
    return null
  }

  return (
    <Wrapper {...props}>
      {children}{' '}
      {dismissable && (
        <Dismiss onClick={e => setOpen(false)}>
          <CloseIcon size="1.6em" />
        </Dismiss>
      )}
    </Wrapper>
  )
}
