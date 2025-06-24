import z from 'zod';

export const AddEventSchema = z.object({
  name: z.string().min(1, 'Нэр заавал оруулна'),
  phone: z.string().min(4, 'Утасны дугаар шаардлагатай'),
  type: z.string().min(1, 'Ангилал сонгоно уу'),
  date: z.string().min(1, 'Огноо сонгоно уу'),
});

export type AddEventSchemaType = z.infer<typeof AddEventSchema>;
