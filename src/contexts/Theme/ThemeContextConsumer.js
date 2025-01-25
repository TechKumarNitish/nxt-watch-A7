import ThemeContext from './ThemeContext'

const ThemeContextConsumer = WrappedComponent => props => (
  <ThemeContext.Consumer>
    {value => <WrappedComponent {...props} {...value} />}
  </ThemeContext.Consumer>
)

export default ThemeContextConsumer
