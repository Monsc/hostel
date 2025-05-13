import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const lang = navigator.language.startsWith('zh') ? 'zh' : 'en';

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/rooms`)
      .then(res => res.json())
      .then(data => setRooms(data.rooms));
  }, []);

  return (
    <div className="pt-24 pb-12 bg-blue-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8 text-blue-700">{lang === 'zh' ? '全部房型' : 'All Room Types'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {rooms.map(room => (
            <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <img src={`/images/${room.id}.jpg`} alt={room.name[lang]} className="w-full h-48 object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2">{room.name[lang]}</h3>
                  <p className="text-gray-600 mb-2">{room.desc[lang]}</p>
                  <p className="text-gray-500 text-sm">{lang === 'zh' ? '房间数：' : 'Rooms:'}{room.count}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-blue-700 font-bold text-lg">€{room.price}</span>
                  <Link to={`/booking?roomType=${room.id}`} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">{lang === 'zh' ? '预订' : 'Book'}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/booking?custom=1" className="inline-block bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-yellow-500 transition">
            {lang === 'zh' ? '自定义付款/长期优惠' : 'Custom Payment / Long Stay Discount'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomList; 