import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { schema } from './validation';
import logger from '@/lib/pino';

export async function POST(req: Request) {
  try {
    // 1. Get user info
    const { email } = schema.parse(await req.json());

    // 2. Save user to the DB
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
      },
    });

    logger.debug(
      `Successfully registered a new user with the email: ${email}. Saved under user ID ${user.id}`,
    );

    const redirectUrl = new URL('/auth/sign-in', req.url);
    return NextResponse.redirect(redirectUrl);
  } catch (error: unknown) {
    let errorMsg = '';
    if (typeof error === 'string') {
      errorMsg = error;
    } else if (
      typeof error === 'object' &&
      error &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      errorMsg = error.message;
    }

    if (errorMsg) {
      logger.error(`Failed to register a new user. ${errorMsg}`);
    } else {
      logger.error(`Failed to register a new user. Error info: %o`, error);
    }

    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: errorMsg,
      }),
      { status: 500 },
    );
  }
}
