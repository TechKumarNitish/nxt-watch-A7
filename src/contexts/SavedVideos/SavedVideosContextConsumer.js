import SavedVideosContext from './SavedVideosContext'

const SavedVideosContextConsumer = WrappedComponent => props => (
  <SavedVideosContext.Consumer>
    {value => <WrappedComponent {...props} {...value} />}
  </SavedVideosContext.Consumer>
)

export default SavedVideosContextConsumer
