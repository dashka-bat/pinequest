import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/mongoose';
import { EventModel } from '../../../../mongodb/models/event';
import { userModel } from '../../../../mongodb/models/user';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    await connectToDatabase();

    const today = new Date();

    const events = await EventModel.find({ type: { $in: ['birthday', 'anniversary_company', 'anniversary_personal'] } }); // шаардлагатай төрлүүдийг оруулж болно

    // Төрлийн монгол орчуулга
    const eventTypeMap: Record<string, string> = {
      birthday: 'Төрсөн өдөр',
      anniversary_company: 'Компанийн ой',
      anniversary_personal: 'Хувийн ой',
    };

    // Бүх үйл явдлын daysLeft-ийг тооцно, type-г хадгална
    const upcoming = events
      .map(event => {
        const date = new Date(event.date);
        date.setFullYear(today.getFullYear());

        if (date < today) {
          date.setFullYear(today.getFullYear() + 1);
        }

        const diffTime = date.getTime() - today.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
          name: event.name,
          date,
          daysLeft,
          type: event.type,
        };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);

    if (upcoming.length === 0) {
      return NextResponse.json({ message: 'Өдөр тутмын үйл явдал олдсонгүй.' });
    }

    const minDaysLeft = upcoming[0].daysLeft;

    // Өнөөдөр, маргааш болон хамгийн ойрхон үйл явдлууд
    const eventsToNotify = upcoming.filter(event =>
      event.daysLeft === 0 || event.daysLeft === 1 || event.daysLeft === minDaysLeft
    );

    // Давхар давхар дахин нэмэгдэхээс сэргийлэх
    const uniqueEvents = Array.from(new Map(eventsToNotify.map(e => [e.name + e.date.toISOString(), e])).values());

    const users = await userModel.find({}).select('email name');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (const user of users) {
      const eventsListHtml = uniqueEvents.map(event => {
        const eventTypeName = eventTypeMap[event.type] || event.type || 'Үйл явдал';
        return `
          <li>
            <strong>${event.name}</strong> (${eventTypeName}) — ${event.daysLeft === 0 ? 'өнөөдөр' : event.daysLeft === 1 ? 'маргааш' : event.daysLeft + ' хоногийн дараа'}<br />
            Огноо: ${event.date.toDateString()}
          </li>
        `;
      }).join('');

    await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: ` ойртож буй үйл явдлууд байна 🎉`,
  html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fff8f8; padding: 40px 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 14px; box-shadow: 0 8px 20px rgba(255, 133, 133, 0.3); padding: 30px; border: 1px solid #ff8585;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://res.cloudinary.com/dxkgrtted/image/upload/v1751356883/Thankly_qdcvli.png" alt="Thankly Logo" style="height: 60px;" />
        </div>
        <h2 style="color: #FF4C4C; font-size: 28px; margin-bottom: 15px; text-align: center; font-weight: 700;">👋 Сайн байна уу, ${user.name}!</h2>
        <p style="font-size: 18px; color: #444444; line-height: 1.6; text-align: center; margin-bottom: 25px;">
          Танд ойртож буй дараах үйл явдлууд байна. Баярын өдрүүдэд чинь халуун мэндчилгээ дэвшүүлье!
        </p>
        <ul style="font-size: 16px; color: #555555; margin: 0 0 30px 20px; padding-left: 0; list-style-type: disc; max-width: 400px; margin-left: auto; margin-right: auto;">
          ${eventsListHtml}
        </ul>
        <p style="font-size: 14px; color: #777777; text-align: center; margin-top: 20px; font-style: italic;">
          📅 Имэйлийг илгээсэн огноо: <strong>${new Date().toLocaleDateString()}</strong>
        </p>
        <div style="text-align: center; margin-top: 35px;">
  <a href="https://pinequest-n2o2.vercel.app/" target="_blank"
     style="
       background: linear-gradient(135deg, #ff6b6b, #ff4c4c);
       color: white;
       padding: 14px 36px;
       text-decoration: none;
       border-radius: 30px;
       font-weight: 700;
       font-size: 17px;
       box-shadow: 0 6px 15px rgba(255, 76, 76, 0.5);
       display: inline-block;
       transition: background 0.3s ease, transform 0.2s ease;
       letter-spacing: 0.03em;
       user-select: none;
     "
     onmouseover="this.style.background='linear-gradient(135deg, #ff4c4c, #ff1a1a)'; this.style.transform='scale(1.05)';"
     onmouseout="this.style.background='linear-gradient(135deg, #ff6b6b, #ff4c4c)'; this.style.transform='scale(1)';"
  >
    🌐 Манай вэбсайтад зочлох
  </a>
</div>

      </div>
      <p style="text-align: center; font-size: 12px; color: #999999; margin-top: 30px;">
        Энэ имэйл автоматоор илгээгдсэн болно. Хариу бичих шаардлагагүй.
      </p>
    </div>
  `
});
    }

    return NextResponse.json({ message: 'Reminder emails sent for upcoming events.', events: uniqueEvents });
  } catch (err) {
    console.error('❌ Email sending error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
