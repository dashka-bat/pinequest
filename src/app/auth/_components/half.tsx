import Image from 'next/image';

const Half = () => {
  return (
    <div className="relative w-1/2 min-h-screen flex justify-start">
      <Image src="/half.png" alt="half-side" fill className="object-contain object-left" priority />
    </div>
  );
};

export default Half;
