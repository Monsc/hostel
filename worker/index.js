import { handleCheckout } from './api/checkout';
import { handleLogin } from './api/login';
import { handleRoomStatus, handleExportBookings } from './api/roomStatus';
import { verifyToken } from './utils/auth';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS 处理
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // API 路由
    try {
      switch (path) {
        case '/api/create-checkout-session':
          return await handleCheckout(request, env);
        
        case '/api/admin/login':
          return await handleLogin(request, env);
        
        case '/api/room-status':
          return await handleRoomStatus(request, env);
        
        case '/api/export-bookings':
          return await handleExportBookings(request, env);
        
        case '/api/health':
          return new Response(JSON.stringify({ status: 'ok' }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        
        default:
          return new Response('Not Found', { status: 404 });
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ message: error.message }),
        {
          status: error.status || 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
};
