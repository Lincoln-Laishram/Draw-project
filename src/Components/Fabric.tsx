import React, { useRef, useState, useEffect } from "react";
import { fabric } from "fabric";
export const Fab = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        backgroundColor: "#fff",
      });

      setCanvas(initCanvas);  
      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  const addRectangle = () => {
    if (canvas) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "transparent",
        stroke: "black",
        strokeWidth: 1,
        width: 100,
        height: 50,
      });

      canvas.add(rect);
    }
  };

  return (
    <div className="App">
      <canvas ref={canvasRef} />
      <button onClick={addRectangle}>Add Rectangle</button>
    </div>
  );
};

