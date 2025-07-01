'use client';
import React, { useEffect, useState } from 'react';

type BirthdayData = {
  name: string;
  date: string;
  message: string;
};

const BirthdayCard = () => {
  const [birthday, setBirthday] = useState<BirthdayData | null>(null);

  useEffect(() => {
    const fetchBirthday = async () => {
      const res = await fetch('/api/birthday');
      const data = await res.json();
      setBirthday(data);
    };

    fetchBirthday();
  }, []);

  if (!birthday) return <div>Түр хүлээнэ үү...</div>;

  return (
    <div className="relative flex justify-between items-center rounded-3xl p-10 w-full bg-gradient-to-r from-[#FF5E5E] to-[#FFFFFF] text-white">
      <div className="flex flex-col">
        <h2 className="text-3xl font-semibold leading-tight">
          {birthday.name}-н
          <br />
          Төрсөн өдөр
        </h2>
        <p className="mt-2 text-sm">{birthday.message}</p>
      </div>
      <div className="text-black text-2xl font-semibold">Өнөөдөр</div>
    </div>
  );
};

export default BirthdayCard;
