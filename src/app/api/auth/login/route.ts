import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { CustomResponse, NextResponse_CatchError, NextResponse_NoEnv } from '@/lib/Responses';
import { userModel } from '../../../../../mongodb/models/user';
import { connectToDatabase } from '@/app/utils/mongoose';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    if (!process.env.accessToken || !process.env.refreshToken) {
      return NextResponse_NoEnv();
    }
    const { email, password } = await req.json();
    if (!email || !password) {
      return CustomResponse(false, 'REQUEST_FAILED', 'Мэдээлэл дутуу байна!', null);
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return CustomResponse(false, 'USER_NOT_FOUND', 'Хэрэглэгч олдсонгүй!', null);
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return CustomResponse(false, 'WRONG_CREDENTAIL', 'Нууц үг буруу байна!', null);
    }

    const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.accessToken, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.refreshToken,
      {
        expiresIn: '24h',
      }
    );

    const response = NextResponse.json({
      success: true,
      code: 'REQUEST_SUCCESS',
      message: 'Амжилттай нэвтэрлээ!',
      data: user,
    });

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60,
    });
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    });
    return response;
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
