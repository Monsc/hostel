import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { i18n } = useTranslation();
  const isZh = i18n.language.startsWith('zh');
  return (
    <footer className="w-full py-6 bg-white text-center text-gray-500 text-sm border-t mt-12">
      {isZh
        ? '本站由 Freedon & Wi-Fi 构建 @萨拉热窝 版权所有 Joy Hostel'
        : 'Powered by Freedon & Wi-Fi @ Sarajevo © Joy Hostel'}
    </footer>
  );
};

export default Footer; 
