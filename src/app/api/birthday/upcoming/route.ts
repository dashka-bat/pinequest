import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/mongoose';
import { EventModel } from '../../../../../mongodb/models/event';
export async function GET() {
  try {
    await connectToDatabase();

    const events = await EventModel.find({ type: 'birthday' });

    const today = new Date();

    const upcoming = events
      .map(event => {
        const birthday = new Date(event.date);
        birthday.setFullYear(today.getFullYear());

        if (birthday < today) {
          birthday.setFullYear(today.getFullYear() + 1);
        }

        const diffTime = birthday.getTime() - today.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
          name: event.name,
          date: birthday,
          daysLeft,
        };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft); 

    if (upcoming.length === 0) {
      return NextResponse.json({ error: 'No upcoming birthdays' }, { status: 404 });
    }

    const nearest = upcoming[0];

    return NextResponse.json({
      name: nearest.name,
      message: 'Мэндчилгээг дэвшүүлээрэй',
      daysLeft: nearest.daysLeft,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}