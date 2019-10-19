import React from 'react'
import { ThemeProvider } from 'styled-components'
import defaultComponents from './default-components'
import createTheme from 'styled-components'
import defaultTheme from './theme'

export default Child => ({ theme = {}, ...props }) => (
  <ThemeProvider theme={{ ...defaultTheme, ...theme }}>
    <Child {...props} {...defaultComponents} />
  </ThemeProvider>
)
