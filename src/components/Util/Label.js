import styled from 'styled-components'

export default styled.label`
  display: block;
  font-family: ${props => props.theme.fontFamily};
  font-weight: normal;
  color: ${props => props.theme.palette.text};
  opacity: 0.7;
  cursor: pointer;
`
