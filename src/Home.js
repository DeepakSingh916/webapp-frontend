import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/home").then((res) => {
      setMessage(res.data.message);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{message}</h2>
    </div>
  );
}

export default Home;
