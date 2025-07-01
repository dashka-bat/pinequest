'use client';

import useSWR from 'swr';
import axios from 'axios';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data.user);

const CurrentUser = () => {
  const { data: user, isLoading, mutate } = useSWR('/api/auth', fetcher);

  useEffect(() => {
    window.addEventListener('focus', () => {
      mutate();
    });
  }, [mutate]);

  if (isLoading) return <p className="text-sm text-gray-500">Түр хүлээнэ үү...</p>;

  return (
    <div className="flex gap-2 items-center">
      {user ? (
        <p className="text-sm font-medium">{user.email}</p>
      ) : (
        <>
          <p className="text-sm text-gray-500">Түр хүлээнэ үү...</p>
          {/* <Link href="/auth/signin">
            <Button>Нэвтрэх</Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="outline">Бүртгүүлэх</Button>
          </Link> */}
        </>
      )}
    </div>
  );
};

export default CurrentUser;
