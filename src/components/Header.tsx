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
    <div className="w-full h-10 flex items-center justify-between relative">
      {!isLoginPage ? (
        <button
          onClick={handleBack}
          className="w-6 h-6 flex items-center justify-center bg-transparent border-none"
        >
          <img src={headerBack} alt="Back" className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-6" />
      )}

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src={logo} alt="CommuniTee Logo" className="h-5" />
      </div>

      <button className="w-6 h-6 flex items-center justify-center bg-transparent border-none">
        <img src={closeIcon} alt="Close" className="w-6 h-6" />
      </button>
    </div>
  );
};
