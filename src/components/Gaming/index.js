import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Layout from '../Layout'
import FailureView from '../FailureView'
import LoaderContainer from '../LoaderContainer'
import {apiStatusConstants, themeConstants} from '../../constants'
import ThemeContextConsumer from '../../contexts/Theme/ThemeContextConsumer'
import GamingVideoCard from '../GamingVideoCard'

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
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
        const updatedData = responseData.videos.map(data =>
          this.formatData(data),
        )

        this.setState({
          videosList: updatedData,
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
    thumbnailUrl: data.thumbnail_url,
    viewCount: data.view_count,
  })

  renderBanner = () => {
    const {theme} = this.props
    return (
      <div
        data-testid="banner"
        className={`bg-cover bg-center flex items-center p-2 md:p-5
          w-full ${
            theme === themeConstants.lightTheme
              ? 'bg-[#ebebeb]'
              : 'bg-[#181818]'
          }`}
      >
        <div
          className={`p-5 mr-4 rounded-full ${
            theme === themeConstants.lightTheme
              ? 'bg-[#f1f5f9]'
              : 'bg-[#000000]'
          }`}
        >
          <SiYoutubegaming className="text-3xl text-[#ff0000]" />
        </div>
        <p
          className={`text-3xl  font-medium font-['Roboto'] ${
            themeConstants.lightTheme === theme
              ? 'text-[#000000]'
              : 'text-[white]'
          }`}
        >
          Gaming
        </p>
      </div>
    )
  }

  renderVideoItem = () => {
    const {videosList} = this.state
    return (
      <>
        {this.renderBanner()}
        <div className="p-2 sm:p-7 bg-inherit">
          <ul
            className={`
        grid grid-cols-2 sm:grid-cols-3 gap-x-2 lg:gap-x-4 gap-y-20
        list-none p-0 m-0 flex flex-wrap justify-between w-full bg-inherit`}
          >
            {videosList.map(video => (
              <GamingVideoCard key={video.id} {...video} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  retry = () => {
    this.getVideos()
  }

  renderVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoItem()
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
          data-testid="gaming"
          className={`p-0 md:ml-[250px] mt-[10vh] w-full min-h-[90vh]
                ${
                  theme === themeConstants.lightTheme
                    ? 'bg-[#f9f9f9]'
                    : 'bg-[#0f0f0f]'
                }
            `}
        >
          {this.renderVideos()}
        </div>
      </Layout>
    )
  }
}

export default ThemeContextConsumer(Gaming)
