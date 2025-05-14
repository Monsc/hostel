import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const ROOMS = [
  {
    id: 'room_8_mixed',
    name: 'room.8_mixed',
    price: 10,
    stripePriceId: 'price_mock_8_mixed',
    beds: 8,
    gender: 'mixed',
    count: 1
  },
  {
    id: 'room_4_mixed',
    name: 'room.4_mixed',
    price: 12,
    stripePriceId: 'price_mock_4_mixed',
    beds: 4,
    gender: 'mixed',
    count: 1
  },
  {
    id: 'room_3_female',
    name: 'room.3_female',
    price: 14,
    stripePriceId: 'price_mock_3_female',
    beds: 3,
    gender: 'female',
    count: 2
  }
];

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function RoomList() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState(ROOMS);
  const [error, setError] = useState(null);

  const handleBooking = async (room) => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      
      // 创建结账会话
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/create-checkout-session`, {
        price: room.stripePriceId,
        roomId: room.id
      });

      // 重定向到 Stripe 结账页面
      await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });
    } catch (error) {
      console.error('Booking error:', error);
      alert('预订失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/rooms`);
      setRooms(response.data.rooms);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {t('welcome')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {t(room.name)}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('price.per_night', { price: room.price })}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {room.beds} {room.gender === 'female' ? t('beds.female') : t('beds.mixed')}
              </p>
              <button
                onClick={() => handleBooking(room)}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {loading ? t('loading') : t('book.now')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList; 
