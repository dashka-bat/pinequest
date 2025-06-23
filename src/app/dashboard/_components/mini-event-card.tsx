import Image from 'next/image';

type MiniEventCardProps = {
  title: string;
  caption: string;
  date: string;
  imageUrl: string;
};

const MiniEventCard = ({ title, caption, date, imageUrl }: MiniEventCardProps) => {
  return (
    <div className="w-full max-w-2xl bg-[#D6E6EE] rounded-[36px] p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-black">{title}</h3>
        <span className="text-lg text-black">{date}</span>
      </div>

      <p className="mt-4 text-base text-[#1D2745] whitespace-pre-line">{caption}</p>

      <div className="mt-6">
        <Image
          src={imageUrl}
          alt="Event illustration"
          width={300}
          height={150}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default MiniEventCard;
