import Stripe from 'stripe';
import { connectToDatabase } from '../utils/mongo';

export async function handleCheckout(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const {
      roomType,
      name,
      email,
      checkin,
      checkout,
      customAmount,
      customNote
    } = await request.json();

    const stripe = new Stripe(env.STRIPE_SECRET_KEY);
    const db = await connectToDatabase(env.MONGODB_URI);

    // 获取房型信息
    const room = await db.collection('rooms').findOne({ id: roomType });
    if (!room) {
      throw new Error('Room not found');
    }

    // 计算入住天数
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    // 计算总价
    let amount;
    if (customAmount) {
      amount = Math.round(parseFloat(customAmount) * 100); // 转换为分
    } else {
      amount = Math.round(room.price * nights * 100); // 转换为分
    }

    // 创建 Stripe 结账会话
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: customAmount ? 'Custom Payment' : room.name.en,
              description: customNote || `${nights} nights at ${room.name.en}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.FRONTEND_URL}/cancel`,
      customer_email: email,
      metadata: {
        roomId: roomType,
        guestName: name,
        email: email,
        checkInTime: checkin,
        checkOutTime: checkout,
        nights: nights,
        customAmount: customAmount,
        customNote: customNote
      },
    });

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    throw new Error('Failed to create checkout session');
  }
}
