'use client';

import { useState } from 'react';
import ThankYouCard from './ThankYouCard';


export default function GratitudePage() {
  const [activeTab, setActiveTab] = useState('Карт');

  const thankYous = [
    {
      avatar: '/avatar1.jpg',
      name: 'Болормаа',
      time: '9 минутын өмнө',
      message:
        'Төслийн турш хамтран ажиллаад үнэхээр зүгээр ажилдаа шаргуу, тууштай байсан шүү <3',
    },
    {
      avatar: '/avatar2.jpg',
      name: 'Болд-Эрдэнэ',
      time: '9 минутын өмнө',
      message: 'Төрсөн өдрийн мэнд хүргэе Хулан "Чи үнэхээр хөөрхөн шүү 🥰"',
    },
    {
      avatar: '/avatar3.jpg',
      name: 'Шинэцэцэг',
      time: '9 минутын өмнө',
      message:
        'Аливаа зүйлийг сэтгэлээсээ хийж байгаа чинь сэтгэл үнэхээр хүрсэн шүү.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold p-[12px] w-auto h-[45px] mb-[16px] mt-[45px]">Ирсэн талархалууд</h1>
      <div className="flex mb-6 border rounded-[8px] overflow-hidden w-[808px] h-[40px]  justify-between bg-[#FFEBEB]">
        {['Карт', 'Бэлэн загвар', 'Зураг болон бичлэг'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-sm font-medium transition-colors ${
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
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700">Бэлэн загвар 1</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700">Бэлэн загвар 2</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700">Бэлэн загвар 3</p>
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
              <p className="text-gray-700">Зураг болон бичлэг 1</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700">Зураг болон бичлэг 2</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700">Зураг болон бичлэг 3</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
