import { UserCar, Car } from '@prisma/client';

export type RegisteredCar = UserCar &
  Pick<Car, 'color' | 'make' | 'model' | 'imageUrl'> & { carId: string };
