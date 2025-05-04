import { useState, useEffect } from "react";

export const MessageTab = () => {
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    fetch("api")
      .then((res) => res.json())
      // move into api file when working with backend
      .then((data) => {
        setMessageCount(data.length);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="p-[16px]">
        {" "}
        <h2 className="m-0 p-4 text-center ">Messages ({messageCount})</h2>
        {/* {message list} */}
      </div>
    </div>
  );
};
