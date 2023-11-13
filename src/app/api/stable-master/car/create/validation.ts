import { z } from 'zod';

const schema = z.object({
  make: z.string().min(1, { message: 'Car make is required.' }),
  model: z.string().min(1, { message: 'Car model is required.' }),
  color: z.string().min(1, { message: 'Car color is required.' }),
  licensePlate: z.string().min(1, { message: 'License plate is required.' }),
});

export { schema };
