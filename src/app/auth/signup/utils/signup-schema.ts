import z from 'zod';

export const SignUpFormSchema = z
  .object({
    company: z.string().optional(),
    name: z.string().min(4, { message: 'Дор хаяж 4 үсэг агуулсан байх!' }),
    email: z.string().email({ message: 'Зөв имэйл хаяг оруулна уу.' }),
    password: z.string().min(8, { message: 'Нууц үг дор хаяж 8 үсэг байх ёстой!' }),
    confirmPassword: z.string().min(8),
    occupation: z.enum(
      ['Захирал', 'Менежер', 'Нягтлан', 'Хүний нөөц', 'Программист', 'Инженер', 'Бусад'],
      { required_error: 'Албан тушаал сонгоно уу' }
    ),
    allowPersonalData: z.boolean().refine((val) => val === true, {
      message: 'Бүртгүүлэхийн тулд заавал зөвшөөрөх шаардлагатай!',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Нууц үг таарсангүй!',
  });

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;
