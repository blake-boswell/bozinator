import { z } from 'zod';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Can't be empty." })
    .email('Please use a valid email.'),
  password: z.string(),
});

export { schema };
