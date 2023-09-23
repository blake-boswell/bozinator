import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { schema } from './validation';

export async function POST(req: Request) {
  try {
    // 1. Get user info
    const { email } = schema.parse(await req.json());

    // 2. Save user to the DB
    await prisma.user.create({
      data: {
        email: email.toLowerCase(),
      },
    });

    const redirectUrl = new URL('/auth/sign-in', req.url);
    return NextResponse.redirect(redirectUrl);
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      { status: 500 },
    );
  }
}
