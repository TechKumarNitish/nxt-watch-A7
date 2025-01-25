import {Component} from 'react'
import SavedVideosContext from './SavedVideosContext'

class SavedVideosContextProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {savedVideos: [], likedVideoIds: [], disLikedVideoIds: []}
  }

  addVideo = video => {
    const {savedVideos} = this.state
    const existingVideo = savedVideos.find(v => v.id === video.id)
    if (existingVideo === undefined) {
      this.setState(prevState => {
        const updatedVideoList = [...prevState.savedVideos, video]

        return {
          savedVideos: updatedVideoList,
        }
      })
    } else {
      this.setState(prevState => ({
        savedVideos: prevState.savedVideos.filter(v => v.id !== video.id),
      }))
    }
  }

  likeVideo = videoId => {
    const {disLikedVideoIds, likedVideoIds} = this.state
    const existingVideoId = likedVideoIds.find(id => id === videoId)
    if (existingVideoId === undefined) {
      const updatedDisLikedVideoIds = disLikedVideoIds.filter(
        id => videoId !== id,
      )

      this.setState({
        disLikedVideoIds: [...updatedDisLikedVideoIds],
        likedVideoIds: [...likedVideoIds, videoId],
      })
    } else {
      const updatedLikedVideoIds = likedVideoIds.filter(id => id !== videoId)
      this.setState({likedVideoIds: [...updatedLikedVideoIds]})
    }
  }

  disLikeVideo = videoId => {
    const {disLikedVideoIds, likedVideoIds} = this.state
    const existingVideoId = disLikedVideoIds.find(id => id === videoId)
    if (existingVideoId === undefined) {
      const updatedLikedVideoIds = likedVideoIds.filter(id => videoId !== id)

      this.setState({
        disLikedVideoIds: [...disLikedVideoIds, videoId],
        likedVideoIds: [...updatedLikedVideoIds],
      })
    } else {
      const updatedDisLikedVideoIds = disLikedVideoIds.filter(
        id => id !== videoId,
      )
      this.setState({disLikedVideoIds: [...updatedDisLikedVideoIds]})
    }
  }

  render() {
    const {children} = this.props
    const {savedVideos, likedVideoIds, disLikedVideoIds} = this.state

    return (
      <SavedVideosContext.Provider
        value={{
          savedVideos,
          likedVideoIds,
          disLikedVideoIds,
          addVideo: this.addVideo,
          removeVideo: this.removeVideo,
          likeVideo: this.likeVideo,
          disLikeVideo: this.disLikeVideo,
        }}
      >
        {children}
      </SavedVideosContext.Provider>
    )
  }
}

export default SavedVideosContextProvider
