import { NextRequest } from 'next/server';
import { userModel } from '../../../../../mongodb/models/user';
import { connectToDatabase } from '@/app/utils/mongoose';
import { CustomResponse, NextResponse_CatchError } from '@/lib/Responses';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { company, name, email, password, allowPersonalData, role } = await req.json();
    await connectToDatabase();
    if (!name || !email || !password || !allowPersonalData || !role) {
      return CustomResponse(false, 'REQUEST_FAILED', 'Мэдээлэл дутуу байна!', null);
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return CustomResponse(false, 'REQUEST_FAILED', 'Майл бүртгэлтэй байна!', null);
    }
    const hashedPass = await bcrypt.hash(password, 10);

    if (company) {
      const FindCompany = await userModel.findOne({ company });
      if (!FindCompany) {
        return CustomResponse(false, 'REQUEST_FAILED', 'Компани олдсонгүй!', null);
      }
      const newUser = await userModel.create({
        company,
        name,
        email,
        password: hashedPass,
        allowPersonalData,
        role,
      });
      return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай бүртгэгдлээ!', { newUser });
    }

    const companyId = Math.floor(Math.random() * 89999 + 10000);
    const newUser = await userModel.create({
      isAdmin: true,
      name,
      email,
      password: hashedPass,
      allowPersonalData,
      company: companyId,
      role,
    });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай бүртгэгдлээ!', { newUser });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
