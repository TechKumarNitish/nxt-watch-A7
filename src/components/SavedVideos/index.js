import {Component} from 'react'
import {CgPlayListAdd} from 'react-icons/cg'
import Layout from '../Layout'
import {themeConstants} from '../../constants'
import ThemeContextConsumer from '../../contexts/Theme/ThemeContextConsumer'
import SavedVideosContextConsumer from '../../contexts/SavedVideos/SavedVideosContextConsumer'
import VideoCard from '../VideoCard'

class SavedVideos extends Component {
  renderBanner = () => {
    const {theme} = this.props
    return (
      <div
        data-testid="banner"
        className={`bg-cover bg-center flex items-center p-2 md:p-5
        w-full ${
          theme === themeConstants.lightTheme ? 'bg-[#ebebeb]' : 'bg-[#181818]'
        }`}
      >
        <div
          className={`p-5 mr-4 rounded-full ${
            theme === themeConstants.lightTheme
              ? 'bg-[#f1f5f9]'
              : 'bg-[#000000]'
          }`}
        >
          <CgPlayListAdd className="text-3xl text-[#ff0000]" />
        </div>
        <h1
          className={`text-3xl  font-medium font-['Roboto'] ${
            themeConstants.lightTheme === theme
              ? 'text-[#000000]'
              : 'text-[white]'
          }`}
        >
          Saved Videos
        </h1>
      </div>
    )
  }

  renderEmptyView = () => {
    const {theme} = this.props
    return (
      <div className="bg-inherit p-4 flex flex-col items-center justify-center h-full">
        <img
          className="w-[90%] max-w-[350px]"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
        />
        <h1
          className={`mt-4 font-["Roboto"] font-bold text-lg md:text-3xl text-center ${
            theme === themeConstants.lightTheme
              ? 'text-[#231f20]'
              : 'text-[white]'
          }`}
        >
          No Saved Videos Found
        </h1>
        <p className='mt-3 text-center font-["Roboto"] font-normal text-[#7e858e] text-sm md:text-lg'>
          You can save your videos while watching them.
        </p>
      </div>
    )
  }

  renderVideoItem = () => {
    const {savedVideos} = this.props

    return (
      <>
        {savedVideos && savedVideos.length > 0 ? (
          <>
            {this.renderBanner()}
            <div className="sm:p-7 bg-inherit">
              <ul className="list-none p-0 m-0 flex flex-wrap justify-between w-full bg-inherit">
                {savedVideos.map(video => (
                  <VideoCard
                    key={video.id}
                    {...video}
                    trendingVideo
                    savedVideo
                  />
                ))}
              </ul>
            </div>
          </>
        ) : (
          this.renderEmptyView()
        )}
      </>
    )
  }

  render() {
    const {theme} = this.props
    return (
      <Layout>
        <div
          data-testid="savedVideos"
          className={`p-0 md:ml-[250px] mt-[10vh] w-full min-h-[90vh]
            ${
              theme === themeConstants.lightTheme
                ? 'bg-[#f9f9f9]'
                : 'bg-[#0f0f0f]'
            }
          `}
        >
          {this.renderVideoItem()}
        </div>
      </Layout>
    )
  }
}

export default ThemeContextConsumer(SavedVideosContextConsumer(SavedVideos))
