import React from 'react';
import { Link } from 'react-router-dom';

const BookingSuccess = () => (
  <div className="pt-32 pb-12 bg-blue-50 min-h-screen flex flex-col items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
      <div className="flex justify-center mb-4">
        <span className="text-green-500 text-5xl">✔️</span>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">预订成功！</h2>
      <p className="text-gray-700 mb-6">感谢您的预订，我们已将确认邮件发送至您的邮箱。期待您的到来！</p>
      <div className="flex flex-col space-y-3">
        <Link to="/" className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">返回首页</Link>
        <Link to="/booking" className="bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition">继续预订</Link>
      </div>
    </div>
  </div>
);

export default BookingSuccess; 
