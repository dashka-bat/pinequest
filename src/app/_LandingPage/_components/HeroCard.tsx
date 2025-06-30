'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

type ShapeCardProps = {
  image: string;
  text: string;
  shape: 'pentagon' | 'star' | 'triangle' | 'hexagon';
  bgColor: string;
  delay?: number;
  position: string; // Tailwind position classes like 'top-10 left-20'
};

function ShapeCard({
  image,
  text,
  shape,
  bgColor,
  delay = 0,
  position,
}: ShapeCardProps) {
  const clipPaths = {
    pentagon: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
    star: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
    triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
    hexagon: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
  };

  return (
    <motion.div
      className={`absolute ${position} flex flex-col items-center justify-center p-4 shadow-2xl`}
      style={{
        clipPath: clipPaths[shape],
        backgroundColor: bgColor,
        width: '180px',
        height: '180px',
      }}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src={image}
        alt="Shape image"
        width={70}
        height={70}
        className="rounded-full"
      />
      <p className="mt-2 text-white text-sm text-center font-semibold">{text}</p>
    </motion.div>
  );
}

export default function HeroShapes() {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-white">
      {/* Shapes */}
      <ShapeCard
        image="/cake.jpg"
        text="Төрсөн өдрийн мэнд хүргэе 🥳"
        shape="pentagon"
        bgColor="#FBBF24"
        position="top-10 left-10"
      />
      <ShapeCard
        image="/gift.jpg"
        text="Чи үнэхээр гайхалтай шүү 👏"
        shape="star"
        bgColor="#F472B6"
        position="top-20 right-20"
        delay={1}
      />
      <ShapeCard
        image="/congrats.jpg"
        text="Амжилт хүсье 🎉"
        shape="triangle"
        bgColor="#60A5FA"
        position="bottom-20 left-20"
        delay={2}
      />
      <ShapeCard
        image="/hug.jpg"
        text="Хүчтэй байгаарай 🤗"
        shape="hexagon"
        bgColor="#34D399"
        position="bottom-10 right-40"
        delay={3}
      />

      {/* Hero Content */}
      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Талархал бичье
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Хүн бүрийн сэтгэлийг чөлөөтэй илэрхийлэх орон зай.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-full text-lg">
          Start my page
        </button>
      </motion.div>
    </div>
  );
}
