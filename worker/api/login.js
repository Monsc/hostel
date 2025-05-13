import { connectToDatabase } from '../utils/mongo';
import { generateToken } from '../utils/auth';

export async function handleLogin(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { email, password } = await request.json();
  const db = await connectToDatabase(env.MONGODB_URI);

  try {
    // 验证管理员账号
    const admin = await db.collection('users').findOne({
      email,
      role: 'admin'
    });

    if (!admin || admin.password !== password) {
      return new Response(
        JSON.stringify({ message: 'Invalid credentials' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // 生成 JWT token
    const token = generateToken(admin, env.JWT_SECRET);

    return new Response(
      JSON.stringify({ token }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Failed to authenticate');
  }
}
