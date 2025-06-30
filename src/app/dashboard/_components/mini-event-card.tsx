type MiniEventCardProps = {
  title: string;
  caption: string;
  date: string;
  imageUrl: string;
};

const MiniEventCard = ({ title, date, imageUrl }: MiniEventCardProps) => {
  return (
    <div className="w-full max-w-2xl bg-white p-6 flex flex-col justify-between rounded-3xl  text-black shadow-lg border border-gray-200">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-black">{title}</h3>
        <span className="text-lg text-black">{date}</span>
      </div>

      <p className="mt-4 text-base text-[#1D2745] whitespace-pre-line">Нэг үдшийг хамтдаа зугаатай өнгөөрцгээе ✨</p>

      <div className="mt-6">
        <img
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
