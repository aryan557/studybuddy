import { useEffect, useState } from "react";

function ModeSwitch() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      style={{
        background: dark ? "#222" : "#fff",
        color: dark ? "#ffd700" : "#2a5298",
        border: "1.5px solid #2a5298",
        borderRadius: 20,
        padding: "8px 18px",
        fontSize: 22,
        marginLeft: 18,
        cursor: "pointer",
        boxShadow: dark ? "0 2px 12px #0002" : "0 2px 12px #2a529822",
        transition: "all 0.3s"
      }}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}

export default ModeSwitch; 