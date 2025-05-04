// import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.png";
import backbutton from "../assets/backbtn.svg";
// import { useState } from "react";

export const ChatMessageHeader = () => {
  // const [user, setUser] = useState({ name: "", avatar: "" });
  // const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between">
        {" "}
        <img
          className=""
          alt="back-button"
          src={backbutton}
          // onClick={() => navigate(-1)}
        ></img>
        <img
          className="w-9 h-9 rounded-full mx-auto"
          alt="avatar"
          src={placeholder}
        ></img>
        {/* {message list} */}
      </div>
      <h2 className="text-center">Name</h2>
    </div>
  );
};
