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
      const { roomId } = session.metadata;

      // 创建预订记录
      const booking = {
        roomId,
        guestName: session.customer_details.name,
        email: session.customer_details.email,
        checkInTime: session.metadata.checkInTime,
        checkOutTime: session.metadata.checkOutTime,
        status: 'confirmed',
        stripeSessionId: session.id,
        createdAt: new Date()
      };

      await db.collection('bookings').insertOne(booking);

      // 发送确认邮件
      await sendBookingConfirmation(booking, env);
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
