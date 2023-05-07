import {Link} from "react-router-dom"


function NavbarHome() {

  return (
    <>
      <div className="flex justify-between mt-7">
        <div className="flex font-montserrat2 px-3">
          <Link to={"/home"}className="mr-10 text-primary-black text-xl my-3">Home</Link>
          <Link to={"/menu"}className="mr-10 text-primary-black text-xl my-3">Menu</Link>
          <Link to={"/about"}className="mr-10 text-primary-black text-xl my-3">About us</Link>
          <Link to={"/contact"}className="mr-10 text-primary-black text-xl my-3">Contact</Link>
          {/* Button */}
          <div className="ml-8 py-3 ">
            <Link to={"/signup"} className="border bg-primary-red rounded-xl font-montserrat2 text-primary-white px-9 py-2">Sign in</Link>
          </div>
        </div>
      </div>    
    </>
  )
}

export default NavbarHome