// import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.png";
import backbutton from "../assets/backbtn.svg";
// import { useState } from "react";
import { useEffect, useState } from "react";

export const ChatMessageHeader = () => {
  const [user, setUser] = useState({ name: "", avatar: "" });
  // const navigate = useNavigate();

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        setUser({
          name: data.name,
          avatar: data.avatarUrl,
        });
      })
      .catch((err) => {
        console.error("Failed to load user", err);
        setUser({
          name: "Unknown User",
          avatar: "",
        });
      });
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        {" "}
        <img
          className="cursor-pointer"
          alt="back-button"
          src={backbutton}
          // onClick={}
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
