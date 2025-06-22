'use client';

import { useEffect, useState } from 'react';
import { User } from '../../../mongodb/models/user';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CurrentUser = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/auth');
        if (res.data.success) {
          setUser(res.data.data.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(user);
  return (
    <div>
      {loading ? (
        'Түр хүлээнэ үү!'
      ) : user ? (
        user.email
      ) : (
        <Link href={`/auth/signin`}>
          <Button className=" cursor-pointer">Нэвтрэх/Бүртгүүлэх</Button>
        </Link>
      )}
    </div>
  );
};

export default CurrentUser;
