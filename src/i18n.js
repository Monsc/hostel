import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // 通用
      'error.loadingData': 'Error loading data',
      'error.loadingRooms': 'Error loading rooms',
      'error.loadingRoom': 'Error loading room',
      'error.roomNotFound': 'Room not found',
      'error.bookingFailed': 'Booking failed',
      'error.paymentFailed': 'Payment failed',

      // 房型列表
      'rooms.title': 'Our Rooms',
      'rooms.bookNow': 'Book Now',
      'rooms.pricePerNight': 'per night',

      // 预订表单
      'booking.title': 'Book a Room',
      'booking.guestName': 'Guest Name',
      'booking.email': 'Email',
      'booking.checkInTime': 'Check-in Time',
      'booking.checkOutTime': 'Check-out Time',
      'booking.customAmount': 'Custom Amount',
      'booking.customNote': 'Special Requests',
      'booking.optional': '(Optional)',
      'booking.processing': 'Processing...',
      'booking.proceedToPayment': 'Proceed to Payment',

      // 管理后台
      'admin.dashboard': 'Admin Dashboard',
      'admin.roomStatus': 'Room Status',
      'admin.orders': 'Orders',
      'admin.exportOrders': 'Export Orders',
      'admin.room': 'Room',
      'admin.total': 'Total',
      'admin.booked': 'Booked',
      'admin.available': 'Available',
      'admin.orderId': 'Order ID',
      'admin.guestName': 'Guest Name',
      'admin.checkIn': 'Check-in',
      'admin.checkOut': 'Check-out',
      'admin.status': 'Status',
      'admin.amount': 'Amount',
      'admin.previous': 'Previous',
      'admin.next': 'Next',
      'admin.page': 'Page',
      'admin.of': 'of'
    }
  },
  zh: {
    translation: {
      // 通用
      'error.loadingData': '加载数据失败',
      'error.loadingRooms': '加载房型失败',
      'error.loadingRoom': '加载房间失败',
      'error.roomNotFound': '未找到房间',
      'error.bookingFailed': '预订失败',
      'error.paymentFailed': '支付失败',

      // 房型列表
      'rooms.title': '我们的房间',
      'rooms.bookNow': '立即预订',
      'rooms.pricePerNight': '每晚',

      // 预订表单
      'booking.title': '预订房间',
      'booking.guestName': '客人姓名',
      'booking.email': '电子邮箱',
      'booking.checkInTime': '入住时间',
      'booking.checkOutTime': '退房时间',
      'booking.customAmount': '自定义金额',
      'booking.customNote': '特殊要求',
      'booking.optional': '（可选）',
      'booking.processing': '处理中...',
      'booking.proceedToPayment': '前往支付',

      // 管理后台
      'admin.dashboard': '管理后台',
      'admin.roomStatus': '房态管理',
      'admin.orders': '订单管理',
      'admin.exportOrders': '导出订单',
      'admin.room': '房间',
      'admin.total': '总数',
      'admin.booked': '已预订',
      'admin.available': '可预订',
      'admin.orderId': '订单号',
      'admin.guestName': '客人姓名',
      'admin.checkIn': '入住时间',
      'admin.checkOut': '退房时间',
      'admin.status': '状态',
      'admin.amount': '金额',
      'admin.previous': '上一页',
      'admin.next': '下一页',
      'admin.page': '第',
      'admin.of': '页，共'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 