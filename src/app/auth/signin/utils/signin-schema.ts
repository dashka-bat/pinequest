import z from 'zod';

export const SignInFormSchema = z.object({
  email: z.string().email({ message: 'Зөв имэйл хаяг оруулна уу.' }),
  password: z.string().min(8, { message: 'Нууц үг дор хаяж 8 үсэг байх ёстой!' }),
});

export type SignInFormSchemaType = z.infer<typeof SignInFormSchema>;
