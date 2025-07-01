import { connectToDatabase } from '@/app/utils/mongoose';
import { userModel } from '../../../../../mongodb/models/user';
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const user = await userModel.findById(id).select('name email receivedPosts');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      receivedPosts: user.receivedPosts || [],
    });
  } catch (error) {
    console.error('Error fetching user received posts:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
