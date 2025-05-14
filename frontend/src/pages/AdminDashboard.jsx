import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchOrders();
    fetchRoomStatus();
  }, [pagination.page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('${import.meta.env.VITE_API_URL}/api/orders', {
        params: {
          page: pagination.page,
          limit: pagination.limit
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setOrders(response.data.orders);
      setPagination(response.data.pagination);
    } catch (error) {
      setError(error.response?.data?.message || t('error.fetch_orders'));
    } finally {
      setLoading(false);
    }
  };

  const fetchRoomStatus = async () => {
    try {
      const response = await axios.get('${import.meta.env.VITE_API_URL}/api/room-status', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setStatus(response.data);
    } catch (error) {
      setError(error.response?.data?.message || t('error.fetch_status'));
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get('${import.meta.env.VITE_API_URL}/api/orders/export', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `orders-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setError(error.response?.data?.message || t('error.export'));
    }
  };

  const handleICalSync = () => {
    alert(t('admin.ical_coming_soon'));
  };

  const handleRoomManage = () => {
    alert(t('admin.room_manage_coming_soon'));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="pt-24 pb-12 bg-blue-50 min-h-screen flex flex-col items-center">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-5xl">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl mb-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">{t('admin.order')}</h2>
        {loading ? (
          <div className="text-center py-4">{t('loading')}</div>
        ) : (
          <>
            <table className="w-full mb-8 border rounded overflow-hidden text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-2">{t('admin.guest')}</th>
                  <th className="py-2 px-2">{t('admin.room')}</th>
                  <th className="py-2 px-2">{t('admin.checkin')}</th>
                  <th className="py-2 px-2">{t('admin.checkout')}</th>
                  <th className="py-2 px-2">{t('admin.status')}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="py-2 px-2">{order.guestName}</td>
                    <td className="py-2 px-2">{order.roomId}</td>
                    <td className="py-2 px-2">{new Date(order.checkInTime).toLocaleDateString()}</td>
                    <td className="py-2 px-2">{new Date(order.checkOutTime).toLocaleDateString()}</td>
                    <td className="py-2 px-2">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 分页控件 */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  {t('pagination.prev')}
                </button>
                <span className="px-3 py-1">
                  {t('pagination.page', { page: pagination.page, total: pagination.pages })}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  {t('pagination.next')}
                </button>
              </div>
              <button
                onClick={handleExport}
                className="bg-yellow-400 text-blue-900 px-6 py-2 rounded font-bold hover:bg-yellow-500 transition"
              >
                {t('admin.export')}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl mb-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">{t('admin.status')}</h2>
        <table className="w-full mb-8 border rounded overflow-hidden text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-2 px-2">{t('admin.room')}</th>
              <th className="py-2 px-2">{t('admin.total')}</th>
              <th className="py-2 px-2">{t('admin.booked')}</th>
              <th className="py-2 px-2">{t('admin.available')}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(status).map(([roomId, data]) => (
              <tr key={roomId} className="border-t">
                <td className="py-2 px-2">{roomId}</td>
                <td className="py-2 px-2">{data.total}</td>
                <td className="py-2 px-2">{data.booked}</td>
                <td className="py-2 px-2">{data.available}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button
            onClick={handleICalSync}
            className="bg-blue-700 text-white px-6 py-2 rounded font-bold hover:bg-blue-800 transition mr-2"
          >
            {t('admin.ical')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">{t('admin.room_manage')}</h2>
        <div className="flex justify-end">
          <button
            onClick={handleRoomManage}
            className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600 transition"
          >
            {t('admin.manage')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 
