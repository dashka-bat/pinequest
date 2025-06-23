import z from 'zod';

export const SignUpFormSchema = z
  .object({
    company: z.string().optional(),
    name: z.string().min(4, { message: 'Дор хаяж 4 үсэг агуулсан байх!' }),
    email: z.string().email({ message: 'Зөв имэйл хаяг оруулна уу.' }),
    password: z.string().min(8, { message: 'Нууц үг дор хаяж 8 үсэг байх ёстой!' }),
    confirmPassword: z.string().min(8),
    role: z.enum(['Админ', 'Ажилтан'], { required_error: 'Хэрэглэгийн төрөл' }),
    allowPersonalData: z.boolean().refine((val) => val === true, {
      message: 'Бүртгүүлэхийн тулд заавал зөвшөөрөх шаардлагатай!',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Нууц үг таарсангүй!',
  })
  .refine(
    (data) => {
      if (data.role === 'Ажилтан') {
        return typeof data.company === 'string' && data.company.trim().length > 0;
      }
      return true;
    },
    {
      path: ['company'],
      message: 'Ажилтан бол компаны дугаар заавал шаардлагатай!',
    }
  );

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;
