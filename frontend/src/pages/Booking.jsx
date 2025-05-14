import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const roomOptions = [
  { id: '8bed', name: { zh: '混住八人间', en: '8-Bed Mixed Dorm' }, price: 10 },
  { id: '4bed', name: { zh: '混住四人间', en: '4-Bed Mixed Dorm' }, price: 12 },
  { id: 'female3', name: { zh: '女生三人间', en: '3-Bed Female Dorm' }, price: 14 }
];

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Booking = () => {
  const lang = navigator.language.startsWith('zh') ? 'zh' : 'en';
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const defaultRoom = params.get('roomType') || '';
  const isCustom = params.get('custom') === '1';

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    roomType: defaultRoom,
    name: '',
    email: '',
    checkin: '',
    checkout: '',
    customAmount: '',
    customNote: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && !isCustom && !form.roomType) return setError(lang === 'zh' ? '请选择房型' : 'Please select a room type');
    if (step === 2 && (!form.name || !form.email || !form.checkin || !form.checkout)) return setError(lang === 'zh' ? '请填写完整信息' : 'Please fill in all fields');
    if (isCustom && step === 3 && !form.customAmount) return setError(lang === 'zh' ? '请输入自定义金额' : 'Please enter custom amount');
    setError('');
    setStep(step + 1);
  };

  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType: form.roomType,
          name: form.name,
          email: form.email,
          checkin: form.checkin,
          checkout: form.checkout,
          customAmount: isCustom ? form.customAmount : undefined,
          customNote: isCustom ? form.customNote : undefined
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || (lang === 'zh' ? '支付发起失败' : 'Payment failed'));
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 bg-blue-50 min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">{lang === 'zh' ? '在线预订' : 'Book Online'}</h2>
        <div className="mb-6 flex items-center justify-center space-x-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className="h-1 w-8 bg-gray-300" />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          {isCustom && <><div className="h-1 w-8 bg-gray-300" /><div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div></>}
        </div>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        {step === 1 && !isCustom && (
          <div>
            <label className="block mb-2 font-medium">{lang === 'zh' ? '选择房型' : 'Select Room Type'}</label>
            <select name="roomType" value={form.roomType} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4">
              <option value="">{lang === 'zh' ? '请选择房型' : 'Please select'}</option>
              {roomOptions.map(r => <option key={r.id} value={r.id}>{r.name[lang]}（€{r.price}）</option>)}
            </select>
            <button onClick={handleNext} className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">{lang === 'zh' ? '下一步' : 'Next'}</button>
          </div>
        )}
        {((step === 1 && isCustom) || (step === 2 && !isCustom)) && (
          <form onSubmit={handleNext}>
            <label className="block mb-2 font-medium">{lang === 'zh' ? '姓名' : 'Name'}</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" />
            <label className="block mb-2 font-medium">{lang === 'zh' ? '邮箱' : 'Email'}</label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" />
            <label className="block mb-2 font-medium">{lang === 'zh' ? '入住日期' : 'Check-in'}</label>
            <input type="date" name="checkin" value={form.checkin} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" />
            <label className="block mb-2 font-medium">{lang === 'zh' ? '退房日期' : 'Check-out'}</label>
            <input type="date" name="checkout" value={form.checkout} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" />
            <div className="flex justify-between mt-4">
              {step > 1 && <button type="button" onClick={handlePrev} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">{lang === 'zh' ? '上一步' : 'Back'}</button>}
              <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">{lang === 'zh' ? '下一步' : 'Next'}</button>
            </div>
          </form>
        )}
        {isCustom && step === 2 && (
          <form onSubmit={handleNext}>
            <label className="block mb-2 font-medium">{lang === 'zh' ? '自定义金额（欧元）' : 'Custom Amount (€)'}</label>
            <input name="customAmount" type="number" min="1" value={form.customAmount} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" />
            <label className="block mb-2 font-medium">{lang === 'zh' ? '备注（可选）' : 'Note (optional)'}</label>
            <input name="customNote" value={form.customNote} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" />
            <div className="flex justify-between mt-4">
              <button type="button" onClick={handlePrev} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">{lang === 'zh' ? '上一步' : 'Back'}</button>
              <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">{lang === 'zh' ? '下一步' : 'Next'}</button>
            </div>
          </form>
        )}
        {((!isCustom && step === 3) || (isCustom && step === 3)) && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="font-medium mb-2">{lang === 'zh' ? '请确认订单信息：' : 'Please confirm your booking:'}</div>
              {!isCustom && <div className="text-gray-700 mb-1">{lang === 'zh' ? '房型：' : 'Room:'}{roomOptions.find(r => r.id === form.roomType)?.name[lang]}</div>}
              <div className="text-gray-700 mb-1">{lang === 'zh' ? '姓名：' : 'Name:'}{form.name}</div>
              <div className="text-gray-700 mb-1">{lang === 'zh' ? '邮箱：' : 'Email:'}{form.email}</div>
              <div className="text-gray-700 mb-1">{lang === 'zh' ? '入住：' : 'Check-in:'}{form.checkin}，{lang === 'zh' ? '退房：' : 'Check-out:'}{form.checkout}</div>
              {isCustom && <div className="text-gray-700 mb-1">{lang === 'zh' ? '自定义金额：' : 'Custom Amount:'}€{form.customAmount}</div>}
              {isCustom && form.customNote && <div className="text-gray-700 mb-1">{lang === 'zh' ? '备注：' : 'Note:'}{form.customNote}</div>}
            </div>
            <div className="mb-4">
              <button type="button" onClick={handlePrev} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 mr-2">{lang === 'zh' ? '上一步' : 'Back'}</button>
              <button type="submit" disabled={loading} className="bg-yellow-400 text-blue-900 px-6 py-2 rounded font-bold hover:bg-yellow-500 transition">
                {loading ? (lang === 'zh' ? '正在跳转支付...' : 'Redirecting...') : (lang === 'zh' ? '去支付' : 'Pay')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Booking; 
