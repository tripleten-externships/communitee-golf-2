import jacob from "../assets/jacob.jpg";

export const MessageArea = () => {
  return (
    <div className="flex items-center p-3 bg-gray-50 rounded-2xl relative">
      <div className="relative w-12 h-12 mr-4">
        <img
          src={jacob}
          alt="avatar"
          className="w-full h-full rounded-full object-cover"
        />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          2
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="font-semibold text-gray-700">Name</h2>
        <p className="text-sm text-gray-500 truncate w-full">
          what are the rules for playing golf in terrible weather conditions?
        </p>
      </div>

      <p className="text-xs text-gray-400 ml-2 whitespace-nowrap">1h</p>
    </div>
  );
};
