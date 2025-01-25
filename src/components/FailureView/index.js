import {themeConstants} from '../../constants'
import ThemeContextConsumer from '../../contexts/Theme/ThemeContextConsumer'

const FailureView = props => {
  const {retry, theme} = props
  return (
    <div className="w-full h-full bg-inherit p-2 flex flex-col justify-center items-center">
      <img
        className="w-[90%] max-w-[350px]"
        src={
          theme === themeConstants.lightTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        }
        alt="failure view"
      />
      <h1
        className={`
      font-["Roboto"] font-bold text-lg md:text-xl text-center ${
        theme === themeConstants.lightTheme ? 'text-[#231f20]' : 'text-[white]'
      }
      `}
      >
        Oops! Something Went Wrong
      </h1>
      <p className='mt-3 text-center font-["Roboto"] font-normal text-[#7e858e] text-sm md:text-base'>
        We are having some trouble completing your request. Please try again.
      </p>
      <button
        onClick={retry}
        type="button"
        className='mt-5 px-4 py-2 rounded-sm bg-[#4f46e5] font-["Roboto"] font-medium text-white text-base md:text-lg'
      >
        Retry
      </button>
    </div>
  )
}

export default ThemeContextConsumer(FailureView)
