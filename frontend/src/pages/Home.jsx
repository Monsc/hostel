import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const features = t('home.features', { returnObjects: true });
  return (
    <div className="pt-20 bg-blue-50 min-h-screen">
      {/* Banner */}
      <div className="bg-blue-700 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('home.title')}
        </h1>
        <p className="text-lg md:text-xl mb-6">
          {t('home.desc')}
        </p>
        <Link to="/booking" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition">
          {t('home.bookNow')}
        </Link>
      </div>
      {/* 设施图标 */}
      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {features.map((label, idx) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-3xl mb-2">{['💻','🍳','🛁','🚺','📶','💸'][idx]}</span>
              <span className="text-gray-700 text-sm text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* 热门房型推荐 */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center mb-16">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-700 text-center tracking-wide">{t('home.popularRooms')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/123456789.jpg" alt={t('home.room_8')} className="w-full h-48 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-bold mb-2">{t('home.room_8')}</h3>
              <p className="text-gray-600 mb-2">{t('home.price_8')}</p>
              <Link to="/booking?roomType=8bed" className="block bg-blue-700 text-white text-center py-2 rounded hover:bg-blue-800 transition mt-auto">{t('home.book')}</Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/987654321.jpg" alt={t('home.room_4')} className="w-full h-48 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-bold mb-2">{t('home.room_4')}</h3>
              <p className="text-gray-600 mb-2">{t('home.price_4')}</p>
              <Link to="/booking?roomType=4bed" className="block bg-blue-700 text-white text-center py-2 rounded hover:bg-blue-800 transition mt-auto">{t('home.book')}</Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/192837465.jpg" alt={t('home.room_female3')} className="w-full h-48 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-bold mb-2">{t('home.room_female3')}</h3>
              <p className="text-gray-600 mb-2">{t('home.price_female3')}</p>
              <Link to="/booking?roomType=female3" className="block bg-blue-700 text-white text-center py-2 rounded hover:bg-blue-800 transition mt-auto">{t('home.book')}</Link>
            </div>
          </div>
        </div>
      </div>
      {/* 青旅介绍 */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">{t('home.about')}</h2>
          <p className="text-gray-700 mb-2">{t('home.aboutDesc')}</p>
          <p className="text-gray-700">{t('home.aboutNomad')}</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 