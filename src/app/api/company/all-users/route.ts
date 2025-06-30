import { connectToDatabase } from '@/app/utils/mongoose';
import { userModel } from '../../../../../mongodb/models/user';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();

    const users = await userModel.find({}, '-password'); 

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}
