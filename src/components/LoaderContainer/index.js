import Loader from 'react-loader-spinner'

const LoaderContainer = () => (
  <div
    className="w-full flex flex-col items-center justify-center h-[40vh]"
    data-testid="loader"
  >
    <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
  </div>
)

export default LoaderContainer
