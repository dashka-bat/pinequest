import { connectToDatabase } from '@/app/utils/mongoose';
import { CustomResponse, NextResponse_CatchError } from '@/lib/Responses';
import { NextRequest } from 'next/server';
import { userModel } from '../../../../../../mongodb/models/user';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    connectToDatabase();

    const user = await userModel.findById(params.id).select('-password');
    if (!user) {
      return CustomResponse(false, 'USER_NOT_FOUND', 'Хэрэглэгч олдсонгүй!', null);
    }

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай!', { user });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
