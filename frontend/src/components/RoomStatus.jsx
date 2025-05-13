import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { format, addDays } from 'date-fns';
import axios from 'axios';

const ROOMS = [
  {
    id: 'room_8_mixed',
    name: 'room.8_mixed',
    beds: 8,
    gender: 'mixed',
    count: 1
  },
  {
    id: 'room_4_mixed',
    name: 'room.4_mixed',
    beds: 4,
    gender: 'mixed',
    count: 1
  },
  {
    id: 'room_3_female',
    name: 'room.3_female',
    beds: 3,
    gender: 'female',
    count: 2
  }
];

function RoomStatus() {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [roomStatus, setRoomStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRoomStatus();
  }, [selectedDate]);

  const fetchRoomStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/room-status', {
        params: {
          date: format(selectedDate, 'yyyy-MM-dd')
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setRoomStatus(response.data);
    } catch (error) {
      setError(error.response?.data?.message || t('status.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get('/api/export-bookings', {
        params: {
          date: format(selectedDate, 'yyyy-MM-dd')
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bookings-${format(selectedDate, 'yyyy-MM-dd')}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setError(error.response?.data?.message || t('export.error'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('status.title')}</h1>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="border rounded px-3 py-2"
          />
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {t('status.export')}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROOMS.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {t(room.name)}
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  {t('status.total_beds')}: {room.beds * room.count}
                </p>
                <p className="text-gray-600">
                  {t('status.available')}: {roomStatus[room.id]?.available || 0}
                </p>
                <p className="text-gray-600">
                  {t('status.booked')}: {roomStatus[room.id]?.booked || 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomStatus; 