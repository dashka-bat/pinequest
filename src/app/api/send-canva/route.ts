import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/mongoose';
import { userModel } from '../../../../mongodb/models/user';

export async function POST(req: Request) {
  const { fromUserId, toUserId, postData } = await req.json();

  try {
    await connectToDatabase();
    await userModel.findByIdAndUpdate(toUserId, {
      $push: { receivedPosts: postData },
    });
    await userModel.findByIdAndUpdate(fromUserId, {
      $push: { sentPosts: postData },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DB алдаа:', err);
    return NextResponse.json({ success: false, message: 'DB error' }, { status: 500 });
  }
}
