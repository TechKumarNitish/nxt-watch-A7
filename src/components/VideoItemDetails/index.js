import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player/youtube'
import {FaCircle} from 'react-icons/fa'
import {BiDislike, BiLike} from 'react-icons/bi'
import {CgPlayListAdd} from 'react-icons/cg'
import Layout from '../Layout'
import FailureView from '../FailureView'
import LoaderContainer from '../LoaderContainer'
import ThemeContextConsumer from '../../contexts/Theme/ThemeContextConsumer'
import SavedVideosContextConsumer from '../../contexts/SavedVideos/SavedVideosContextConsumer'
import {apiStatusConstants, themeConstants} from '../../constants'

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetails: null,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoInfo = id => {
    const info = {isLiked: false, isSaved: false, isDisliked: false}
    const {savedVideos, likedVideoIds, disLikedVideoIds} = this.props

    const existingLikedVideo = likedVideoIds.find(videoId => videoId === id)
    if (existingLikedVideo !== undefined) info.isLiked = true

    const existingDisLikedVideo = disLikedVideoIds.find(
      videoId => videoId === id,
    )
    if (existingDisLikedVideo !== undefined) info.isDisliked = true

    const existingSavedVideo = savedVideos.find(video => video.id === id)
    if (existingSavedVideo !== undefined) info.isSaved = true

    return info
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = ` https://apis.ccbp.in/videos/${id}`
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(apiUrl, option)
      const responseData = await response.json()
      if (response.ok === true) {
        const formatedData = this.formatData(responseData.video_details)
        this.setState({
          videoDetails: formatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.error})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.error})
    }
  }

  formatData = data => ({
    id: data.id,
    title: data.title,
    videoUrl: data.video_url,
    thumbnailUrl: data.thumbnail_url,
    channel: {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
      subscriberCount: data.subscriber_count,
    },
    viewCount: data.view_count,
    publishedAt: data.published_at,
    description: data.description,
  })

  saveVideo = () => {
    const {videoDetails} = this.state
    const {addVideo} = this.props

    addVideo(videoDetails)
  }

  likeTheVideo = () => {
    const {likeVideo} = this.props
    const {videoDetails} = this.state
    const {id} = videoDetails
    likeVideo(id)
  }

  disLikeTheVideo = () => {
    const {disLikeVideo} = this.props
    const {videoDetails} = this.state
    const {id} = videoDetails
    disLikeVideo(id)
  }

  renderVideoDetails = () => {
    const {videoDetails} = this.state
    const {id} = videoDetails
    const {isLiked, isDisliked, isSaved} = this.getVideoInfo(id)
    const {theme} = this.props
    return (
      <div className="w-full bg-inherit md:p-7">
        <div className="h-[200px] sm:h-[400px] lg:h-[500px] xl:h-[700]">
          <ReactPlayer
            url={videoDetails.videoUrl}
            width="100%"
            height="100%"
            controls
          />
        </div>

        <div className="p-4 md:pl-0">
          <p
            className={`text-base mt-8 mb-6
            ${
              theme === themeConstants.lightTheme
                ? 'text-[#1e293b]'
                : 'text-[#f8fafc]'
            }
          `}
          >
            {videoDetails.title}
          </p>
          <div
            className={`flex flex-col md:flex-row justify-between flex-wrap border-b-2 ${
              theme === themeConstants.lightTheme ? '' : 'border-[#94a3b8]'
            }  mb-8`}
          >
            <div className="flex items-center mr-4 mb-5">
              <p
                className={`text-base font-['Roboto'] font-normal
                ${
                  theme === themeConstants.lightTheme
                    ? 'text-[#475569]'
                    : 'text-[#64748b]'
                }
              `}
              >
                {videoDetails.viewCount} views
              </p>
              <FaCircle
                className={`text-[4px] font-['Roboto'] font-normal mx-[10px]
                ${
                  theme === themeConstants.lightTheme
                    ? 'text-[#475569]'
                    : 'text-[#64748b]'
                }
             `}
              />
              <p
                className={`text-base font-['Roboto'] font-normal ${
                  theme === themeConstants.lightTheme
                    ? 'text-[#475569]'
                    : 'text-[#64748b]'
                }
            `}
              >
                {formatDistanceToNow(new Date(videoDetails.publishedAt))}
              </p>
            </div>
            <div className="flex items-center mb-5">
              <div className="flex items-center">
                <BiLike
                  className={`mr-2 text-[25px] font-['Roboto'] font-normal mr-2 ${
                    isLiked === true ? 'text-[#2563eb]' : 'text-[#64748b]'
                  }`}
                />
                <button
                  type="button"
                  className={`text-base font-['Roboto'] font-normal 
                  ${isLiked === true ? 'text-[#2563eb]' : 'text-[#64748b]'}
                  `}
                  onClick={this.likeTheVideo}
                >
                  Like
                </button>
              </div>
              <div className="flex items-center ml-5">
                <BiDislike
                  className={`mr-2 text-[25px] font-['Roboto'] font-normal mr-2 ${
                    isDisliked === true ? 'text-[#2563eb]' : 'text-[#64748b]'
                  }`}
                />
                <button
                  type="button"
                  onClick={this.disLikeTheVideo}
                  className={`
                    ${
                      isDisliked === true ? 'text-[#2563eb]' : 'text-[#64748b]'
                    }                  
                  `}
                >
                  Dislike
                </button>
              </div>
              <div className="flex items-center ml-5">
                <CgPlayListAdd
                  className={`mr-2 text-[25px] font-['Roboto'] font-normal mr-2 ${
                    isSaved === true ? 'text-[#2563eb]' : 'text-[#64748b]'
                  }`}
                />
                <button
                  type="button"
                  onClick={this.saveVideo}
                  className={`
                    ${isSaved === true ? 'text-[#2563eb]' : 'text-[#64748b]'}
                  `}
                >
                  {isSaved === true ? 'Saved' : 'save'}
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            <img
              className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] mr-4"
              src={videoDetails.channel.profileImageUrl}
              alt="channel logo"
            />
            <div>
              <p
                className={`text-base mb-1
              ${
                theme === themeConstants.lightTheme
                  ? 'text-[#1e293b]'
                  : 'text-[#f8fafc]'
              }
              `}
              >
                {videoDetails.channel.name}
              </p>
              <p
                className={`text-base
              ${
                theme === themeConstants.lightTheme
                  ? 'text-[#475569]'
                  : 'text-[#f8fafc]'
              }
              `}
              >
                {videoDetails.channel.subscriberCount} subscribers
              </p>
              <p
                className={`text-base hidden  md:block mt-5
              ${
                theme === themeConstants.lightTheme
                  ? 'text-[#424242]'
                  : 'text-[#64748b]'
              }
              `}
              >
                {videoDetails.description}
              </p>
            </div>
          </div>
          <p
            className={`text-base md:hidden mt-6
              ${
                theme === themeConstants.lightTheme
                  ? 'text-[#424242]'
                  : 'text-[#64748b]'
              }
            `}
          >
            {videoDetails.description}
          </p>
        </div>
      </div>
    )
  }

  retry = () => {
    this.getVideoDetails()
  }

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoDetails()
      case apiStatusConstants.error:
        return <FailureView retry={this.retry} />
      case apiStatusConstants.loading:
        return <LoaderContainer />
      case apiStatusConstants.initial:
        return <LoaderContainer />
      default:
        return <FailureView retry={this.retry} />
    }
  }

  render() {
    const {theme} = this.props
    return (
      <Layout>
        <div
          data-testid="home"
          className={`p-0 md:ml-[250px] mt-[10vh] w-full min-h-[90vh]
            ${
              theme === themeConstants.lightTheme
                ? 'bg-[#f9f9f9]'
                : 'bg-[#0f0f0f]'
            }
          `}
        >
          {this.renderContent()}
        </div>
      </Layout>
    )
  }
}

export default ThemeContextConsumer(
  SavedVideosContextConsumer(VideoItemDetails),
)

/*
`text-base font-['Roboto'] font-normal ${
                      theme === themeConstants.lightTheme
                                            ? 'text-[#475569]'
                                                                  : 'text-[#64748b]'
                                                                                    }



mr-2 text-[25px] font-['Roboto'] font-normal mr-2 ${
                      theme === themeConstants.lightTheme
                                            ? 'text-[#475569]'
                                                                  : 'text-[#64748b]'
                                                                                    }
}
}
*/
