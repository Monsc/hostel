import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import RoomList from './components/RoomList';
import AdminLogin from './components/AdminLogin';
import RoomStatus from './components/RoomStatus';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<RoomList />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/status"
              element={
                <PrivateRoute>
                  <RoomStatus />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;
