import React from 'react'
import { Input, Textarea, Button, Label } from './components/Util'
import Property from './components/Property'

export default {
  divComponent: props => <div {...props} />,
  labelComponent: Label,
  inputComponent: Input,
  buttonComponent: Button,
  textareaComponent: Textarea,
  selectComponent: props => <Input as="select" {...props} />,
  checkboxComponent: props => <Input type="checkbox" {...props} />,
  imgComponent: props => <img {...props} />,
  videoComponent: props => <video {...props} />,
  audioComponent: props => <audio {...props} />,
  propertyComponent: Property,
}
