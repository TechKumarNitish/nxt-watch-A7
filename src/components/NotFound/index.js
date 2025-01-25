const NotFound = () => {
  console.log('not-found')
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt="not found"
        className="w-[90%] max-w-[500px]"
      />
      <h1 className="mt-5 text-[#212121] text-center text-lg md:text-3xl font-['Roboto'] font-bold">
        Page Not Found
      </h1>
      <p className="text-[#383838] text-center text-base md:text-lg font-['Roboto'] font-normal">
        we are sorry, the page you requested could not be found.
      </p>
    </div>
  )
}

export default NotFound
