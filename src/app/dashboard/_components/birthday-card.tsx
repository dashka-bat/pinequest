'use client';
import React from 'react';

const BirthdayCard = () => {
  return (
    <div className=" relative flex justify-between items-center rounded-3xl p-10 w-full bg-gradient-to-r from-[#FF5E5E] to-[#FFFFFF] text-white">
      <div>
        <h2 className="text-3xl font-semibold leading-tight">
          Уянгадарь-н
          <br />
          Төрсөн өдөр
        </h2>
        <p className="mt-2 text-sm">Мэндчилгээг дэвшүүлээрэй</p>
      </div>
      <div className="text-black text-2xl font-semibold">Өнөөдөр</div>{' '}
    </div>
  );
};

export default BirthdayCard;
