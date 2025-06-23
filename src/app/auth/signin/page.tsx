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

const SignupPage = () => {
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
    const trimmed = {
      ...values,
      email: values.email.trim(),
    };

    try {
      const res = await axios.post('/api/auth/login', trimmed);
      setResponse(res.data);
      if (res.data.success) {
        router.push('/dashboard');
      }
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
    <div className="w-full max-w-md space-y-4">
      {response && <CustomSnackbar response={response} />}

      <div className="text-xl font-extrabold">Нэвтрэх</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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

          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            type="submit"
            className="w-full bg-[#00CDE2] hover:bg-[#00b8cc]"
          >
            {form.formState.isSubmitting ? 'Түр хүлээнэ үү!' : 'Нэвтрэх'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupPage;
