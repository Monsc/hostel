import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import RoomList from './pages/RoomList';
import Booking from './pages/Booking';
import BookingSuccess from './pages/BookingSuccess';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Notice from './pages/Notice';
import Footer from './components/Footer';

const App = () => {
  // 这里可根据登录状态动态切换 isAdmin
  const isAdmin = false;
  return (
    <Router>
      <NavBar isAdmin={isAdmin} />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="*" element={<div className='text-center mt-32 text-gray-500'>404 页面未找到</div>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
