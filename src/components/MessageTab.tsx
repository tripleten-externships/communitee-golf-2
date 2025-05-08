import { useState, useEffect } from "react";

export const MessageTab = () => {
  const [unreadCount, setunreadCount] = useState(0);

  useEffect(() => {
    fetch("api")
      .then((res) => res.json())
      // move into api file when working with backend
      .then((data) => {
        setunreadCount(data.length);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="p-[16px]">
        {" "}
        <h2 className="m-0 p-4 text-center ">Messages ({unreadCount})</h2>
        {/* {message list} */}
      </div>
    </div>
  );
};
