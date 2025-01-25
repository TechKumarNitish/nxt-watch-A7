import {Component} from 'react'
import {themeConstants} from '../../constants'
import ThemeContext from './ThemeContext'

class ThemeContextProvider extends Component {
  constructor(props) {
    super(props)
    let theme = localStorage.getItem('theme')
    if (
      theme === undefined ||
      (theme !== themeConstants.lightTheme &&
        theme !== themeConstants.darkTheme)
    ) {
      console.log('theme not found or currupted theme: ', theme)
      theme = themeConstants.lightTheme
    }
    console.log('theme from provider', theme)
    this.state = {theme}
  }

  updateTheme = () => {
    this.setState(this.toggleTheme, this.storeTheme)
  }

  toggleTheme = prevState => {
    console.log('updating theme....')
    const {theme} = prevState
    if (theme === themeConstants.lightTheme)
      return {theme: themeConstants.darkTheme}
    return {theme: themeConstants.lightTheme}
  }

  storeTheme = () => {
    const {theme} = this.state
    localStorage.setItem('theme', theme)
  }

  render() {
    const {children} = this.props
    const {theme} = this.state
    return (
      <ThemeContext.Provider value={{theme, updateTheme: this.updateTheme}}>
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContextProvider
