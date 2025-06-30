import { connectToDatabase } from '@/app/utils/mongoose';
import { EventModel } from '../../../../mongodb/models/event';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();

    const event = await EventModel.findOne({ type: 'birthday' }).populate('user');

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: event.name,
      date: new Date(event.date).toLocaleDateString('mn-MN'),
      message: 'Мэндчилгээг дэвшүүлээрэй',
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
