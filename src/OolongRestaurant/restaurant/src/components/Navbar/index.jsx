import {Link} from "react-router-dom"
import React from "react"

function Navbar() {
  const linkStyle= 'md:flex gap-8 p-6 uppercase'
  return (
    <div className="fixed w-full flex justify-between p-4 items-center">
      <div className="Logo ml-10">Logo</div>
      <div className="flex font-semibold">
      <Link to={'/'} className={linkStyle}>Home</Link>
      <Link to={'/about'} className={linkStyle}>About</Link>
      <Link to={'/products'} className={linkStyle}>Product</Link>
      <Link to={'/contact'} className={linkStyle}>Contact</Link>
      </div>
      <div className="text-mg hidden font-bold lg:block mr-2">
        <Link to={'/signup'}
              className="mr-2 rounded-3xl border-2 border-black bg-inherit py-2 px-6 text-black shadow-sm duration-150 ease-in-out hover:bg-black hover:text-white"
        >
          Sign up
        </Link>
        <Link to={'/login'} 
          className="rounded-3xl border-2 border-transparent px-6 py-2 text-black duration-300 ease-in-out hover:bg-transparent">
          Login
        </Link>
      </div>
    </div>
  )
}

export default Navbar