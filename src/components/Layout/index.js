import {Component} from 'react'
import Header from '../Header'
import SideBar from '../SideBar'

class Layout extends Component {
  render() {
    const {children} = this.props
    return (
      <div>
        <Header />
        <div className="h-[90vh] flex">
          <div className="h-full w-[250px] fixed hidden md:block mt-[10vh]">
            <SideBar />
          </div>

          {children}
        </div>
      </div>
    )
  }
}

export default Layout
