import styled from 'styled-components'
import defaultComponents from '../../../default-components'
const Button = defaultComponents.buttonComponent

const Action = styled(Button)`
  display: block;
  position: relative;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  opacity: 0.8;
  margin-bottom: 0.25em;
  overflow: hidden;
  text-indent: 2em;
  outline: none;

  &:hover {
    opacity: 1;
  }

  svg {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 15%;
  }
`

export default Action
