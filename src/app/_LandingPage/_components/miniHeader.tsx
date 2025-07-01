import Image from 'next/image';

export default function MiniHeader() {
  return (
    <div className="flex relative items-center justify-between h-[66px] bg-white text-white">
      <div>
        <Image src={`/Thankly.png`} alt="logo" width={70} height={47} />
      </div>
    </div>
  );
}
