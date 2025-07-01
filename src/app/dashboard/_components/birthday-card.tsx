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
    <div className="relative rounded-3xl p-10 w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/happy.png)' }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#FF5E5E] to-[#FFFFFF] opacity-80"></div>

      <div className="relative z-10 flex justify-between items-center text-white">
        <div className="flex items-center gap-6">
          <span className="text-6xl">🎂</span>
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold leading-snug">
              {birthday.name}-н
              <br />
              Төрсөн өдөр
            </h2>
            <p className="mt-2 text-sm">{birthday.message}</p>
          </div>
        </div>
        <div className="text-black text-2xl font-semibold">Өнөөдөр</div>
      </div>
    </div>
  );
};

export default BirthdayCard;
