import styled from 'styled-components'
import { darken } from 'polished'

export default styled.button`
  font-size: 1em;
  font-family: inherit;
  line-height: ${props => props.theme.inputLineHeight};
  padding: ${props => props.theme.inputPadding};
  font-weight: bold;
  background-color: ${props => props.theme.palette.main};
  border-radius: ${props => props.theme.borderRadius};
  /* TODO: Button color should be text or background depending on contrast */
  color: ${props => props.theme.palette.background};
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover,
  &:focus {
    background-color: ${props => darken(0.1, props.theme.palette.main)};
  }
`
