import React, { useState } from "react";
import closeIcon from "../assets/close.png";
import logo from "../assets/CGlogo.svg";

export const ForgotPassword: React.FC = () => {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      setStatus("error");

      console.log("username is required");
    }

    setStatus("");

    fetch("http://localhost:8080/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || "Something went wrong.");
          });
        }
        return res.json();
      })
      .then(() => {
        setStatus("success");
        setUsername("");
        console.log("Email has been sent.");
      })
      .catch((err) => {
        setStatus("error");

        console.log(err.message || "Failed to send reset email.");
      });
  };

  const borderColor =
    status === "error"
      ? "border-red-500"
      : status === "success"
      ? "border-green-500"
      : "border-[#959494]";

  const textColor = username ? "text-black" : "text-[#959494]";

  return (
    <div className="w-screen h-screen flex justify-start items-start bg-[#f5f5f5] p-4">
      <div className="w-[336px] h-[595px] rounded-2xl border border-[#dedede] shadow-lg p-5 relative flex flex-col items-center">
        <button className="absolute top-5 right-5 w-6 h-6 flex items-center justify-center bg-transparent border-none">
          <img src={closeIcon} alt="Close" className="w-6 h-6" />
        </button>

        <div className="mt-1 mb-20 flex justify-center items-center">
          <img
            src={logo}
            alt="CommuniTee Logo"
            className="w-[152px] h-[20px]"
          />
        </div>

        <form onSubmit={handleReset} className="w-full flex flex-col">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl text-base font-poppins border ${borderColor} ${textColor}`}
          />

          {status && (
            <p
              className={`text-xs ${
                status === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status === "success"
                ? "A reset link has been sent to your email."
                : "Please enter your username."}
            </p>
          )}

          <button
            type="submit"
            className="bg-[#FF3130] text-white px-4 py-3 rounded-xl font-semibold text-base hover:bg-[#e12b2b] transition-colors mt-2"
          >
            Reset
          </button>
        </form>

        <div className="mt-4 text-sm text-black text-center">
          <a href="#" className="font-medium hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};
