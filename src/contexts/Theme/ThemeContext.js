import React from 'react'
import {themeConstants} from '../../constants'

const ThemeContext = React.createContext({
  theme: themeConstants.lightTheme,
  updateTheme: () => {},
})

export default ThemeContext
