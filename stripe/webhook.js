import Stripe from 'stripe';
import { connectToDatabase } from '../worker/utils/mongo';
import { sendBookingConfirmation } from '../worker/utils/email';

export async function handleWebhook(request, env) {
  const signature = request.headers.get('stripe-signature');
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const db = await connectToDatabase(env.MONGODB_URI);

  try {
    const event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const {
        roomId,
        guestName,
        email,
        checkInTime,
        checkOutTime,
        nights,
        customAmount,
        customNote
      } = session.metadata;

      // 创建预订记录
      const booking = {
        roomId,
        guestName,
        email,
        checkInTime: new Date(checkInTime),
        checkOutTime: new Date(checkOutTime),
        nights: parseInt(nights),
        amount: customAmount ? parseFloat(customAmount) : session.amount_total / 100,
        customNote,
        status: 'confirmed',
        stripeSessionId: session.id,
        createdAt: new Date()
      };

      await db.collection('bookings').insertOne(booking);

      // 发送确认邮件
      await sendBookingConfirmation(booking, env);

      // 更新房态
      const dates = [];
      let currentDate = new Date(checkInTime);
      const endDate = new Date(checkOutTime);
      while (currentDate < endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // 为每个入住日期更新房态
      for (const date of dates) {
        await db.collection('room_status').updateOne(
          {
            roomId,
            date: {
              $gte: new Date(date.setHours(0, 0, 0, 0)),
              $lt: new Date(date.setHours(23, 59, 59, 999))
            }
          },
          {
            $inc: { booked: 1 },
            $setOnInsert: {
              roomId,
              date: new Date(date),
              total: 8, // 从房间配置中获取
              booked: 1,
              available: 7 // 从房间配置中获取
            }
          },
          { upsert: true }
        );
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
