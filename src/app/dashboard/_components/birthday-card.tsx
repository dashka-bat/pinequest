'use client';
import { useRef } from 'react';
import confetti from 'canvas-confetti';

type BirthdayData = {
  name: string;
  message: string;
};

const BirthdayCard = ({ birthday }: { birthday: BirthdayData }) => {
  console.log('BirthdayCard rendered with:', birthday);
  const hasFired = useRef(false);

  const handleConfetti = () => {
    if (!hasFired.current) {
      hasFired.current = true;

      const fire = (x: number, y: number, angle: number) => {
        confetti({
          particleCount: 150,
          spread: 120,
          startVelocity: 45,
          angle,
          origin: { x, y },
          scalar: 1.5,
          colors: ['#FF5252', '#FFD700', '#5EDFFF', '#B57EDC', '#7FFF7F'],
        });
      };

      fire(0.3, 0.7, 60);
      fire(0.5, 0.5, 90);
      fire(0.7, 0.7, 120);

      setTimeout(() => {
        hasFired.current = false;
      }, 2000);
    }
  };

  return (
    <div
      className="relative rounded-3xl p-10 w-full overflow-hidden group transition-all cursor-pointer hover:shadow-xl"
      onMouseEnter={handleConfetti}
    >
      <div className="absolute right-64 inset-0 z-0">
        <img src="/happy.png" className="w-full h-full object-cover" />
      </div>
      <div className="absolute left-30 inset-0 z-0">
        <img src="/happy.png" className="w-full h-full object-cover" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#FF5E5E] to-[#FF5E5E]/15"></div>

      <div className="relative z-10 flex justify-between items-center text-white">
        <div className="flex items-center gap-6">
          <span className="text-6xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">🎂</span>
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
