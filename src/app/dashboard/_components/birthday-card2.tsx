import React from 'react';

const BirthdayCard2 = () => {
  return (
    <div className="flex justify-between items-center rounded-3xl p-10 w-full bg-gradient-to-r from-[#1980FA] to-[#E1EFFE] text-white">
      <div>
        <h2 className="text-3xl font-semibold leading-tight">
          Мөнх-Оргил-н
          <br />
          Төрсөн өдөр.
        </h2>
        <p className="mt-2 text-sm">Мэндчилгээг дэвшүүлээрэй</p>
      </div>
      <div className="text-black text-2xl font-semibold">53 Хоног</div>
    </div>
  );
};

export default BirthdayCard2;
