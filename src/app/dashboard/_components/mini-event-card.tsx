type MiniEventCardProps = {
  title: string;
  caption: string;
  date: string;
  weekday: string;
  imageUrl: string;
};

const MiniEventCard = ({ title, caption, date, weekday, imageUrl }: MiniEventCardProps) => {
  return (
    <div className="w-full max-h-[300px] min-h-[253px] bg-white rounded-[36px] p-6 flex flex-col justify-between group transition duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-[#27296D]">{title}</h3>
      </div>

      <p className="mt-4 text-base text-[#27296D] whitespace-pre-line">{caption}</p>

      <div className="mt-6 w-full h-[250px] flex items-center justify-between">
        <img
          src={imageUrl}
          alt="Event illustration"
          width={200}
          height={150}
          className="rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
        <div>
          <p className="text-2xl font-bold text-[#27296D]">{weekday}</p>
          <p className="text-lg text-[#27296D]">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default MiniEventCard;
