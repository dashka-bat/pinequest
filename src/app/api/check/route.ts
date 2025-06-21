import { NextRequest, NextResponse } from 'next/server';
import { userModel } from '../../../../mongodb/models/user';
import { connectToDatabase } from '@/app/utils/mongoose';

export async function POST(req: NextRequest) {
  const { name, password } = await req.json();
  await connectToDatabase();
  if (!name || !password) return;
  const newUser = await userModel.create({ name, password });
  return NextResponse.json({ newUser });
}
