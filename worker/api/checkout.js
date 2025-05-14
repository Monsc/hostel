import Stripe from 'stripe';
import { connectToDatabase } from '../utils/mongo';

export async function handleCheckout(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // 记录请求参数
    const requestBody = await request.json();
    console.log('Checkout request body:', JSON.stringify(requestBody, null, 2));

    const {
      price,
      roomId,
      roomType,
      name,
      email,
      checkin,
      checkout,
      customAmount,
      customNote
    } = requestBody;

    // 记录关键参数
    console.log('Parsed parameters:', {
      price,
      roomId,
      roomType,
      hasCustomAmount: !!customAmount,
      hasCustomNote: !!customNote
    });

    const stripe = new Stripe(env.STRIPE_SECRET_KEY);
    const db = await connectToDatabase(env.MONGODB_URI);

    // 获取房型信息
    let room;
    if (roomId) {
      room = await db.collection('rooms').findOne({ id: roomType });
      console.log('Found room:', room ? JSON.stringify(room, null, 2) : 'Not found');
    }

    // 验证必要参数
    if (!price && !room?.stripePriceId && !customAmount) {
      console.error('Missing price information');
      return new Response(
        JSON.stringify({
          error: 'Missing price information',
          details: 'Either price, room.stripePriceId, or customAmount must be provided'
        }),
        { status: 400 }
      );
    }

    // 计算入住天数
    let nights = 1;
    if (checkin && checkout) {
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);
      nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
      console.log('Calculated nights:', nights);
    }

    // 构建 line item
    let lineItem;
    try {
      if (price) {
        lineItem = {
          price: price,
          quantity: 1,
        };
        console.log('Using provided price:', price);
      } else if (room?.stripePriceId) {
        lineItem = {
          price: room.stripePriceId,
          quantity: 1,
        };
        console.log('Using room stripePriceId:', room.stripePriceId);
      } else {
        const roomName = customAmount ? 'Custom Payment' : (room?.name?.en || room?.name?.zh || 'Room');
        const roomDesc = customNote || `${nights} nights at ${roomName}`;
        lineItem = {
          price_data: {
            currency: 'eur',
            product_data: {
              name: roomName,
              description: roomDesc,
            },
            unit_amount: Math.round(customAmount * 100),
          },
          quantity: 1,
        };
        console.log('Using custom price data:', JSON.stringify(lineItem, null, 2));
      }
    } catch (lineItemError) {
      console.error('Error building line item:', lineItemError);
      return new Response(
        JSON.stringify({
          error: 'Error building line item',
          details: lineItemError.message,
          stack: lineItemError.stack
        }),
        { status: 500 }
      );
    }

    // 创建结账会话
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [lineItem],
        mode: 'payment',
        success_url: `${env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.FRONTEND_URL}/payment/cancel`,
        customer_email: email,
        metadata: {
          roomId: roomId || '',
          roomType: roomType || '',
          checkin: checkin || '',
          checkout: checkout || '',
          nights: nights.toString(),
          name: name || '',
          customAmount: customAmount?.toString() || '',
          customNote: customNote || ''
        }
      });

      console.log('Created checkout session:', session.id);
      return new Response(JSON.stringify({ sessionId: session.id }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (stripeError) {
      console.error('Stripe API error:', {
        message: stripeError.message,
        type: stripeError.type,
        code: stripeError.code,
        stack: stripeError.stack
      });
      return new Response(
        JSON.stringify({
          error: 'Stripe API error',
          details: stripeError.message,
          type: stripeError.type,
          code: stripeError.code
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in handleCheckout:', {
      message: error.message,
      stack: error.stack
    });
    return new Response(
      JSON.stringify({
        error: 'Unexpected error in handleCheckout',
        details: error.message,
        stack: error.stack
      }),
      { status: 500 }
    );
  }
}
