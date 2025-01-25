import {Link} from 'react-router-dom'
import ThemeContextConsumer from '../../contexts/Theme/ThemeContextConsumer'
import {themeConstants} from '../../constants'

const GamingVideoCard = props => {
  const {title, thumbnailUrl, viewCount, theme, id} = props
  return (
    <li className="bg-inherit">
      <Link className="bg-inherit w-full" to={`/videos/${id}`}>
        <img src={thumbnailUrl} alt="video thumbnail" className="w-full" />
        <p
          className={`text-base px-1 mt-4
           ${
             theme === themeConstants.lightTheme
               ? 'text-[#1e293b]'
               : 'text-[#f8fafc]'
           }
        `}
        >
          {title}
        </p>
        <div
          className={`flex flex-wrap text-sm font-normal font-['Roboto'] px-1
          ${
            theme === themeConstants.lightTheme
              ? 'text-[#475569]'
              : 'text-[#64748b]'
          }
        `}
        >
          <p className="mt-1 mr-2">{viewCount} Watching</p>
          <p className="mt-1">Worldwide</p>
        </div>
      </Link>
    </li>
  )
}

export default ThemeContextConsumer(GamingVideoCard)
