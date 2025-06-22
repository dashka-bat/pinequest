import { NextResponse } from 'next/server';

export const CustomResponse = (
  success: boolean,
  code: string,
  message: string,
  data: any
): NextResponse => {
  return NextResponse.json({
    success,
    code,
    message,
    data,
  });
};

export const NextResponse_CatchError = (error: unknown): NextResponse => {
  return NextResponse.json({
    success: false,
    code: 'ERROR',
    message: `${error instanceof Error ? error.message : `Серверийн алдаа`}`,
    data: null,
  });
};

export const NextResponse_NoEnv = (): NextResponse => {
  return NextResponse.json({
    success: false,
    code: 'NO_ENV',
    message: `Серверийн тохиргооны алдаа!`,
    data: null,
  });
};

export const NextResponse_NoToken = (): NextResponse => {
  return NextResponse.json({
    success: false,
    code: 'NO_TOKEN',
    message: `Хэрэглэгч нэвтрээгүй байна!`,
    data: null,
  });
};

export type ResponseType = {
  success: false;
  code: string;
  message: string;
  data: any;
};
