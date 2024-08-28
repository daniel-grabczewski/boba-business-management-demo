import { Outlet } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

function AppLayout() {
  return (
    <div className="flex flex-col" style={{ height: '105vh' }}>
      <Nav />
      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default AppLayout