import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      home: {
        title: 'Welcome to Joy Hostel',
        desc: 'A digital nomad-friendly hostel in the heart of Sarajevo, perfect for work and life.',
        bookNow: 'Book Now',
        about: 'About Us',
        aboutDesc: 'Joy Hostel is located in the center of Sarajevo, designed for digital nomads and backpackers. We offer a cozy coworking area, a fully equipped kitchen, spacious and clean bathrooms, and high-speed WiFi throughout. Female-only dorms ensure a safe and comfortable stay for everyone.',
        aboutNomad: 'Special long-stay discounts for digital nomads!',
        features: ['Coworking Area', 'Shared Kitchen', 'Spacious Bathrooms', 'Female Dorms', 'High-speed WiFi', 'Nomad Discount'],
        popularRooms: 'Popular Rooms',
        room_8: '8-Bed Mixed Dorm',
        room_4: '4-Bed Mixed Dorm',
        room_female3: '3-Bed Female Dorm',
        price_8: '€10/person/night',
        price_4: '€12/person/night',
        price_female3: '€14/person/night',
        book: 'Book',
        notice: 'Guest Information',
        notice_items: [
          'Check-in: from 14:00, latest 22:00',
          'Check-out: before 11:00',
          'Valid ID (passport/ID card) required at check-in',
          'Deposit: Some rooms require a deposit, refundable at check-out if no damage',
          'No smoking in the hostel, please keep quiet in public areas',
          'Please inform the front desk in advance for late check-out',
          'Contact: joyhostel@email.com for any questions'
        ]
      },
      booking: {
        online: 'Book Online',
        selectRoom: 'Select Room Type',
        name: 'Name',
        email: 'Email',
        checkin: 'Check-in',
        checkout: 'Check-out',
        next: 'Next',
        back: 'Back',
        pay: 'Pay',
        customAmount: 'Custom Amount (€)',
        note: 'Note (optional)',
        confirm: 'Please confirm your booking:',
        room: 'Room:',
        custom: 'Custom Payment / Long Stay Discount',
      },
      admin: {
        order: 'Order Management',
        status: 'Room Status',
        roomManage: 'Room Management',
        export: 'Export Orders',
        ical: 'iCal Sync',
        manage: 'Manage Rooms',
        guest: 'Guest',
        room: 'Room',
        checkin: 'Check-in',
        checkout: 'Check-out',
        total: 'Total',
        booked: 'Booked',
        available: 'Available',
        ical_coming_soon: 'iCal sync feature coming soon...',
        room_manage_coming_soon: 'Room management feature coming soon...'
      },
      error: {
        fetch_orders: 'Failed to fetch orders',
        fetch_status: 'Failed to fetch room status',
        export: 'Failed to export orders'
      },
      loading: 'Loading...',
      pagination: {
        prev: 'Previous',
        next: 'Next',
        page: 'Page {{page}} of {{total}}'
      }
    },
  },
  zh: {
    translation: {
      home: {
        title: '欢迎来到 Joy Hostel',
        desc: '萨拉热窝市中心，数字游民友好型青旅，舒适办公与生活空间',
        bookNow: '立即预订',
        about: '关于我们',
        aboutDesc: 'Joy Hostel位于萨拉热窝市中心，专为数字游民和背包客设计。我们提供舒适的办公区、设施齐全的厨房、宽敞洁净的浴室和洗手间。高速稳定WiFi覆盖全屋，女生专属房型让每位旅客都能安心入住。',
        aboutNomad: '数字游民可享常住优惠，欢迎长期入住！',
        features: ['公共办公区', '公共厨房', '宽敞浴室', '女生专属房', '高速WiFi', '数字游民优惠'],
        popularRooms: '热门房型推荐',
        room_8: '混住八人间',
        room_4: '混住四人间',
        room_female3: '女生三人间',
        price_8: '每人每天10欧元',
        price_4: '每人每天12欧元',
        price_female3: '每人每天14欧元',
        book: '预订',
        notice: '入住须知',
        notice_items: [
          '入住时间：14:00 起，最晚 22:00',
          '退房时间：11:00 前',
          '入住需出示有效身份证件（护照/身份证）',
          '押金：部分房型需收取押金，退房时如无损坏全额退还',
          '全馆禁烟，公共区域请保持安静',
          '如需延迟退房请提前告知前台',
          '如有疑问请联系工作人员：joyhostel@email.com'
        ]
      },
      booking: {
        online: '在线预订',
        selectRoom: '选择房型',
        name: '姓名',
        email: '邮箱',
        checkin: '入住日期',
        checkout: '退房日期',
        next: '下一步',
        back: '上一步',
        pay: '去支付',
        customAmount: '自定义金额（欧元）',
        note: '备注（可选）',
        confirm: '请确认订单信息：',
        room: '房型：',
        custom: '自定义付款/长期优惠',
      },
      admin: {
        order: '订单管理',
        status: '房态管理',
        roomManage: '房型管理',
        export: '导出订单',
        ical: 'iCal同步',
        manage: '管理房型',
        guest: '客人',
        room: '房型',
        checkin: '入住',
        checkout: '退房',
        total: '总数',
        booked: '已预订',
        available: '可用',
        ical_coming_soon: 'iCal同步功能开发中...',
        room_manage_coming_soon: '房型管理功能开发中...'
      },
      error: {
        fetch_orders: '获取订单失败',
        fetch_status: '获取房态失败',
        export: '导出订单失败'
      },
      loading: '加载中...',
      pagination: {
        prev: '上一页',
        next: '下一页',
        page: '第 {{page}} 页，共 {{total}} 页'
      }
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['navigator', 'htmlTag', 'cookie', 'localStorage', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n; 
