import { connectToDatabase } from '@/app/utils/mongoose';
import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NoToken,
} from '@/lib/Responses';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { userModel } from '../../../../../mongodb/models/user';

export async function GET(req: NextRequest) {
  try {
    connectToDatabase();
    if (!process.env.accessToken || !process.env.refreshToken) {
      return NextResponse_NoEnv();
    }
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) {
      return NextResponse_NoToken();
    }
    const verify = jwt.verify(accessToken, process.env.accessToken) as jwt.JwtPayload;
    const user = await userModel.findById(verify.id);
    if (!user) {
      return CustomResponse(false, 'USER_NOT_FOUND', 'Хэрэглэгч олдсонгүй!', null);
    }

    const Employees = await userModel.find({ company: user.company });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай!', { users: Employees });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
