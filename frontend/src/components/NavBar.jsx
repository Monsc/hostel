import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isAdmin }) => (
  <nav className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
    <div className="container mx-auto flex items-center justify-between py-3 px-4">
      <Link to="/" className="flex items-center text-blue-700 font-bold text-2xl">
        <span className="mr-2">🏨</span> Joy Hostel
      </Link>
      <div className="flex space-x-6">
        <Link to="/rooms" className="text-gray-700 hover:text-blue-700 font-medium">房型</Link>
        <Link to="/booking" className="text-gray-700 hover:text-blue-700 font-medium">预订</Link>
        {isAdmin ? (
          <Link to="/admin" className="text-gray-700 hover:text-blue-700 font-medium">管理后台</Link>
        ) : (
          <Link to="/admin/login" className="text-gray-700 hover:text-blue-700 font-medium">管理员登录</Link>
        )}
      </div>
    </div>
  </nav>
);

export default NavBar; 