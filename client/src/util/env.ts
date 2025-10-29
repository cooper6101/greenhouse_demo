import { z } from 'zod';

const clientEnv = z.object({
  VITE_BASE_URL: z.string().url(),
  VITE_DEVELOPMENT_MODE: z.string(),
  VITE_AUTH_URL: z.string().url(),
});

const validateEnv = <T extends z.ZodType>(
  env: Record<string, string>,
  schema: T
): z.infer<T> => {
  const envParse = schema.safeParse(env);

  if (!envParse.success) {
    const error = envParse.error.flatten().fieldErrors;
    console.error('🤮 Invalid environment variables', error);
    // throw new Error(
    //   `🤮 Invalid environment variables ${JSON.stringify(error)}`
    // );
    return {} as z.infer<T>;
  }

  return envParse.data;
};

export const env = validateEnv((import.meta as any).env, clientEnv);
