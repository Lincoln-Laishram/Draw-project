import { FaPen } from "react-icons/fa6";
import { LuEraser } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

interface ToolsProps {
  pen: () => void;
  eraser: () => void;
}

export const Tools: React.FC<ToolsProps> = ({ pen, eraser }) => {
  const [display, setDisplay] = useState("none");

  const MenuClick = () => {
    setDisplay((prevDisplay) => (prevDisplay === "none" ? "block" : "none"));
  };

  return (
    <>
      <div className="ToolContainer">
        <button onClick={pen}>
          <FaPen />
        </button>
        <button onClick={eraser}>
          <LuEraser />
        </button>
        </div>
        <button onClick={MenuClick}>
          <GiHamburgerMenu />
        </button>
      <div
          className="menu"
          style={{
            display: display,
          }}
        >
          <label>
            <FaPen />
          </label>
          <input type="range" min="5" max="20" />
          <br />
          <label>
            <LuEraser />
          </label>
          <input type="range" min="5" max="20" />
        </div>
    </>
  );
};
