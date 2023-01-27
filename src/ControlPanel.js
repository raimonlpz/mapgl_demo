import React from "react";
import dark from "./assets/dark.png";
import light from "./assets/light.png";
import "./ControlPanel.css";

export default function ControlPanel({ mode = "dark", onToggle }) {
  return (
    <div
      className="mode-toggler"
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "blanchedalmond",
        position: "absolute",
        margin: "1rem",
        left: "0",
        top: "0",
        borderRadius: "10px",
      }}
      onClick={onToggle}
    >
      <img
        src={mode === "dark" ? light : dark}
        alt=""
        style={{ width: "100%", height: "100%", borderRadius: "10px" }}
      />
    </div>
  );
}
