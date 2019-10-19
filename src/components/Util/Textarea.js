import styled from 'styled-components'
import Input from './Input'

const Textarea = styled(Input).attrs(props => ({ as: 'textarea' }))`
  resize: vertical;
  line-height: 1.5;
  min-height: ${1.5 * 3 + 2 * 0.7}em;
`

export default Textarea
