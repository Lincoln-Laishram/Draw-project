import { FaPen } from "react-icons/fa6";
import { LuEraser } from "react-icons/lu";
import { RiShapesLine } from "react-icons/ri";
import { Rectangle, Square, Circle, Line } from "./Functions";
import { fabric } from "fabric";
import { useState } from "react";

interface ToolsProps {
  canvas: fabric.Canvas | null;
  pen: () => void;
  penColor: string;
  penWidth: number;
  onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  
  eraser: () => void;
  changeWidth: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

export const Tools: React.FC<ToolsProps> = ({ canvas, pen, penColor, penWidth, changeWidth, onColorChange, eraser }) => {
  const [shapes, setShapes] = useState("none");
  const [tool, setTool] = useState(-50)
  const [color, setColor] = useState("none")
  const SelectShape = () => {
    setShapes((prevShape) => (prevShape === "none" ? "block" : "none"))
  }
  const IBtn = () => {
    setTool((prevTool) => (prevTool === -50 ?100 : -50));
    setShapes("none");
  };
  
  return (
    <>
  <div className="SelectShape" style={{ display: `${shapes}` }}>
  <center>
    <div>
      <span>
      <Rectangle
        canvas={canvas}
        lineColor={penColor}
        lineWidth={penWidth}
      />        
      <Square
        canvas={canvas}
        lineColor={penColor}
        lineWidth={penWidth}
      />
      <Circle
        canvas={canvas}
        lineColor={penColor}
        lineWidth={penWidth}
      />  
      <Line
        canvas={canvas}
        lineColor={penColor}
        lineWidth={penWidth}
      />
      </span>
    </div>
    <br />
    <FaPen /> <input type="range" min="5" max="30" value={penWidth} onChange={changeWidth}/> <br />
    <div>
      <span>     
         <input type="color" value={penColor} onChange={onColorChange} />
      </span>
    </div>
  </center>
</div>

      <div className="ToolContainer" style={{transform:`translateY(${tool}px)`}}>
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
      <center>
      <button className="ipadBtn" onClick={IBtn}>
      </button>
      </center>
    
    </>
  );
};
