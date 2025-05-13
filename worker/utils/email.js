import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS
  }
});

export async function sendBookingConfirmation(booking, env) {
  const { guestName, email, roomId, checkInTime, checkOutTime } = booking;

  // 中文邮件内容
  const zhContent = `
    亲爱的 ${guestName}：

    感谢您预订 Joy Hostel！

    预订详情：
    房间：${roomId}
    入住时间：${checkInTime}
    退房时间：${checkOutTime}

    入住须知：
    1. 请携带有效身份证件
    2. 入住时间：14:00 后
    3. 退房时间：12:00 前
    4. 地址：XXX 街道 XXX 号

    如有任何问题，请随时联系我们。

    祝您入住愉快！
    Joy Hostel 团队
  `;

  // 英文邮件内容
  const enContent = `
    Dear ${guestName},

    Thank you for booking with Joy Hostel!

    Booking Details:
    Room: ${roomId}
    Check-in: ${checkInTime}
    Check-out: ${checkOutTime}

    Check-in Information:
    1. Please bring valid ID
    2. Check-in time: After 14:00
    3. Check-out time: Before 12:00
    4. Address: XXX Street, XXX

    If you have any questions, please don't hesitate to contact us.

    Enjoy your stay!
    Joy Hostel Team
  `;

  // 发送中文邮件
  await transporter.sendMail({
    from: env.ZOHO_SMTP_USER,
    to: email,
    subject: 'Joy Hostel 预订确认',
    text: zhContent
  });

  // 发送英文邮件
  await transporter.sendMail({
    from: env.ZOHO_SMTP_USER,
    to: email,
    subject: 'Joy Hostel Booking Confirmation',
    text: enContent
  });
} 