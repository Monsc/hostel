import { connectToDatabase } from '../utils/mongo';
import { verifyToken } from '../utils/auth';

export async function handleRoomStatus(request, env) {
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
    const date = url.searchParams.get('date');
    const db = await connectToDatabase(env.MONGODB_URI);

    // 获取房态数据
    const bookings = await db.collection('bookings').find({
      date: date,
      status: 'confirmed'
    }).toArray();

    // 计算每个房间的预订情况
    const roomStatus = {};
    const ROOMS = [
      { id: 'room_8_mixed', beds: 8, count: 1 },
      { id: 'room_4_mixed', beds: 4, count: 1 },
      { id: 'room_3_female', beds: 3, count: 2 }
    ];

    ROOMS.forEach(room => {
      const totalBeds = room.beds * room.count;
      const bookedBeds = bookings.filter(b => b.roomId === room.id).length;
      roomStatus[room.id] = {
        total: totalBeds,
        booked: bookedBeds,
        available: totalBeds - bookedBeds
      };
    });

    return new Response(
      JSON.stringify(roomStatus),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Room status error:', error);
    throw new Error('Failed to fetch room status');
  }
}

export async function handleExportBookings(request, env) {
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
    const date = url.searchParams.get('date');
    const db = await connectToDatabase(env.MONGODB_URI);

    // 获取预订数据
    const bookings = await db.collection('bookings')
      .find({
        date: date,
        status: 'confirmed'
      })
      .sort({ roomId: 1, checkInTime: 1 })
      .toArray();

    // 生成 CSV 内容
    const headers = ['Room', 'Guest Name', 'Email', 'Check-in Time', 'Check-out Time'];
    const rows = bookings.map(booking => [
      booking.roomId,
      booking.guestName,
      booking.email,
      booking.checkInTime,
      booking.checkOutTime
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="bookings-${date}.csv"`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    throw new Error('Failed to export bookings');
  }
} 