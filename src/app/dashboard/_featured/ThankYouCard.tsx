export default function ThankYouCard({ avatar, name, time, message }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex items-center mb-2">
        <img
          src={avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
      </div>
      <p className="text-sm text-gray-800 bg-gray-200 p-3 rounded-[8px]">{message}</p>
    </div>
  );
}
