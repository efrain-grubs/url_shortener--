import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-center space-x-6">
      <Link to="/myURL">
        <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 font-medium">
          My URLs
        </button>
      </Link>
   
      <Link to="/private">
        <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 font-medium">
          Make URL
        </button>
      </Link>
      <Link to="/">
        <button
          onClick={() => localStorage.removeItem('token')}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 font-medium"
        >
          Logout
        </button>
      </Link>
    </div>
  )
}

export default NavBar
