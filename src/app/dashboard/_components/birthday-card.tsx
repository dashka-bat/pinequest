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
      <div className="absolute right-64 inset-0 z-0">
        <img src="/happy.png" className="w-full h-full object-cover" />
      </div>
      <div className="absolute left-30 inset-0 z-0">
        {' '}
        <img src="/happy.png" className="w-full h-full object-cover" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF5E5E] to-[#FF5E5E]/15"></div>

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
        <div className="text-white text-3xl font-semibold">Өнөөдөр</div>
      </div>
    </div>
  );
};

export default BirthdayCard;
