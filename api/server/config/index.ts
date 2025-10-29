import { z } from 'zod';

import prodEnv from './production.env';
import testEnv from './test.env';

const envSchema = z.object({
  // standard
  env: z.enum(['production', 'test']).optional(),
  port: z.coerce.number().optional().default(8080),
  ip: z.string().optional().default('0.0.0.0'),

  NODE_ENV: z.string().min(1),
  RO_STRING: z.string().min(1),
  RW_STRING: z.string().min(1),
  UI_BASE_URL: z.string().min(1),
  AUTH_URL: z.string().min(1),
  AUTH_API_KEY: z.string().min(1),
  ENCRYPTION_SECRET: z.string().min(1),
});

const formatErrors = (
  // /** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
  errors: z.ZodFormattedError<Map<string, string>, string>
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value)
        return `${name}: ${value._errors.join(', ')}\n`;
      return null;
    })
    .filter(Boolean);

const parsedEnv = envSchema.safeParse({
  // what my env is dev, test, prod
  env: process.env.NODE_ENV,
  // Server port
  port: process.env.PORT,
  // Server IP
  ip: process.env.IP,
  // env specific fields
  ...(process.env.NODE_ENV === 'production' ? prodEnv : testEnv),
});

if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(parsedEnv.error.format())
  );
  throw new Error('Invalid environment variables');
}

export default parsedEnv.data;
