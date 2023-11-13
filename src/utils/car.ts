import { prisma } from '@/lib/prisma';
import { RegisteredCar } from '@/types/car';

export async function getRegisteredCarById(
  id: string,
): Promise<RegisteredCar | null> {
  const userCar = await prisma.userCar.findUnique({
    where: { id },
    include: { car: true },
  });

  if (userCar) {
    const { car, ...rest } = userCar;

    return {
      ...rest,
      make: car.make,
      model: car.model,
      color: car.color,
      imageUrl: car.imageUrl,
    };
  } else {
    return null;
  }
}

export async function getRegisteredCars(userId: string) {
  const userCars = await prisma.userCar.findMany({
    where: {
      userId,
    },
    include: {
      car: true,
    },
  });

  return userCars.map((userCar) => {
    const { car, ...rest } = userCar;
    return {
      ...rest,
      make: car.make,
      model: car.model,
      color: car.color,
      imageUrl: car.imageUrl,
    };
  });
}
