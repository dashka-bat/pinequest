type MiniEventCardProps = {
  title: string;
  caption: string;
  date: string;
  weekday: string;
  imageUrl: string;
};

const MiniEventCard = ({ title, caption, date, weekday, imageUrl }: MiniEventCardProps) => {
  return (
    <div className="w-full max-h-[300px] min-h-[253px] bg-white rounded-[36px] p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-black">{title}</h3>
      </div>

      <p className="mt-4 text-base text-[#1D2745] whitespace-pre-line">{caption}</p>

      <div className="mt-6 w-full h-[250px] overflow-hidden flex items-center justify-between">
        <img
          src={imageUrl}
          alt="Event illustration"
          width={200}
          height={150}
          className="rounded-lg"
        />
        <div className="">
          <p className="text-2xl font-bold text-black mt-15">{weekday}</p>
          <p className="text-lg text-black">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default MiniEventCard;
