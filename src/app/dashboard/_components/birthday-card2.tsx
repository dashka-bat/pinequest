'use client';
import React, { useEffect, useState } from 'react';

type BirthdayInfo = {
  name: string;
  message: string;
  daysLeft: number;
};

const BirthdayCard = () => {
  const [birthday, setBirthday] = useState<BirthdayInfo | null>(null);

  useEffect(() => {
    const fetchBirthday = async () => {
      const res = await fetch('/api/birthday/upcoming');
      const data = await res.json();
      setBirthday(data);
    };

    fetchBirthday();
  }, []);

  if (!birthday) return <div>Түр хүлээнэ үү...</div>;

  return (
    <div className="relative flex justify-between items-center rounded-3xl p-10 w-full bg-white text-black shadow-lg border border-gray-200">
      <div>
        <h2 className="text-3xl font-semibold leading-tight">
          {birthday.name}-н
          <br />
          Төрсөн өдөр
        </h2>
        <p className="mt-2 text-sm">{birthday.message}</p>
      </div>
      <div className="text-black text-2xl font-semibold border border-gray-300 rounded-lg p-4">
        {birthday.daysLeft === 0 ? 'Өнөөдөр' : `${birthday.daysLeft} хоног`}
      </div>
    </div>
  );
}

export default BirthdayCard;