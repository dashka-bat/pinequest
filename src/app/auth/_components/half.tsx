import Image from 'next/image';

const Half = () => {
  return (
    <div className="relative w-1/2 min-h-screen hidden xl:flex justify-start">
      <Image src="/Banner.png" alt="half-side" fill className="object-cover" priority />
    </div>
  );
};

export default Half;
