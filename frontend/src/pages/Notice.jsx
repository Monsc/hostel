import React from 'react';
import { useTranslation } from 'react-i18next';

const Notice = () => {
  const { t } = useTranslation();
  const items = t('notice_items', { returnObjects: true });
  return (
    <div className="pt-32 pb-12 bg-blue-50 min-h-screen flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          {t('notice')}
        </h2>
        <ul className="text-gray-700 text-base leading-7 space-y-3">
          {items.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Notice; 