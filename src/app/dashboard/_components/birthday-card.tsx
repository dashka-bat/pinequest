'use client';
import React, { useEffect, useState } from 'react';

type BirthdayToday = {
  name: string;
  email?: string;
};

const BirthdayCard = () => {
  const [birthdaysToday, setBirthdaysToday] = useState<BirthdayToday[]>([]);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const res = await fetch('/api/birthdays');
        const data = await res.json();
        setBirthdaysToday(data.today || []);
      } catch (err) {
        console.error('Error fetching birthdays:', err);
      }
    };

    fetchBirthdays();
  }, []);

  if (birthdaysToday.length === 0) return null;

  return (
    <div className="space-y-4">
      {birthdaysToday.map((person, index) => (
        <div
          key={index}
          className="relative flex justify-between items-center rounded-3xl p-10 w-full bg-gradient-to-r from-[#FF5E5E] to-[#FFFFFF] text-white"
        >
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-white">
              {person.name}-н
              <br />
              Төрсөн өдөр
            </h2>
            <p className="mt-2 text-sm text-white">Мэндчилгээг дэвшүүлээрэй</p>
          </div>
          <div className="text-black text-2xl font-semibold">Өнөөдөр</div>
        </div>
      ))}
    </div>
  );
};

export default BirthdayCard;