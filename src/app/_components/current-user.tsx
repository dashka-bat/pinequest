'use client';

import useSWR from 'swr';
import axios from 'axios';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
import { User } from '../../../mongodb/models/user';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const CurrentUser = () => {
  const { data, isLoading } = useSWR('/api/auth', fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  const user: User | undefined = data?.success ? data.data.user : undefined;

  if (isLoading) return <p className="text-sm text-gray-500">Түр хүлээнэ үү...</p>;

  // if (user) return <p className="text-sm font-medium">{user.email}</p>;

  return (
    <div className="flex gap-2">
      {user ? (
        <p className="text-sm font-medium">{user.email}</p>
      ) : (
        <p className="text-sm text-gray-500">Түр хүлээнэ үү...</p>
      )}
      {/* <Link href="/auth/signin">
        <Button>Нэвтрэх</Button>
      </Link>
      <Link href="/auth/signup">
        <Button variant="outline">Бүртгүүлэх</Button>
      </Link> */}
    </div>
  );
};

export default CurrentUser;
