import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFire} from 'react-icons/fa'
import {CgPlayListAdd} from 'react-icons/cg'
import {SiYoutubegaming} from 'react-icons/si'
import ThemeContextConsumer from '../../contexts/Theme/ThemeContextConsumer'
import {themeConstants} from '../../constants'

class SideBar extends Component {
  render() {
    const {theme, location, modal} = this.props
    const {pathname} = location
    const activeStyleIcon = 'text-[#ff0000]'
    const activeStyleText = 'text-[#000000]'
    const activeStyleBg = `${
      theme === themeConstants.lightTheme ? 'bg-[#f1f5f9]' : 'bg-[#424242]'
    }`

    return (
      <div
        className={`flex font-['Roboto']  w-full py-8 m-0 flex-col justify-between 
          ${modal === true ? 'h-fit items-center' : 'h-[90vh]'}         
          ${
            theme === themeConstants.lightTheme ? 'bg-[white]' : 'bg-[#212121]'
          } 
        `}
      >
        <ul className="flex flex-col p-0 list-none w-full">
          <li
            className={`p-3 mb-2 w-full 
              ${modal === true && 'flex justify-center'}
              ${pathname === '/' && activeStyleBg}
            `}
          >
            <Link
              to="/"
              className={`${modal === true && 'w-[200px]'} flex items-center`}
            >
              <IoMdHome
                className={`text-2xl 
                ${
                  pathname === '/'
                    ? activeStyleIcon
                    : `${
                        theme === themeConstants.lightTheme
                          ? 'text-[#475569]'
                          : 'text-[#616e7c]'
                      }`
                }
                
              `}
              />
              <p
                className={`text-lg ml-8 font-normal p-0
                  ${
                    pathname === '/'
                      ? activeStyleText
                      : `${
                          theme === themeConstants.lightTheme
                            ? 'text-[#1e293b]'
                            : 'text-[#f8fafc]'
                        }`
                  }
                `}
              >
                Home
              </p>
            </Link>
          </li>
          <li
            className={`p-3 mb-2 w-full 
              ${modal === true && 'flex justify-center'}
              ${pathname === '/trending' && activeStyleBg}
            `}
          >
            <Link
              to="/trending"
              className={` ${modal === true && 'w-[200px]'} flex items-center`}
            >
              <FaFire
                className={`text-2xl ${
                  pathname === '/trending'
                    ? activeStyleIcon
                    : `${
                        theme === themeConstants.lightTheme
                          ? 'text-[#475569]'
                          : 'text-[#616e7c]'
                      }`
                }
               
              `}
              />
              <p
                className={`text-lg ml-8 font-normal
                  ${
                    pathname === '/trending'
                      ? activeStyleText
                      : `${
                          theme === themeConstants.lightTheme
                            ? 'text-[#1e293b]'
                            : 'text-[#f8fafc]'
                        }`
                  }
                `}
              >
                Trending
              </p>
            </Link>
          </li>
          <li
            className={`p-3 mb-2 w-full 
              ${modal === true && 'flex justify-center'}
              ${pathname === '/gaming' && activeStyleBg}
            `}
          >
            <Link
              to="gaming"
              className={` ${modal === true && 'w-[200px]'} flex items-center`}
            >
              <SiYoutubegaming
                className={` text-2xl 
                  ${
                    pathname === '/gaming'
                      ? activeStyleIcon
                      : `${
                          theme === themeConstants.lightTheme
                            ? 'text-[#475569]'
                            : 'text-[#616e7c]'
                        }`
                  }                 
                `}
              />
              <p
                className={`text-lg ml-8 font-normal
                  ${
                    pathname === '/gaming'
                      ? activeStyleText
                      : `${
                          theme === themeConstants.lightTheme
                            ? 'text-[#1e293b]'
                            : 'text-[#f8fafc]'
                        }`
                  }
                `}
              >
                Gaming
              </p>
            </Link>
          </li>
          <li
            className={`p-3 mb-2 w-full 
              ${modal === true && 'flex justify-center'}
              ${pathname === '/saved-videos' ? activeStyleBg : ''}
            `}
          >
            <Link
              to="/saved-videos"
              className={` ${modal === true && 'w-[200px]'} flex items-center`}
            >
              <CgPlayListAdd
                className={` text-2xl 
                  ${
                    pathname === '/saved-videos'
                      ? activeStyleIcon
                      : `${
                          theme === themeConstants.lightTheme
                            ? 'text-[#475569]'
                            : 'text-[#616e7c]'
                        }`
                  }
                  
                `}
              />
              <p
                className={`text-lg ml-8 font-normal
                  ${
                    pathname === '/saved-videos'
                      ? activeStyleText
                      : `${
                          theme === themeConstants.lightTheme
                            ? 'text-[#1e293b]'
                            : 'text-[#f8fafc]'
                        }`
                  }
                `}
              >
                Saved Videos
              </p>
            </Link>
          </li>
        </ul>
        {modal !== true && (
          <div className="px-3">
            <p
              className={`text-lg font-medium
                ${
                  theme === themeConstants.lightTheme
                    ? 'text-[#1e293b]'
                    : 'text-[#f8fafc]'
                }
              `}
            >
              CONTACT US
            </p>
            <div className="flex items-center mt-3 mb-3">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="w-[30px] m-4 ml-0"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="w-[30px] m-4"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="w-[30px] m-4"
              />
            </div>
            <p
              className={`text-lg
                ${
                  theme === themeConstants.lightTheme
                    ? 'text-[#1e293b]'
                    : 'text-[#f8fafc]'
                }
              `}
            >
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        )}
      </div>
    )
  }
}

export default ThemeContextConsumer(withRouter(SideBar))
