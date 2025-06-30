import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NoToken,
} from '@/lib/Responses';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { userModel } from '../../../../mongodb/models/user';
import { NoteModel } from '../../../../mongodb/models/note';
import { connectToDatabase } from '@/app/utils/mongoose';

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
      return NextResponse.json({
        success: false,
        message: 'Хэрэглэгч олдсонгүй!',
        code: 'USER_NOT_FOUND',
        data: null,
      });
    }

    const notes = await NoteModel.find({ company: user.company }).populate('user');
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай', { notes });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    connectToDatabase();
    const { x, y, text, color } = await req.json();

    if (!process.env.accessToken || !process.env.refreshToken) {
      return NextResponse_NoEnv();
    }
    if (!x || !y || !text || !color) {
      return CustomResponse(false, 'LACK_OF_INFO', 'Мэдээлэл дутуу байна!', null);
    }
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) {
      return NextResponse_NoToken();
    }
    const verify = jwt.verify(accessToken, process.env.accessToken) as jwt.JwtPayload;
    console.log('JWT Verify Result:', verify);
    const user = await userModel.findById(verify.id);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Хэрэглэгч олдсонгүй!',
        code: 'USER_NOT_FOUND',
        data: null,
      });
    }

    const newNote = await NoteModel.create({
      positionX: x,
      positionY: y,
      text,
      color: color,
      user: verify.id,
      company: user.company,
    });
    console.log('New Note Created:', newNote);

    const populated = await NoteModel.findById(newNote._id).populate('user');
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай нэмэгдлээ!', { newNote: populated });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    connectToDatabase();
    const id = req.nextUrl.searchParams.get('id');
    const { x, y, stamp } = await req.json();  // stamp нэмлээ

    if (!id) {
      return CustomResponse(false, 'LACK_OF_INFO', 'Мэдээлэл дутуу байна!', null);
    }

    if ((x !== undefined && typeof x !== 'number') || (y !== undefined && typeof y !== 'number')) {
      return CustomResponse(false, 'INVALID_TYPE', 'x, y нь тоон утга байх ёстой', null);
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
      return NextResponse.json({
        success: false,
        message: 'Хэрэглэгч олдсонгүй!',
        code: 'USER_NOT_FOUND',
        data: null,
      });
    }

    const note = await NoteModel.findById(id);
    if (note?.company !== user.company) {
      return CustomResponse(false, 'NO_PERMISSION', 'Эзэмшигч биш!', null);
    }

    // Шинэ update объектыг бүрдүүлэх
    const updateFields: any = {};
    if (x !== undefined) updateFields.positionX = x;
    if (y !== undefined) updateFields.positionY = y;
    if (stamp !== undefined) updateFields.stamp = stamp;

    const updateNote = await NoteModel.findByIdAndUpdate(id, updateFields, { new: true }).populate('user');

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай', { updateNote });
  } catch (eerr) {
    return NextResponse_CatchError(eerr);
  }
}


export async function PUT(req: NextRequest) {
  try {
    connectToDatabase();
    const id = req.nextUrl.searchParams.get('id');
    const { text } = await req.json();
    if (!text) {
      return CustomResponse(false, 'LACK_OF_INFO', 'Мэдээлэл дутуу байна!', null);
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
      return NextResponse.json({
        success: false,
        message: 'Хэрэглэгч олдсонгүй!',
        code: 'USER_NOT_FOUND',
        data: null,
      });
    }
    const note = await NoteModel.findById(id);
    if (note?.company !== user.company) {
      return CustomResponse(false, 'NO_PERMISSION', 'Эзэмшигч биш!', null);
    }
    const updateNote = await NoteModel.findByIdAndUpdate(id, { text }, { new: true }).populate(
      'user'
    );
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай', { updateNote });
  } catch (eerr) {
    return NextResponse_CatchError(eerr);
  }
}
