import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    axios.get("http://localhost:5000/ping")
      .then(res => setMsg(res.data))
      .catch(() => setMsg("Backend not connected"));
  }, []);

  return (
    <div style={{ padding: "40px", fontSize: "24px" }}>
      Backend says: {msg}
    </div>
  );
}

export default App;
