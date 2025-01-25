import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideos: [],
  likedVideoIds: [],
  disLikedVideoIds: [],
  addVideo: () => {},
  removeVideo: () => {},
  likeVideo: () => {},
  disLikeVideo: () => {},
})

export default SavedVideosContext
