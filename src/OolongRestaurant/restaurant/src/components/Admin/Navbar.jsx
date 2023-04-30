import React from "react";
import  { Navbar as Nb, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left py-4 px-6 bg-white shadow sm:items-baseline w-full">
    <div className="sm:mb-0">
      <Link to="/home" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Restaurant</Link>
    </div>
  <div className="ml-5">
    <Link to="/admin/menus" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 pr-2">Thực đơn</Link>
    <Link to="/admin/foods" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 pr-2">Món ăn</Link>
    <Link to="/admin/albums" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 pr-2">Album ảnh</Link>
    <Link to="/admin/contacts" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 pr-2">Liên hệ</Link>
    <Link to="/admin/users" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 pr-2">Tài khoản</Link>
  </div>
</nav>
  );
};
export default Navbar;
