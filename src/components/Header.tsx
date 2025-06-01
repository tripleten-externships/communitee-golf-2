import closeIcon from "../assets/close.png";
import logo from "../assets/logo.png";
import headerBack from "../assets/headerBack.png";

interface HeaderProps {
  isLoginPage: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoginPage, onBack }) => {
  const handleBack = () => {
    onBack?.();
  };

  return (
    <div className="w-full h-[20px] px-5 relative flex items-center justify-center ">
      {!isLoginPage && (
        <button
          onClick={handleBack}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-transparent border-none"
        >
          <img src={headerBack} alt="Back" className="w-6 h-6" />
        </button>
      )}

      <div className="flex justify-center items-center">
        <img src={logo} alt="CommuniTee Logo" className="h-5" />
      </div>

      <button className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-transparent border-none">
        <img src={closeIcon} alt="Close" className="w-6 h-6" />
      </button>
    </div>
  );
};
