import { EventModel } from '../../../../../../mongodb/models/event';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function GET() {
  const today = new Date();

  const start = new Date(today.setHours(0, 0, 0, 0));
  const end = new Date(today.setHours(23, 59, 59, 999));

  try {
    const events = await EventModel.find({
      date: { $gte: start, $lte: end },
    }).populate('user');
    const sendMails = events.map((event) => {
      const user = event.user;
      if (!user?.email) return null;

      const baseStyle = `
    font-family: Arial, sans-serif;
    color: #333;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
  `;

      let subject = '';
      let html = '';

      if (event.type === 'birthday') {
        subject = '🎂 Төрсөн өдрийн мэнд хүргэе!';
        html = `
      <div style="${baseStyle}">
        <h2 style="color: #d63384;">🎉 Баяр хүргэе, ${user.name}!</h2>
        <p>Өнөөдөр таны онцгой өдөр — <strong>төрсөн өдөр</strong>!</p>
        <p>TeamUp багийн зүгээс танд хамгийн сайхан бүхнийг хүсэн ерөөе.</p>
        <p>🎁 Эрүүл энх, инээд хөөр, амжилтаар дүүрэн байгаарай!</p>
        <br/>
        <p style="font-style: italic;">— TeamUp баг</p>
      </div>
    `;
      } else if (event.type === 'anniversary') {
        subject = '🎊 Ойн баярын мэнд хүргэе!';
        html = `
      <div style="${baseStyle}">
        <h2 style="color: #0d6efd;">🎊 Баяр хүргэе, ${user.name}!</h2>
        <p>Та өнөөдөр <strong>ойн баяраа</strong> тэмдэглэж байна!</p>
        <br/>
        <p style="font-style: italic;">— TeamUp баг</p>
      </div>
    `;
      } else {
        subject = '🎉 Баярын мэнд!';
        html = `
      <div style="${baseStyle}">
        <h2>Сайн байна уу, ${user.name}!</h2>
        <p>Танд баярын мэнд хүргэе!</p>
        <br/>
        <p style="font-style: italic;">— TeamUp баг</p>
      </div>
    `;
      }

      return transporter.sendMail({
        from: `"TeamUp" <${process.env.EMAIL}>`,
        to: user.email,
        subject,
        text: `Сайн байна уу ${user.name}! ${subject}`,
        html,
      });
    });

    await Promise.all(sendMails);

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
  }
}
