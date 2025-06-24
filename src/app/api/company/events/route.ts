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
import { EventModel } from '../../../../../mongodb/models/event';

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
    const events = await EventModel.find({ company: user.company }).sort({ date: 1 });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Хүсэлт амжилттай!', { events });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    connectToDatabase();
    const { date, name, phone, type } = await req.json();

    if (!date || !name || !phone || !type) {
      return CustomResponse(false, 'REQUEST_FAILED', 'Мэдээлэл дутуу байна!', null);
    }

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
    if (!user.isAdmin) {
      return CustomResponse(false, 'INSUFFICIENT_PERMISSION', 'Эрх байхгүй', null);
    }

    const newEvent = await EventModel.create({
      name,
      type,
      date: new Date(date),
      phone: Number(phone),
      company: user.company,
      user: user._id,
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Хүсэлт амжилттай!', { event: newEvent });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
