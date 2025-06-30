import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/mongoose';
import { userModel } from '../../../../../../mongodb/models/user';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: 'Хэрэглэгч олдсонгүй' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Хэрэглэгч амжилттай устгагдлаа' });
  } catch (error) {
    console.error('Устгах үед алдаа:', error);
    return NextResponse.json(
      { message: 'Хэрэглэгч устгах үед алдаа гарлаа' },
      { status: 500 }
    );
  }
}