import { useEffect, useState, useRef } from "react";
import { Tools } from "./Tools";
import { fabric } from "fabric";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [currentTool, setCurrentTool] = useState("pen");

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: 1300,
        height: 550,
        backgroundColor: "#fff",
      });

      initCanvas.isDrawingMode = true;
      initCanvas.freeDrawingBrush.color = "black";
      initCanvas.freeDrawingBrush.width = 5;

      setCanvas(initCanvas);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Backspace" || e.key === "Delete") {
          e.preventDefault();
          const activeObject = initCanvas.getActiveObject();
          if (activeObject) {
            initCanvas.remove(activeObject);
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        initCanvas.dispose();
        window.removeEventListener("keydown", handleKeyDown);
      }
    }
  }, []);

  const Pen = () => {
    if (canvas) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = "black";
      canvas.freeDrawingBrush.width = 5;
      setCurrentTool("pen");
    }
  };

  const Eraser = () => {
    if (canvas) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = "#fff";
      canvas.freeDrawingBrush.width = 15;
      setCurrentTool("eraser");
    }
  };

  const Rectangle = () => {
    if (canvas) {
      const rect = new fabric.Rect({
        left: Math.floor(Math.random() * 250) + 1,
        top: Math.floor(Math.random() * 250) + 1,
        fill: "transparent",
        stroke: "black",
        strokeWidth: 1,
        strokeUniform: true,
        width: 200,
        height: 110,
      });
      canvas.isDrawingMode = false;
      canvas.add(rect);
      setCurrentTool("rectangle");
    }
  };

  const Circle = () => {
    if (canvas) {
      const circle = new fabric.Circle({
        left: Math.floor(Math.random() * 250) + 1,
        top: Math.floor(Math.random() * 250) + 1,
        fill: "transparent",
        stroke: "black",
        strokeWidth: 1,
        strokeUniform: true,
        radius: 50,
      });
      canvas.isDrawingMode = false;
      canvas.add(circle);
      setCurrentTool("circle");
    }
  }

  const Square = () => {
    if (canvas) {
      const square = new fabric.Rect({
        left: Math.floor(Math.random() * 250) + 1,
        top: Math.floor(Math.random() * 250) + 1,
        fill: "transparent",
        stroke: "black",
        strokeWidth: 1,
        strokeUniform: true,
        width: 110,
        height: 110,
      });
      canvas.isDrawingMode = false;
      canvas.add(square);
      setCurrentTool("square");
    }
  }

  const Line = () => {
    if (canvas) {
      const line = new fabric.Rect({
        left: Math.floor(Math.random() * 250) + 1,
        top: Math.floor(Math.random() * 250) + 1,
        fill: "transparent",
        stroke: "black",
        strokeWidth: 2,
        strokeUniform: true,
        width: 500,
      });
      canvas.isDrawingMode = false;
      canvas.add(line);
      setCurrentTool("rectangle");
    }
  }

  return (
    <div>
      
      <center>
        <canvas
          ref={canvasRef}
          className ="canvasBody"
        >
        </canvas>
      </center>
      <Tools
        pen={Pen}
        eraser={Eraser}
        rectangle={Rectangle}
        circle={Circle}
        square={Square}
        line={Line}
      />
    </div>
  );
};
