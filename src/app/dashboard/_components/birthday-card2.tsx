'use client';
import React, { useEffect, useState } from 'react';

type UpcomingBirthday = {
  name: string;
  daysLeft: number;
};

const UpcomingBirthdayCard = () => {
  const [upcoming, setUpcoming] = useState<UpcomingBirthday[]>([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch('/api/birthdays');
        const data = await res.json();
        setUpcoming(data.upcoming || []);
      } catch (err) {
        console.error('Error fetching upcoming birthdays:', err);
      }
    };

    fetchUpcoming();
  }, []);

  if (upcoming.length === 0) return null;

  return (
    <div className="space-y-4">
      {upcoming.map((person, index) => (
        <div
          key={index}
          className="flex justify-between items-center rounded-3xl p-10 w-full bg-gradient-to-r from-[#1980FA] to-[#E1EFFE] text-white"
        >
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-white">
              {person.name}-н
              <br />
              Төрсөн өдөр
            </h2>
            <p className="mt-2 text-sm text-white">Мэндчилгээг дэвшүүлээрэй</p>
          </div>
          <div className="text-black text-2xl font-semibold">
            {person.daysLeft} хоног
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingBirthdayCard;