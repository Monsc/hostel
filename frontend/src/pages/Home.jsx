import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: '💻', label: { zh: '公共办公区', en: 'Coworking Area' } },
  { icon: '🍳', label: { zh: '公共厨房', en: 'Shared Kitchen' } },
  { icon: '🛁', label: { zh: '宽敞浴室', en: 'Spacious Bathrooms' } },
  { icon: '🚺', label: { zh: '女生专属房', en: 'Female Dorms' } },
  { icon: '📶', label: { zh: '高速WiFi', en: 'High-speed WiFi' } },
  { icon: '💸', label: { zh: '数字游民优惠', en: 'Nomad Discount' } },
];

const Home = () => {
  const lang = navigator.language.startsWith('zh') ? 'zh' : 'en';
  return (
    <div className="pt-20 bg-blue-50 min-h-screen">
      {/* Banner */}
      <div className="bg-blue-700 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {lang === 'zh' ? '欢迎来到 Joy Hostel' : 'Welcome to Joy Hostel'}
        </h1>
        <p className="text-lg md:text-xl mb-6">
          {lang === 'zh'
            ? '萨拉热窝市中心，数字游民友好型青旅，舒适办公与生活空间'
            : 'A digital nomad-friendly hostel in the heart of Sarajevo, perfect for work and life.'}
        </p>
        <Link to="/booking" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition">
          {lang === 'zh' ? '立即预订' : 'Book Now'}
        </Link>
      </div>
      {/* 设施图标 */}
      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {features.map(f => (
            <div key={f.icon} className="flex flex-col items-center">
              <span className="text-3xl mb-2">{f.icon}</span>
              <span className="text-gray-700 text-sm text-center">{f.label[lang]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* 青旅介绍 */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">{lang === 'zh' ? '关于我们' : 'About Us'}</h2>
          <p className="text-gray-700 mb-2">
            {lang === 'zh'
              ? 'Joy Hostel位于萨拉热窝市中心，专为数字游民和背包客设计。我们提供舒适的办公区、设施齐全的厨房、宽敞洁净的浴室和洗手间。高速稳定WiFi覆盖全屋，女生专属房型让每位旅客都能安心入住。'
              : 'Joy Hostel is located in the center of Sarajevo, designed for digital nomads and backpackers. We offer a cozy coworking area, a fully equipped kitchen, spacious and clean bathrooms, and high-speed WiFi throughout. Female-only dorms ensure a safe and comfortable stay for everyone.'}
          </p>
          <p className="text-gray-700">
            {lang === 'zh'
              ? '数字游民可享常住优惠，欢迎长期入住！'
              : 'Special long-stay discounts for digital nomads!'}
          </p>
        </div>
      </div>
      {/* 房型推荐 */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">{lang === 'zh' ? '热门房型推荐' : 'Popular Rooms'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/123456789.jpg" alt="8人间" className="w-full h-48 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-bold mb-2">{lang === 'zh' ? '混住八人间' : '8-Bed Mixed Dorm'}</h3>
              <p className="text-gray-600 mb-2">{lang === 'zh' ? '每人每天10欧元' : '€10/person/night'}</p>
              <Link to="/booking?roomType=8bed" className="block bg-blue-700 text-white text-center py-2 rounded hover:bg-blue-800 transition mt-auto">{lang === 'zh' ? '预订' : 'Book'}</Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/987654321.jpg" alt="4人间" className="w-full h-48 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-bold mb-2">{lang === 'zh' ? '混住四人间' : '4-Bed Mixed Dorm'}</h3>
              <p className="text-gray-600 mb-2">{lang === 'zh' ? '每人每天12欧元' : '€12/person/night'}</p>
              <Link to="/booking?roomType=4bed" className="block bg-blue-700 text-white text-center py-2 rounded hover:bg-blue-800 transition mt-auto">{lang === 'zh' ? '预订' : 'Book'}</Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/192837465.jpg" alt="女生三人间" className="w-full h-48 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-bold mb-2">{lang === 'zh' ? '女生三人间' : '3-Bed Female Dorm'}</h3>
              <p className="text-gray-600 mb-2">{lang === 'zh' ? '每人每天14欧元' : '€14/person/night'}</p>
              <Link to="/booking?roomType=female3" className="block bg-blue-700 text-white text-center py-2 rounded hover:bg-blue-800 transition mt-auto">{lang === 'zh' ? '预订' : 'Book'}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 