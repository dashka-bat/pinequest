'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormSchema, SignUpFormSchemaType } from './utils/signup-schema';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResponseType } from '@/lib/Responses';
import CustomSnackbar from '@/lib/Custom_Snackbar';

const SignupPage = () => {
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      company: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Ажилтан',
      allowPersonalData: undefined,
    },
  });

  const allow = form.watch('allowPersonalData');
  const type = form.watch('role');
  const onSubmit = async (values: SignUpFormSchemaType) => {
    const trimmed = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company?.trim(),
    };

    try {
      const res = await axios.post('/api/auth/register', trimmed);
      setResponse(res.data);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Бүртгэл амжилтгүй боллоо';
      setResponse({ success: false, code: 'COULD_NOT_CONNECT_SERVER', message, data: null });
    }
  };

  useEffect(() => {
    if (!response) return;
    const timeout = setTimeout(() => setResponse(undefined), 5000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <div className="w-full max-w-md space-y-4 flex flex-col justify-center">
      {response && <CustomSnackbar response={response} />}

      <div className="text-xl font-extrabold">Бүртгэл үүсгэх</div>
      <div className="text-[#888888] mb-4">Өөрийн хувийн мэдээлэл оруулах.</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={type === 'Админ'}
                    {...field}
                    placeholder={type === 'Админ' ? 'Шаардлагагүй!' : 'Компаны дугаар'}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={type === 'Админ' ? 'Компаны нэр' : 'Таны нэр'}
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Имэйл" type="email" autoComplete="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Нууц үг"
                    type="password"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Нууц үг ( дахин оруулах )"
                    type="password"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue placeholder="Албан тушаал" />
                    </SelectTrigger>
                    <SelectContent className="cursor-pointer">
                      {['Админ', 'Ажилтан'].map((job) => (
                        <SelectItem key={job} value={job}>
                          {job}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="allowPersonalData"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center gap-4">
                <FormLabel className="text-sm text-[#555]">
                  Хувийн мэдээлэл өгөхийг зөвшөөрч байна уу ?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(val) => field.onChange(val === 'true')}
                    defaultValue={String(field.value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem value="true" id="yes" />
                      <label htmlFor="yes">Тийм</label>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem value="false" id="no" />
                      <label htmlFor="no">Үгүй</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting || !allow}
            type="submit"
            className="w-full bg-[#00CDE2] hover:bg-[#00b8cc]"
          >
            {form.formState.isSubmitting ? 'Түр хүлээнэ үү!' : 'Бүртгүүлэх'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupPage;
