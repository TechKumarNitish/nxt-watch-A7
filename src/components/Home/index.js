import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoCloseOutline} from 'react-icons/io5'
import {IoIosSearch} from 'react-icons/io'
import Layout from '../Layout'
import FailureView from '../FailureView'
import LoaderContainer from '../LoaderContainer'
import Banner from './StyledComponents'
import {apiStatusConstants, themeConstants} from '../../constants'
import ThemeContextConsumer from '../../contexts/Theme/ThemeContextConsumer'
import VideoCard from '../VideoCard'

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
    searchText: '',
    showBanner: true,
  }

  controller = new AbortController()

  componentDidMount() {
    // this._isMounted = true
    const {signal} = this.controller
    this.getVideos(signal)
  }

  componentWillUnmount() {
    this.controller.abort() // Cancel the fetch request
    // this._isMounted = false
  }

  getVideos = async signal => {
    // console.log(this._isMounted)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) return

    // if (!this._isMounted) return
    this.setState({apiStatus: apiStatusConstants.loading})

    const {searchText} = this.state

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchText}`
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      // if(!_isMounted) return
      // const {signal} = this.controller
      const response = await fetch(apiUrl, option, signal)

      const responseData = await response.json()

      if (response.ok === true) {
        const updatedData = responseData.videos.map(data =>
          this.formatData(data),
        )

        // if (!this._isMounted) return
        this.setState({
          videosList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        // if (!this._isMounted) return
        this.setState({apiStatus: apiStatusConstants.error})
      }
    } catch (e) {
      // if (!this._isMounted) return
      this.setState({apiStatus: apiStatusConstants.error})
    }
  }

  formatData = data => ({
    id: data.id,
    title: data.title,
    thumbnailUrl: data.thumbnail_url,
    channel: {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
    },
    viewCount: data.view_count,
    publishedAt: data.published_at,
  })

  OnSearchTextHandler = event => {
    this.setState({searchText: event.target.value})
  }

  searchHandler = () => {
    this.getVideos()
  }

  retry = () => {
    this.getVideos()
  }

  closeBanner = () => {
    this.setState({showBanner: false})
  }

  // className={`
  //         bg-cover bg-center flex justify-between mr-2 h-[280px] p-2 md:p-5
  //                 w-full bg-[url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png')]`}

  renderBanner = () => {
    const {showBanner} = this.state
    return (
      <>
        {showBanner === true ? (
          <Banner data-testid="banner">
            <div className="max-w-[350px] flex flex-col justify-start p-8 md:p-4">
              <img
                className="w-[120px] md:w-[200px] mb-5"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
              />
              <p className='text-lg text-[#231f20] font-["Roboto"] font-normal'>
                Buy Nxt Watch Premium prepaid plans with UPI
              </p>
              <button
                className='mt-auto w-[150px] px-4 py-3 border-[1px] rounded-sm border-[#231f20] text-lg text-[#231f20] font-["Roboto"] font-medium'
                type="button"
              >
                GET IT NOW
              </button>
            </div>
            <button
              onClick={this.closeBanner}
              type="button"
              data-testid="close"
              className="border-0 outline-none items-start w-fit h-fit"
            >
              <IoCloseOutline className="text-lg" />
            </button>
          </Banner>
        ) : null}
      </>
    )
  }

  renderEmptyView = () => {
    const {theme} = this.props
    return (
      <div className="bg-inherit p-4 flex flex-col items-center justify-center h-[50vh]">
        <img
          className="w-[90%] max-w-[350px]"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
        <h1
          className={`mt-4 font-["Roboto"] font-bold text-lg md:text-3xl text-center ${
            theme === themeConstants.lightTheme
              ? 'text-[#231f20]'
              : 'text-[white]'
          }`}
        >
          No Search results found
        </h1>
        <p className='mt-3 text-center font-["Roboto"] font-normal text-[#7e858e] text-sm md:text-lg'>
          Try different key words or remove search filter.
        </p>
      </div>
    )
  }

  renderVideoItem = () => {
    const {videosList} = this.state
    return (
      <>
        {videosList.length > 0 ? (
          <ul
            className={`
        sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 lg:gap-4
        list-none p-0 m-0 flex flex-wrap justify-between w-full bg-inherit`}
          >
            {videosList.map(video => (
              <VideoCard key={video.id} {...video} isHomeVideoCard />
            ))}
          </ul>
        ) : (
          <FailureView retry={this.retry} />
        )}
      </>
    )
  }

  renderVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoItem()
      case apiStatusConstants.error:
        return this.renderEmptyView()
      case apiStatusConstants.initial:
        return <LoaderContainer />
      case apiStatusConstants.loading:
        return <LoaderContainer />
      default:
        return <FailureView retry={this.retry} />
    }
  }

  render() {
    const {searchText} = this.state
    const {theme} = this.props
    return (
      <Layout>
        <div
          data-testid="home"
          className={`p-0 md:ml-[250px] mt-[10vh] w-full min-h-[90vh]
          ${
            theme === themeConstants.lightTheme
              ? 'bg-[#f9f9f9]'
              : 'bg-[#181818]'
          }
          `}
        >
          {this.renderBanner()}
          <div className="sm:px-4 sm:py-7 bg-inherit w-full">
            <div
              className={`w-[95%] max-w-[500px] 
              ${
                theme === themeConstants.lightTheme
                  ? 'border-[#cccccc]'
                  : 'border-[#424242]'
              } 
              border-[1px] mx-auto mt-4 sm:mt-0 sm:ml-[5px] sm:mr-0 mb-4 p-0 flex bg-inherit`}
            >
              <input
                className={`m-0 w-[80%] font-light
                ${
                  theme === themeConstants.lightTheme
                    ? 'border-[#cccccc] text-[#231f20]'
                    : 'border-[#424242] text-[#f8fafc]'
                }
                bg-inherit px-3 py-2 font-["Roboto"] text-base outline-none border-r-[1px]
                `}
                value={searchText}
                placeholder="Search"
                type="search"
                name="searchText"
                onChange={this.OnSearchTextHandler}
              />
              <button
                onClick={this.searchHandler}
                type="button"
                data-testid="searchButton"
                className={`w-[20%] flex justify-center items-center
              ${
                theme === themeConstants.lightTheme
                  ? 'bg-[#cccccc] text-[#313131]'
                  : 'bg-[#424242] text-[#ebebeb]'
              }
              `}
              >
                <IoIosSearch className="text-xl" />
              </button>
            </div>
            {this.renderVideos()}
          </div>
        </div>
      </Layout>
    )
  }
}

export default ThemeContextConsumer(Home)
