import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'room.8_mixed': '8-Bed Mixed Dorm',
      'room.4_mixed': '4-Bed Mixed Dorm',
      'room.3_female': '3-Bed Female Dorm',
      'price.per_night': '€{{price}} per night',
      'book.now': 'Book Now',
      'admin.login': 'Admin Login',
      'admin.email': 'Email',
      'admin.password': 'Password',
      'admin.submit': 'Login',
      'status.title': 'Room Status',
      'status.date': 'Date',
      'status.available': 'Available',
      'status.booked': 'Booked',
      'status.export': 'Export List'
    }
  },
  zh: {
    translation: {
      'room.8_mixed': '混住八人间',
      'room.4_mixed': '混住四人间',
      'room.3_female': '女生三人间',
      'price.per_night': '€{{price}}/晚',
      'book.now': '立即预订',
      'admin.login': '管理员登录',
      'admin.email': '邮箱',
      'admin.password': '密码',
      'admin.submit': '登录',
      'status.title': '房态管理',
      'status.date': '日期',
      'status.available': '可预订',
      'status.booked': '已预订',
      'status.export': '导出名单'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh', // 默认语言
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 