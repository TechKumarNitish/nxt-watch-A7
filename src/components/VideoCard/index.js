import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {FaCircle} from 'react-icons/fa'
import ThemeContextConsumer from '../../contexts/Theme/ThemeContextConsumer'
import {themeConstants} from '../../constants'

const VideoCard = props => {
  const {
    id,
    title,
    channel,
    thumbnailUrl,
    viewCount,
    publishedAt,
    theme,
    isHomeVideoCard = false,
  } = props
  const {name, profileImageUrl} = channel
  return (
    <li className="w-[100%] p-0 bg-inherit">
      <Link
        to={`/videos/${id}`}
        className={`bg-inherit w-[100%] p-0 bg-inherit ${
          isHomeVideoCard === false ? 'sm:flex mb-10' : ''
        }`}
      >
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className={`w-full ${
            isHomeVideoCard === false
              ? 'sm:w-[50%] max-w-[650px] sm:mr-3'
              : 'm-0 p-0'
          }
          
          `}
        />
        <div className="flex py-3">
          <img
            className={`w-[30px] h-[30px] ml-2 sm:ml-0 ${
              isHomeVideoCard === false && 'sm:hidden'
            }`}
            src={profileImageUrl}
            alt="channel logo"
          />
          <div className="px-3">
            <p
              className={`text-base
           ${
             theme === themeConstants.lightTheme
               ? 'text-[#1e293b]'
               : 'text-[#f8fafc]'
           }
          `}
            >
              {title}
            </p>
            <div className="flex items-center sm:items-start sm:flex-col py-1">
              <p
                className={`text-xs sm:text-sm font-['Roboto'] font-normal
              ${
                theme === themeConstants.lightTheme
                  ? 'text-[#475569]'
                  : 'text-[#64748b]'
              }
              `}
              >
                {name}
              </p>
              <div className="flex items-center py-1">
                <FaCircle
                  className={`sm:hidden text-[5px] font-['Roboto'] font-normal mx-[10px]
                ${
                  theme === themeConstants.lightTheme
                    ? 'text-[#475569]'
                    : 'text-[#64748b]'
                }`}
                />
                <p
                  className={`text-xs font-['Roboto'] font-normal
                ${
                  theme === themeConstants.lightTheme
                    ? 'text-[#475569]'
                    : 'text-[#64748b]'
                }
                `}
                >
                  {viewCount} views
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
                  className={`text-xs font-['Roboto'] font-normal
                ${
                  theme === themeConstants.lightTheme
                    ? 'text-[#475569]'
                    : 'text-[#64748b]'
                }
                `}
                >
                  {formatDistanceToNow(new Date(publishedAt))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default ThemeContextConsumer(VideoCard)
