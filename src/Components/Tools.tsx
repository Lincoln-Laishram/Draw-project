import { FaPen } from "react-icons/fa6";
import { LuEraser } from "react-icons/lu";
import { RiShapesLine } from "react-icons/ri";
import { MdOutlineRectangle } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import { TfiLayoutLineSolid } from "react-icons/tfi";

import { useState } from "react";

interface ToolsProps {
  pen: () => void;
  eraser: () => void;
  rectangle: () => void;
  circle: () => void;
  square: () => void;
  line: () => void;
}

export const Tools: React.FC<ToolsProps> = ({ pen, eraser, rectangle, circle, square, line }) => {
  const [shapes, setShapes] = useState("none");
  const SelectShape = () => {
    setShapes((prevShape) => (prevShape === "none" ? "block" : "none"))
  }
  // const [display, setDisplay] = useState("none");

  // const MenuClick = () => {
  //   setDisplay((prevDisplay) => (prevDisplay === "none" ? "block" : "none"));
  // };

  return (
    <>
      <div className="SelectShape" style={{ display: `${shapes}` }}>
  <center>
    <div>
      <span>
        <button onClick={rectangle}>
          <MdOutlineRectangle />
        </button>
        <button onClick={circle}>
          <FaRegCircle />
        </button>
        <button onClick={square}>
          <FaRegSquare />
        </button>
        <button onClick={line}>
          <TfiLayoutLineSolid />
        </button>
      </span>
    </div>
    <br />
    <FaPen /> <input type="range" min="5" max="30" value="10" /> <br />
    <LuEraser /> <input type="range" /> <br />
    <div>
      <span>
        <button className="red"></button>
        <button className="blue"></button>
        <button className="green"></button>
        <button className="yellow"></button>
        <br />
        <button className="red"></button>
        <button className="blue"></button>
        <button className="green"></button>
        <button className="yellow"></button>
        <br />
        <input type="color" />
      </span>
    </div>
  </center>
</div>

      <div className="ToolContainer">
        <button onClick={pen}>
          <FaPen />
        </button>
        <button onClick={eraser}>
          <LuEraser />
        </button>
        <button onClick={SelectShape}>
          <RiShapesLine />
        </button>
      </div>
    </>
  );
};
