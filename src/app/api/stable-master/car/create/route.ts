import { sessionOptions } from '@/lib/auth';
import logger from '@/lib/pino';
import { prisma } from '@/lib/prisma';
import { RegisteredCar } from '@/types/car';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { schema } from './validation';

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
      return NextResponse.json(
        { message: err.message, validationErrors: err.issues },
        { status: 400 },
      );
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

  try {
    // See if car exists
    const car = await prisma.car.findUnique({
      where: {
        make_model_color: {
          make,
          model,
          color,
        },
      },
    });
    let carId = '';
    let imageUrl: string | null = null;

    if (car) {
      carId = car.id;
      imageUrl = car.imageUrl;
    } else {
      // Create new car
      const newCar = await prisma.car.create({
        data: {
          make,
          model,
          color,
          imageUrl: `/public/${make}/${model}/${color}-${make}-${model}.png`,
        },
      });
      carId = newCar.id;
      imageUrl = newCar.imageUrl;
    }

    // Create new user owned car
    const userCar = await prisma.userCar.create({
      data: {
        licensePlateNo: licensePlate,
        carId,
        userId: user.id,
      },
    });

    const newCar: RegisteredCar = {
      id: userCar.id,
      carId: userCar.carId,
      userId: userCar.userId,
      make,
      model,
      color,
      imageUrl,
      licensePlateNo: licensePlate,
    };

    return NextResponse.json({ car: newCar });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (
        err.message.includes('Unique constraint failed') ||
        err.code === 'P2002'
      ) {
        return NextResponse.json(
          { message: 'You have already created this car.' },
          { status: 409 },
        );
      } else {
        return NextResponse.json({ message: err.message }, { status: 500 });
      }
    } else {
      logger.error(
        `Could not create new car for user ${session.user.id}. Car arguments: make=${make}; model=${model}; color=${color}; licensePlateNo=${licensePlate}. Error: %s`,
        err,
      );
      return NextResponse.json(
        { message: err?.toString() ?? 'Could not create car.' },
        { status: 500 },
      );
    }
  }
}
