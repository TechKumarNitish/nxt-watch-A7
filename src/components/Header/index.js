import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa'
import {IoSunnyOutline, IoCloseOutline} from 'react-icons/io5'

import Popup from 'reactjs-popup'
import ThemeContextConsumer from '../../contexts/Theme/ThemeContextConsumer'
import {themeConstants} from '../../constants'
import SideBar from '../SideBar'

class Header extends Component {
  themeChanger = () => {
    const {updateTheme} = this.props
    updateTheme()
  }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {theme} = this.props
    return (
      <div
        className={`flex items-center h-[10vh]
          ${
            theme === themeConstants.lightTheme ? 'bg-[white]' : 'bg-[#212121]'
          } w-full px-3 md:px-20 py-5 m-0 fixed
        `}
      >
        {' '}
        <Link to="/" className="">
          <img
            className="w-[80px] md:w-[150px] mr-3"
            src={
              theme === themeConstants.lightTheme
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            }
            alt="website logo"
          />
        </Link>
        <div className="flex items-center ml-auto">
          <button
            data-testid="theme"
            type="button"
            onClick={this.themeChanger}
            className="text-white md:mr-4"
          >
            {theme !== themeConstants.lightTheme ? (
              <IoSunnyOutline className="text-3xl md:text-5xl text-[white]" />
            ) : (
              <FaMoon className="text-lg md:text-4xl text-[black] -rotate-[25deg] translate-y-[2px] md:translate-y-[5px]" />
            )}
          </button>

          <button
            className="hidden md:block text-white px-4 md:px-5"
            type="button"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="w-[20px] md:w-[40px]"
            />
          </button>
          <Popup
            trigger={
              <button
                type="button"
                className="md:hidden bg-inherit border-none outline-none p-0 px-4 m-0"
              >
                <GiHamburgerMenu
                  className={`text-lg 
                    ${
                      theme === themeConstants.lightTheme
                        ? 'text-[black]'
                        : 'text-[white]'
                    }
                  `}
                />
              </button>
            }
            modal
          >
            {close => (
              <div
                className={`h-screen w-screen flex flex-col
                    ${
                      theme === themeConstants.lightTheme
                        ? 'bg-[white]'
                        : 'bg-[#212121]'
                    }
                  `}
              >
                <button
                  type="button"
                  onClick={close}
                  className="ml-auto mt-8 mr-8"
                >
                  <IoCloseOutline
                    className={`
                      ${
                        theme === themeConstants.lightTheme
                          ? 'text-[black]'
                          : 'text-[white]'
                      } text-3xl`}
                  />
                </button>
                <div className="w-full h-fit my-auto">
                  <SideBar modal />
                </div>
              </div>
            )}
          </Popup>

          <Popup
            modal
            trigger={
              <button
                type="button"
                className={`px-3 md:px-0
                    md:ml-3 md:py-1 md:px-5 
                    ${
                      theme === themeConstants.lightTheme
                        ? 'md:text-[#3b82f6] md:border-[#3b82f6]'
                        : 'md:text-[white] md:border-[white]'
                    }
                    md:border-[1px] md:rounded-sm md:font-['Roboto'] md:font-medium
                  `}
              >
                <p className="hidden md:block">Logout</p>
                <FiLogOut
                  className={`md:hidden text-lg 
                    ${
                      theme === themeConstants.lightTheme
                        ? 'text-[black]'
                        : 'text-[white]'
                    }`}
                />
              </button>
            }
          >
            {close => (
              // <div className=" bg-[#f8fafc]/[0.2] min-h-[100vh] w-screen flex justify-center items-center">
              <div
                className={` p-8 rounded-md flex flex-col items-center
                  ${
                    theme === themeConstants.lightTheme
                      ? 'bg-[#ffffff]'
                      : 'bg-[#313131]'
                  }`}
              >
                <p
                  className={`text-center font-['Roboto'] font-normal text-lg
                      ${
                        theme === themeConstants.lightTheme
                          ? 'text-[#00306e]'
                          : 'text-[white]'
                      }`}
                >
                  Are you sure, you want to logout
                </p>
                <div className="flex w-ful justify-around items-center mt-8">
                  <button
                    type="button"
                    onClick={close}
                    className={`
                        border-[#64748b] text-[#64748b] bg-inherit mr-8
                        w-[120px] py-2 border-[1px] outline-none font-medium text-lg
                      `}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={this.logout}
                    className={`bg-[#3b82f6] text-[white]
                      w-[120px] py-2 outline-none font-medium text-lg
                    `}
                  >
                    Confirm
                  </button>
                </div>
              </div>
              // </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}
export default ThemeContextConsumer(withRouter(Header))
