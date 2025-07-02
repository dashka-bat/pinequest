import Image from 'next/image';

type RewardGoalCardProps = {
  goal: number;
  current: number;
  rewardImage: string;
  rewardName: string;
  date: string;
};

const RewardGoalCard = ({ goal, current, rewardImage, date, rewardName }: RewardGoalCardProps) => {
  const progressPercent = Math.min(100, (current / goal) * 100);
  const formattedDate = new Date(date).toISOString().split('T')[0];

  return (
    <div className="flex items-center space-x-4 bg-white px-3 py-0.1 rounded-lg border border-solid border-gray-100">
      <div className="flex-1">
        <p className="text-xs text-gray-600">{formattedDate}</p>
        <p className="text-xs text-gray-600">
          {goal} талархал бичвэл 1 {rewardName}
        </p>
        <p className="text-xs font-medium text-[#FF5252]">
          {current} / {goal}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1 mb-1">
          <div className="h-2 bg-[#FFBABA] rounded-full" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
      <div className="w-12 h-12 relative flex-shrink-0">
        <Image src={rewardImage} alt={rewardName} fill style={{ objectFit: 'contain' }} />
      </div>
    </div>
  );
};

export default RewardGoalCard;
