import { handleRooms, handleRoomDetail } from './api/rooms';
import { handleCheckout } from './api/checkout';
import { handleOrders, handleOrderDetail, handleExportOrders } from './api/orders';
import { handleRoomStatus, handleExportBookings } from './api/roomStatus';
import { handleWebhook } from '../stripe/webhook';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS 预检请求处理
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    try {
      // API 路由
      if (path.startsWith('/api/')) {
        // 房型相关
        if (path === '/api/rooms') {
          return handleRooms(request, env);
        }
        if (path.match(/^\/api\/rooms\/[^/]+$/)) {
          return handleRoomDetail(request, env);
        }

        // 预订相关
        if (path === '/api/create-checkout-session') {
          return handleCheckout(request, env);
        }

        // 订单相关
        if (path === '/api/orders') {
          return handleOrders(request, env);
        }
        if (path.match(/^\/api\/orders\/[^/]+$/)) {
          return handleOrderDetail(request, env);
        }
        if (path === '/api/orders/export') {
          return handleExportOrders(request, env);
        }

        // 房态相关
        if (path === '/api/room-status') {
          return handleRoomStatus(request, env);
        }
        if (path === '/api/export-bookings') {
          return handleExportBookings(request, env);
        }

        // Stripe webhook
        if (path === '/stripe/webhook') {
          return handleWebhook(request, env);
        }
      }

      // 404 处理
      return new Response('Not Found', { status: 404 });
    } catch (error) {
      console.error('Error handling request:', error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
};
