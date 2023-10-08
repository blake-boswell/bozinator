import { sessionOptions } from '@/lib/auth';
import logger from '@/lib/pino';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { ZodError, z } from 'zod';

const schema = z.object({
  make: z.string().min(1, { message: 'Car make is required.' }),
  model: z.string().min(1, { message: 'Car model is required.' }),
  color: z.string().min(1, { message: 'Car color is required.' }),
  licensePlate: z.string().min(1, { message: 'License plate is required.' }),
});

export { schema };

export async function POST(req: Request) {
  // Check for user
  const session = await getServerSession(sessionOptions);
  if (!session?.user) {
    // Unauthorized. No user
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { user } = session;

  // Parse request body
  let body;
  try {
    body = schema.parse(await req.json());
  } catch (err) {
    logger.error(
      `Could not parse request payload while creating a new car for user ${user.id}`,
    );
    if (err instanceof ZodError) {
      return NextResponse.json({ message: err.toString() }, { status: 400 });
    } else if (err instanceof SyntaxError) {
      return NextResponse.json({ message: err.toString() });
    } else {
      return NextResponse.json(
        { message: 'Something went wrong parsing request payload.' },
        { status: 500 },
      );
    }
  }

  const { make, model, color, licensePlate } = body;

  // Create new car
  try {
    const car = await prisma.car.create({
      data: {
        make,
        model,
        color,
        licensePlateNo: licensePlate,
        userId: user.id,
      },
    });

    return NextResponse.json({ car });
  } catch (err) {
    logger.error(
      `Could not create new car for user ${session.user.id}. Car arguments: make=${make}; model=${model}; color=${color}; licensePlateNo=${licensePlate}. Error: %s`,
      err,
    );
    throw err;
  }
}
