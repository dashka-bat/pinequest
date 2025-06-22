import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NoToken,
} from '@/lib/Responses';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { userModel } from '../../../../mongodb/models/user';
import { connectToDatabase } from '@/app/utils/mongoose';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    if (!process.env.accessToken || !process.env.refreshToken) {
      return NextResponse_NoEnv();
    }
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) {
      return NextResponse_NoToken();
    }
    const verified = jwt.verify(accessToken, process.env.accessToken) as { id: string };
    const user = await userModel.findById(verified.id);
    if (!user) {
      return CustomResponse(false, 'USER_NOT_FOUND', 'Хэрэглэгч олдсонгүй!', null);
    }
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Хүсэлт амжилттай!', { user });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
