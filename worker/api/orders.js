import { connectToDatabase } from '../utils/mongo';
import { verifyToken } from '../utils/auth';

export async function handleOrders(request, env) {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  // 验证管理员权限
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const admin = verifyToken(token, env.JWT_SECRET);
    if (!admin || admin.role !== 'admin') {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const status = url.searchParams.get('status');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    const db = await connectToDatabase(env.MONGODB_URI);
    
    // 构建查询条件
    const query = {};
    if (status) query.status = status;
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // 获取订单总数
    const total = await db.collection('bookings').countDocuments(query);

    // 获取分页订单数据
    const orders = await db.collection('bookings')
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return new Response(
      JSON.stringify({
        orders,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Orders error:', error);
    throw new Error('Failed to fetch orders');
  }
}

export async function handleOrderDetail(request, env) {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  // 验证管理员权限
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const admin = verifyToken(token, env.JWT_SECRET);
    if (!admin || admin.role !== 'admin') {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const orderId = url.pathname.split('/').pop();
    
    const db = await connectToDatabase(env.MONGODB_URI);
    const order = await db.collection('bookings').findOne({ _id: orderId });

    if (!order) {
      return new Response('Order not found', { status: 404 });
    }

    return new Response(
      JSON.stringify(order),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Order detail error:', error);
    throw new Error('Failed to fetch order detail');
  }
}

export async function handleExportOrders(request, env) {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  // 验证管理员权限
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const admin = verifyToken(token, env.JWT_SECRET);
    if (!admin || admin.role !== 'admin') {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const status = url.searchParams.get('status');

    const db = await connectToDatabase(env.MONGODB_URI);
    
    // 构建查询条件
    const query = {};
    if (status) query.status = status;
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // 获取订单数据
    const orders = await db.collection('bookings')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    // 生成 CSV 内容
    const headers = ['Order ID', 'Guest Name', 'Email', 'Room', 'Check-in', 'Check-out', 'Status', 'Amount', 'Created At'];
    const rows = orders.map(order => [
      order._id,
      order.guestName,
      order.email,
      order.roomId,
      order.checkInTime,
      order.checkOutTime,
      order.status,
      order.amount,
      order.createdAt
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="orders-${new Date().toISOString().split('T')[0]}.csv"`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Export orders error:', error);
    throw new Error('Failed to export orders');
  }
} 