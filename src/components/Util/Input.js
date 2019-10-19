import styled from 'styled-components'
import { darken, lighten, transparentize } from 'polished'

export default styled.input`
  display: block;
  width: 100%;
  font-size: 1em;
  font-family: ${props => props.theme.fontFamily};
  color: ${props => lighten(0.4, props.theme.palette.text)};
  background: ${props => props.theme.palette.background};
  border: 1px solid ${props => props.theme.palette.border};
  line-height: ${props => props.theme.inputLineHeight};
  padding: ${props => props.theme.inputPadding};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: none;
  outline: none;
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;

  &:hover {
    color: ${props => lighten(0.1, props.theme.palette.text)};
    border-color: ${props => darken(0.2, props.theme.palette.border)};
  }

  &:focus {
    color: ${props => props.theme.palette.text};
    border-color: ${props => props.theme.palette.main};
    box-shadow: 0 0 0.1em
      ${props => transparentize(0.8, props.theme.palette.main)};
  }
`
