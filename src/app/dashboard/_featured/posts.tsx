'use client';

import { useState } from 'react';
import ThankYouCard from './ThankYouCard';


export default function GratitudePage() {
  const [activeTab, setActiveTab] = useState('Карт');

  const thankYous = [
    {
      avatar: '/placeholder-pfp.png',
      name: 'Болормаа',
      time: '1 цагийн өмнө',
      message:
        'Төслийн турш хамтран ажиллаад үнэхээр зүгээр ажилдаа шаргуу, тууштай байсан шүү <3',
    },
    {
      avatar: 'https://github.com/shadcn.png',
      name: 'Болд-Эрдэнэ',
      time: '1 цагийн өмнө',
      message: 'Төрсөн өдрийн мэнд хүргэе Хулан "Чи үнэхээр хөөрхөн шүү 🥰"',
    },
    {
      avatar: 'https://github.com/shadcn.png',
      name: 'Шинэцэцэг',
      time: '4 цагийн өмнө',
      message:
        'Аливаа зүйлийг сэтгэлээсээ хийж байгаа чинь сэтгэл үнэхээр хүрсэн шүү.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8  mt-[85px]">
      <h1 className="text-2xl font-semibold p-[12px] w-auto h-[45px] mb-[16px] ">Ирсэн талархалууд</h1>
      <div className='min-h-[700px] w-auto bg-gray-100 rounded-[8px] p-[12px] mb-[16px]'>
      <div className="flex mb-6 border rounded-[8px] overflow-hidden min-w-[808px] max-w-[1400px] h-[40px] items-center justify-around bg-[#FFEBEB]">
        {['Карт', 'Бэлэн загвар', 'Зураг болон бичлэг'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-sm font-medium transition-colors  w-[248px] h-[28px] flex items-center justify-center rounded-[8px] gap-[20px] ${
              activeTab === tab
                ? 'bg-white text-black'
                : 'bg-[#FFEBEB] text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === 'Карт' && (
        <div>
          <div className="mb-4">
            
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {thankYous.map((card, idx) => (
              <ThankYouCard key={idx} {...card} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Бэлэн загвар' && (
        <div>
          <div className="mb-4">
           
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className=" p-4 rounded shadow bg-white flex items-center justify-center">
              <img src="/template1.svg" alt="бэлэн загвар" className='bg-background'/>
            </div>
            <div className="bg-white p-4 rounded shadow flex items-center justify-center">
              <img src="/template2.svg" alt="бэлэн загвар" className='bg-background'/>
            </div>
            <div className="bg-white p-4 rounded shadow flex items-center justify-center">
              <img src="/template3.svg" alt="бэлэн загвар" className='bg-background'/>
            </div>
            <div className="bg-white p-4 rounded shadow flex items-center justify-center">
              <img src="/template4.svg" alt="бэлэн загвар" className='bg-background'/>
            </div>
            <div className="bg-white p-4 rounded shadow flex items-center justify-center">
              <img src="/template5.svg" alt="бэлэн загвар" className='bg-background'/>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Зураг болон бичлэг' && (
        <div>
          <div className="mb-4">
           
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <img src="/bicleg1.png" alt="Зураг" className="w-full h-auto rounded" />
            </div>
            <div className="bg-white p-4 rounded shadow">
              <img src="/bicleg2.png" alt="Зураг" className="w-full h-auto rounded" />
            </div>
          </div>
        </div>
      )}</div>

    </div>
  );
}
