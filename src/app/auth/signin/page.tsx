'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResponseType } from '@/lib/Responses';
import CustomSnackbar from '@/lib/Custom_Snackbar';
import { SignInFormSchema, SignInFormSchemaType } from './utils/signin-schema';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const [response, setResponse] = useState<ResponseType>();
  const router = useRouter();
  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInFormSchemaType) => {
    const trimmed = { ...values, email: values.email.trim() };
    try {
      const res = await axios.post('/api/auth/login', trimmed);
      setResponse(res.data);
      if (res.data.success) router.push('/dashboard');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Нэвтрэх амжилтгүй боллоо';
      setResponse({ success: false, code: 'COULD_NOT_CONNECT_SERVER', message, data: null });
    }
  };

  useEffect(() => {
    if (!response) return;
    const timeout = setTimeout(() => setResponse(undefined), 5000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <div className="w-[340px] flex flex-col items-start justify-center space-y-3">
      {response && <CustomSnackbar response={response} />}
      <div className="text-2xl font-bold">Нэвтрэх</div>
      <div className="text-base text-gray-500">Өөрийн хувийн мэдээлэл оруулах.</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Имэйл"
                    type="email"
                    className="w-full bg-[#EFF3F5] stroke-0 border-none  h-[43px]"
                  />
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
                    className="w-full bg-[#EFF3F5] stroke-0 border-none  h-[43px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            type="submit"
            className="w-full bg-[#00CDE2] hover:bg-[#00b8cc] text-white"
          >
            {form.formState.isSubmitting ? 'Түр хүлээнэ үү!' : 'Нэвтрэх'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
