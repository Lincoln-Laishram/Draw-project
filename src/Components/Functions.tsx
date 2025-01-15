import { fabric } from "fabric"

/* ICONS */
import { MdOutlineRectangle } from "react-icons/md";
import { FaRegSquare } from "react-icons/fa";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { FaRegCircle } from "react-icons/fa";

interface RectangleProps {
    canvas: fabric.Canvas | null;
    lineColor: string;
    lineWidth: number;
}
interface SquareProps {
    canvas: fabric.Canvas | null;
    lineColor: string;
    lineWidth: number;
}
interface CircleProps {
    canvas: fabric.Canvas | null;
    lineColor: string;
    lineWidth: number;
}
interface LineProps {
    canvas: fabric.Canvas | null;
    lineColor: string;
    lineWidth: number;
}
export const Rectangle: React.FC<RectangleProps> = ({ canvas, lineColor, lineWidth}) => {
    const handleRectangle = () => {
      if (canvas) {
        const rect = new fabric.Rect({
          left: Math.floor(Math.random() * 250) + 1,
          top: Math.floor(Math.random() * 250) + 1,
          fill: "transparent",
          stroke: lineColor,
          strokeWidth: lineWidth,
          strokeUniform: true,
          width: 200,
          height: 110,
        });
        canvas.isDrawingMode = false;
        canvas.add(rect);
      }
    };
  
    return (
      <button onClick={handleRectangle}>
        <MdOutlineRectangle/> 
      </button>
    );
  };
  export const Square: React.FC<SquareProps> = ({ canvas, lineColor, lineWidth}) => {
    const Square = () => {
        if (canvas) {
          const square = new fabric.Rect({
            left: Math.floor(Math.random() * 250) + 1,
            top: Math.floor(Math.random() * 250) + 1,
            fill: "transparent",
            stroke: lineColor,
            strokeWidth: lineWidth,
            strokeUniform: true,
            width: 110,
            height: 110
          });
          canvas.isDrawingMode = false;
          canvas.add(square);
        }
      };
  
    return (
      <button onClick={Square}>
        <FaRegSquare/> 
      </button>
    );
  };

  export const Circle: React.FC<CircleProps> = ({ canvas, lineColor, lineWidth}) => {
    const Circle = () => {
        if (canvas) {
          const circle = new fabric.Circle({
            left: Math.floor(Math.random() * 250) + 1,
            top: Math.floor(Math.random() * 250) + 1,
            fill: "transparent",
            stroke: lineColor,
            strokeWidth: lineWidth,
            strokeUniform: true,
            radius: 50
          });
          canvas.isDrawingMode = false;
          canvas.add(circle);
        }
      };
  
    return (
      <button onClick={Circle}>
        <FaRegCircle/> 
      </button>
    );
  };
  export const Line: React.FC<LineProps> = ({ canvas, lineColor, lineWidth}) => {
   const Line = () => {
       if (canvas) {
         const square = new fabric.Rect({
           left: Math.floor(Math.random() * 250) + 1,
           top: Math.floor(Math.random() * 250) + 1,
           fill: "transparent",
           stroke: lineColor,
           strokeWidth: lineWidth,
           strokeUniform: true,
           width: 210,
         });
         canvas.isDrawingMode = false;
         canvas.add(square);
       }
     };
  
    return (
      <button onClick={Line}>
        < TfiLayoutLineSolid /> 
      </button>
    );
  };
