import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/mongoose';
import { EventModel } from '../../../../../mongodb/models/event';
import { ThanksModel } from '../../../../../mongodb/models/thanks';

export async function GET() {
  await connectToDatabase();

  const rewardEvent = await EventModel.findOne({ type: 'reward' }).sort({ startDate: -1 });

  if (!rewardEvent) {
    return NextResponse.json({ event: null });
  }

  const current = await ThanksModel.countDocuments({ event: rewardEvent._id });

  return NextResponse.json({
    event: {
      goal: rewardEvent.goal,
      current,
      rewardImage: rewardEvent.imageUrl,
      rewardName: rewardEvent.name,
      startDate: rewardEvent.startDate,
    },
  });
}
