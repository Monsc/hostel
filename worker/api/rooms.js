import { connectToDatabase } from '../utils/mongo';

export async function handleRooms(request, env) {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const db = await connectToDatabase(env.MONGODB_URI);
    const rooms = await db.collection('rooms').find({}).toArray();

    // 如果没有房型数据，初始化默认房型
    if (rooms.length === 0) {
      const defaultRooms = [
        {
          id: "8bed",
          name: { zh: "混住八人间", en: "8-Bed Mixed Dorm" },
          price: 10,
          description: { zh: "每人每天10欧元", en: "€10/person/night" },
          count: 1,
          beds: 8,
          gender: "mixed",
          image: "/images/8bed.jpg"
        },
        {
          id: "4bed",
          name: { zh: "混住四人间", en: "4-Bed Mixed Dorm" },
          price: 12,
          description: { zh: "每人每天12欧元", en: "€12/person/night" },
          count: 1,
          beds: 4,
          gender: "mixed",
          image: "/images/4bed.jpg"
        },
        {
          id: "female3",
          name: { zh: "女生三人间", en: "3-Bed Female Dorm" },
          price: 14,
          description: { zh: "每人每天14欧元", en: "€14/person/night" },
          count: 2,
          beds: 3,
          gender: "female",
          image: "/images/female3.jpg"
        }
      ];

      await db.collection('rooms').insertMany(defaultRooms);
      return new Response(
        JSON.stringify({ rooms: defaultRooms }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    return new Response(
      JSON.stringify({ rooms }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch rooms' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

export async function handleRoomDetail(request, env) {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const url = new URL(request.url);
    const roomId = url.pathname.split('/').pop();
    
    const db = await connectToDatabase(env.MONGODB_URI);
    const room = await db.collection('rooms').findOne({ id: roomId });

    if (!room) {
      return new Response(
        JSON.stringify({ error: 'Room not found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    return new Response(
      JSON.stringify(room),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching room detail:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch room detail' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
} 