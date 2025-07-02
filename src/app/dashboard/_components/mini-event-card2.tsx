type MiniEventCardProps = {
  title: string;
  caption: string;
  date: string;
  weekday: string;
  imageUrl1: string;
  imageUrl2: string;
};

const MiniEventCard2 = ({
  title,
  caption,
  date,
  weekday,
  imageUrl1,
  imageUrl2,
}: MiniEventCardProps) => {
  return (
    <div className="w-full max-h-[300px] min-h-[253px] bg-white rounded-[24px] p-6 flex flex-col justify-between shadow group transition duration-300">
      <div className="flex justify-between items-start mb-4">
        <img
          src={imageUrl1}
          alt="Event image 1"
          width={200}
          height={150}
          className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
        <div className="text-right ml-4">
          <p className="text-2xl font-semibold text-[#27296D]">{weekday}</p>
          <p className="text-lg text-black">{date}</p>
        </div>
      </div>

      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold text-[#27296D]">{title}</h3>
          <p className="mt-2 text-base text-[#27296D] whitespace-pre-line">{caption}</p>
        </div>
        <img
          src={imageUrl2}
          alt="Event image 2"
          className="w-[200px] h-[150px] mt-[-50px] object-contain ml-1 mb-2"
        />
      </div>
    </div>
  );
};

export default MiniEventCard2;
