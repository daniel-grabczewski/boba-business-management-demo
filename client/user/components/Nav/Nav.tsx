import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

/*
 WAS THIS SUPPORSED TO GO TO THE USER'S PROFILE IF THEY ARE LOGGED IN?

  const { loginWithRedirect } = useAuth0()

  const handleProfileClick = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/redirect`,
      },
    })
  }
    */


  return (
    <nav
      className="h-16 flex justify-between items-center px-6 md:px-12 lg:px-16"
      style={{ background: '#323232' }}
    >
      <div className="flex space-x-6 text-white">
        <button
          className="hover:text-purple-700 transition-colors duration-300"
          onClick={() => goTo('/')}
        >
          Home
        </button>
        <button
          className="hover:text-purple-700 transition-colors duration-300"
          onClick={() => goTo('/shop')}
        >
          Shop
        </button>
        <button
          className="hover:text-purple-700 transition-colors duration-300"
          onClick={() => goTo('/cart')}
        >
          Cart
        </button>
      </div>

      <div className="flex space-x-6 text-white">

      {
  /*
  IS THIS MEANT TO TAKE THE USER TO THEIR PROFILE? CURRENTLY, IT SEEMS THAT IT IS USED TO LOGIN?
  
        <div className="group relative">
          <button
            className="hover:text-purple-700 transition-colors duration-300 flex items-center"
            onClick={handleProfileClick}
          >
            <img
              src="/images/user.svg"
              alt="Profile Icon"
              className="h-5 w-5 "
            />
          </button>
          <span className="absolute left-1/2 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
            Account
          </span>
        </div>
*/
}

        <div className="group relative">
          <button onClick={() => goTo('/wishlist')}>
            <FontAwesomeIcon icon={faHeart} className="text-xl" />
          </button>
          <span className="absolute left-1/2 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
            Wishlist
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Nav
