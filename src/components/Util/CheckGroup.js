import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { transparentize, darken, hideVisually } from 'polished'
import { Button, Label, Input } from './index'

const CheckboxBase = props => <Input type="checkbox" {...props} />

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  flex-wrap: wrap;
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;
  background-color: ${props => darken(0.12, props.theme.palette.background)};

  & > * {
    flex-grow: 1;
    flex-basis: 1;
    margin-bottom: 1px;
  }
  & > * + * {
    margin-left: 1px;
  }
`

const CheckButton = styled(Button).attrs(props => ({ as: 'div' }))`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  border-radius: 0;
  border: 0.4em solid transparent;
  border-left: none;
  border-right: none;
  justify-content: flex-end;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.05);
  padding: 0.3em 0.8em;
  color: ${props => props.theme.palette.text};
  transition: background-color 0.2s, border-color 0.2s;

  &,
  &:hover,
  &:focus {
    background-color: ${props => darken(0.06, props.theme.palette.background)};
  }

  &:hover,
  &:focus {
    background-color: ${props => darken(0.03, props.theme.palette.background)};
    border-bottom-color: ${props =>
      darken(0.12, props.theme.palette.background)};
  }

  input[type='checkbox']:checked + & {
    background-color: ${props => darken(0, props.theme.palette.background)};
    border-bottom-color: ${props => props.theme.palette.main};
  }
`
const HiddenCheckbox = styled(CheckboxBase)`
  ${hideVisually()}
`

const fakeCheck = css`
  &:after {
    content: '✔';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 2em;
    border-radius: 100%;
    background-color: ${props => transparentize(0.3, props.theme.palette.main)};
    color: ${props => props.theme.palette.background};
    text-align: center;
    line-height: 1.5;
  }
`
const Checkbox = styled.span`
  display: block;
  position: relative;
  width: 3em;
  height: 3em;
  margin-right: 1em;
  font-size: 0.8em;
  ${props => props.checked && fakeCheck}
`

const CheckboxBackground = styled.span`
  display: block;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  border: 1px solid ${props => darken(0, props.theme.palette.background)};
  background-size: cover;
  background-position: center;
  background-color: ${props => props.theme.palette.text};
  background-image: ${props => props.src || ''};
`

const CheckboxIcon = styled.img`
  display: block;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  object-fit: contain;
  position: absolute;
  z-index: 1;
  bottom: 0em;
  right: 0em;
  background-color: ${props => props.theme.palette.text};
`

const CheckGroupItem = ({
  checked,
  onChange,
  value,
  children,
  photoSrc,
  photoAlt,
  iconSrc,
  iconAlt,
  ...props
}) => (
  <Label {...props}>
    <HiddenCheckbox checked={checked} onChange={onChange} value={value} />
    <CheckButton>
      {children || value}
      <Checkbox checked={checked} aria-hidden="true">
        <CheckboxBackground src={photoSrc} alt={photoAlt} />
        {!!iconSrc && <CheckboxIcon src={iconSrc} alt={iconAlt} />}
      </Checkbox>
    </CheckButton>
  </Label>
)

CheckGroupItem.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  photoSrc: PropTypes.string,
  photoAlt: PropTypes.string,
  iconSrc: PropTypes.string,
  iconAlt: PropTypes.string,
}

const CheckGroup = ({ children }) => <Wrapper>{children}</Wrapper>

CheckGroup.propTypes = {
  children: PropTypes.array.isRequired,
}

export default CheckGroup
export { CheckGroupItem }
