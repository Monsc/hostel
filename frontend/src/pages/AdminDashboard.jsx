import React, { useState } from 'react';

const mockOrders = [
  { id: 1, guest: 'Alice', room: '8-Bed Mixed Dorm', checkin: '2025-06-01', checkout: '2025-06-05', status: '已支付' },
  { id: 2, guest: 'Bob', room: '4-Bed Mixed Dorm', checkin: '2025-06-02', checkout: '2025-06-04', status: '已支付' },
];

const mockStatus = [
  { room: '8-Bed Mixed Dorm', total: 8, booked: 5, available: 3 },
  { room: '4-Bed Mixed Dorm', total: 4, booked: 2, available: 2 },
  { room: '3-Bed Female Dorm', total: 6, booked: 4, available: 2 },
];

const AdminDashboard = () => {
  const lang = navigator.language.startsWith('zh') ? 'zh' : 'en';
  const [orders] = useState(mockOrders);
  const [status] = useState(mockStatus);

  const handleExport = () => {
    alert(lang === 'zh' ? '导出订单功能开发中...' : 'Export feature coming soon...');
  };
  const handleICalSync = () => {
    alert(lang === 'zh' ? 'iCal同步功能开发中...' : 'iCal sync coming soon...');
  };
  const handleRoomManage = () => {
    alert(lang === 'zh' ? '房型管理功能开发中...' : 'Room management coming soon...');
  };

  return (
    <div className="pt-24 pb-12 bg-blue-50 min-h-screen flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl mb-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">{lang === 'zh' ? '订单管理' : 'Order Management'}</h2>
        <table className="w-full mb-8 border rounded overflow-hidden text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-2 px-2">{lang === 'zh' ? '客人' : 'Guest'}</th>
              <th className="py-2 px-2">{lang === 'zh' ? '房型' : 'Room'}</th>
              <th className="py-2 px-2">{lang === 'zh' ? '入住' : 'Check-in'}</th>
              <th className="py-2 px-2">{lang === 'zh' ? '退房' : 'Check-out'}</th>
              <th className="py-2 px-2">{lang === 'zh' ? '状态' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2 px-2">{o.guest}</td>
                <td className="py-2 px-2">{o.room}</td>
                <td className="py-2 px-2">{o.checkin}</td>
                <td className="py-2 px-2">{o.checkout}</td>
                <td className="py-2 px-2">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button onClick={handleExport} className="bg-yellow-400 text-blue-900 px-6 py-2 rounded font-bold hover:bg-yellow-500 transition">{lang === 'zh' ? '导出订单' : 'Export Orders'}</button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl mb-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">{lang === 'zh' ? '房态管理' : 'Room Status'}</h2>
        <table className="w-full mb-8 border rounded overflow-hidden text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-2 px-2">{lang === 'zh' ? '房型' : 'Room'}</th>
              <th className="py-2 px-2">{lang === 'zh' ? '总数' : 'Total'}</th>
              <th className="py-2 px-2">{lang === 'zh' ? '已预订' : 'Booked'}</th>
              <th className="py-2 px-2">{lang === 'zh' ? '可用' : 'Available'}</th>
            </tr>
          </thead>
          <tbody>
            {status.map((row, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2 px-2">{row.room}</td>
                <td className="py-2 px-2">{row.total}</td>
                <td className="py-2 px-2">{row.booked}</td>
                <td className="py-2 px-2">{row.available}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button onClick={handleICalSync} className="bg-blue-700 text-white px-6 py-2 rounded font-bold hover:bg-blue-800 transition mr-2">{lang === 'zh' ? 'iCal同步' : 'iCal Sync'}</button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">{lang === 'zh' ? '房型管理' : 'Room Management'}</h2>
        <div className="flex justify-end">
          <button onClick={handleRoomManage} className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600 transition">{lang === 'zh' ? '管理房型' : 'Manage Rooms'}</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 