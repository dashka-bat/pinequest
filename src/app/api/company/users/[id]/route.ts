import type { NextRequest } from 'next/server';
import { connectToDatabase } from '@/app/utils/mongoose';
import { CustomResponse, NextResponse_CatchError } from '@/lib/Responses';
import mongoose from 'mongoose';
import { userModel } from '../../../../../../mongodb/models/user';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();

    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return CustomResponse(false, 'INVALID_ID', 'ID буруу байна!', null);
    }

    const user = await userModel.findById(id).select('-password').lean();
    if (!user) {
      return CustomResponse(false, 'USER_NOT_FOUND', 'Хэрэглэгч олдсонгүй!', null);
    }

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай!', { user });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
