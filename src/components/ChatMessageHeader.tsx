import placeholder from "../assets/placeholder.png";
import backbutton from "../assets/backbtn.svg";
import { User } from "../types";

type ChatHeaderProps = {
  user: User;
  onBack?: () => void;
};

export const ChatMessageHeader = ({ user, onBack }: ChatHeaderProps) => {
  return (
    <div>
      <div className="flex justify-between items-end">
        {" "}
        <img
          className="cursor-pointer"
          alt="back-button"
          src={backbutton}
          onClick={onBack}
        ></img>
        <img
          className="w-9 h-9 rounded-full mx-auto"
          alt={user.name}
          src={user.avatar || placeholder}
        ></img>
      </div>
      <h2 className="text-base text-center pt-2 font-custom">
        {user.name || "Mary Jane"}
      </h2>
    </div>
  );
};
