import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      code: 'LOGOUT_SUCCESS',
      message: 'Амжилттай гарлаа!',
      data: null,
    });
    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(0),
    });

    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(0),
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        code: 'LOGOUT_FAILED',
        message: 'Гарах үед алдаа гарлаа!',
        data: null,
      },
      { status: 500 }
    );
  }
}
