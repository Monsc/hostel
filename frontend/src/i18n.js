import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
      },
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
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.startsWith('zh') ? 'zh' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 