import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ThemeContextConsumer from '../../contexts/Theme/ThemeContextConsumer'
import {themeConstants} from '../../constants'

class Login extends Component {
  state = {showPassword: false, username: '', password: '', errorMessage: null}

  onChangeHanlder = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  showPasswordHanlder = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onFormSubmit = event => {
    event.preventDefault()
    this.loginRequest()
  }

  loginRequest = async () => {
    this.setState({errorMessage: null})
    const apiUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userData = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    try {
      const response = await fetch(apiUrl, options)
      const responseData = await response.json()
      if (response.ok === true) {
        this.onSuccessFormSubmit(responseData.jwt_token)
      } else {
        this.setState({errorMessage: responseData.error_msg})
      }
    } catch (e) {
      this.setState({errorMessage: 'Something went wrong! Try Again!'})
    }
  }

  onSuccessFormSubmit = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {showPassword, username, password, errorMessage} = this.state
    const {theme} = this.props
    return (
      <div
        className={`
      ${theme === themeConstants.darkTheme ? 'bg-[#212121]' : 'bg-[#f9f9f9]'}
      min-h-screen pt-3 pb-3 flex flex-col justify-center items-center`}
      >
        <div
          className={`
           ${theme === themeConstants.darkTheme ? 'bg-[#000000]' : 'bg-[white]'}
           shadow-2xl
          flex flex-col w-[90%] max-w-[500px] rounded-xl p-5 pb-8 pt-10 md:p-10`}
        >
          <img
            className="self-center mb-6 md:mb-10  w-[120px] md:w-[200px]"
            src={`${
              theme === themeConstants.darkTheme
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            }`}
            alt="website logo"
          />
          <form
            onSubmit={this.onFormSubmit}
            className="w-full flex flex-col mt-5 bg-inherit"
          >
            <label
              htmlFor="username"
              className={`
               ${
                 theme === themeConstants.darkTheme
                   ? 'text-[#ffffff]'
                   : 'text-[#606060]'
               }
              text-base md:text-lg font-medium font-['Roboto']`}
            >
              USERNAME
            </label>
            <input
              id="username"
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={this.onChangeHanlder}
              className={`
              ${
                theme === themeConstants.darkTheme
                  ? 'text-[#ffffff]'
                  : 'text-[#424242]'
              }
              outline-none border-[#94a3b8] border-[1px] rounded-sm
              bg-inherit
              text-base md:text-xl font-normal font-['Roboto'] px-3 py-1 md:px-4 md:py-3 mb-5`}
            />

            <label
              htmlFor="password"
              className={`
              ${
                theme === themeConstants.darkTheme
                  ? 'text-[#ffffff]'
                  : 'text-[#606060]'
              }
              text-base md:text-lg font-medium font-['Roboto']`}
            >
              PASSWORD
            </label>
            <input
              id="password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={this.onChangeHanlder}
              className={`
              ${
                theme === themeConstants.darkTheme
                  ? 'text-[#ffffff]'
                  : 'text-[#424242]'
              }
              outline-none border-[#94a3b8] border-[1px] rounded-sm
              bg-inherit
              text-base md:text-xl font-['Roboto'] px-3 py-1 md:px-4 md:py-3 mb-5`}
            />
            <div className="flex items-center mb-8">
              <input
                id="showPassword"
                type="checkbox"
                checked={showPassword}
                onChange={this.showPasswordHanlder}
                name="showPassword"
                className={`w-[20px] h-[20px] mr-2 md:mr-5
                outline-none border-[#94a3b8] border-[1px] rounded-sm
                bg-inherit
                `}
              />
              <label
                htmlFor="showPassword"
                className={`
                ${
                  theme === themeConstants.darkTheme
                    ? 'text-[#ffffff]'
                    : 'text-[#000000]'
                }
                text-base md:text-lg font-normal font-['Roboto']`}
              >
                Show Password
              </label>
            </div>
            <button
              type="submit"
              className="login-btn mt-5 bg-[#3b82f6] border-0 outline-none rounded-md text-lg md:text-xl px-3 py-2 md:py-3"
            >
              Login
            </button>
            <p className='text-[#ff0b37] text-lg md:text-sm font-normal font-["Roboto"] mt-5 md:mt-1'>
              {errorMessage !== null && `*${errorMessage}`}
            </p>
          </form>
        </div>
      </div>
    )
  }
}
export default ThemeContextConsumer(Login)
