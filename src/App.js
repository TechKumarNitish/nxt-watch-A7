import {Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ThemeContextProvider from './contexts/Theme/ThemeContextProvider'
import SavedVideosContextProvider from './contexts/SavedVideos/SavedVideosContextProvider'
import './App.css'

// Replace your code here
const App = () => (
  <ThemeContextProvider>
    <SavedVideosContextProvider>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/trending" component={Trending} />
        <ProtectedRoute exact path="/gaming" component={Gaming} />

        <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
        <ProtectedRoute exact path="/videos/:id" component={VideoItemDetails} />

        <Route exact path="/bad-path" component={NotFound} />

        <Redirect to="/bad-path" />
      </Switch>
    </SavedVideosContextProvider>
  </ThemeContextProvider>
)

export default App
