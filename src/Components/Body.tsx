import { useEffect, useState, useRef } from "react";
import { Tools } from "./Tools";
import { fabric } from "fabric";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [lineColor, setLineColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: 900,
        height: 520,
        backgroundColor: "white"
      });

      initCanvas.isDrawingMode = true;
      initCanvas.freeDrawingBrush.color = lineColor;
      initCanvas.freeDrawingBrush.width = lineWidth;
      initCanvas.selection = false;
      initCanvas.forEachObject((obj) => {
        obj.selectable = false; 
        obj.evented = false; 
      });

      initCanvas.on('object:added', (e: fabric.IEvent) => {
        if (e.target) {
          const target = e.target as fabric.Object;
          if (target.type === 'path') {
            target.selectable = false; // Disable selection for freehand drawings
            target.evented = false;    // Disable events for freehand drawings
          }
        }
      });

      initCanvas.on('mouse:up', () => {
        if (initCanvas.isDrawingMode) {
          initCanvas.isDrawingMode = true; 
          initCanvas.selection = false; 
          initCanvas.forEachObject((obj) => {
            if (obj.type !== 'path') {
              obj.selectable = true; 
              obj.evented = true;    
            }
          });
        }
      });

      setCanvas(initCanvas);

      const handleResize = () => {
        const isMobile = window.innerWidth <= 768;
        const newWidth = isMobile ? window.innerWidth - 50 : 900;
        const newHeight = isMobile ? window.innerHeight - 150 : 520;

        initCanvas.setWidth(newWidth);
        initCanvas.setHeight(newHeight);

        // Adjust objects on the canvas (optional, depending on your needs)
        initCanvas.getObjects().forEach((obj) => {
          obj.scaleX = (obj.scaleX || 1) * (newWidth / initCanvas.width!);
          obj.scaleY = (obj.scaleY || 1) * (newHeight / initCanvas.height!);
          obj.left = (obj.left || 0) * (newWidth / initCanvas.width!);
          obj.top = (obj.top || 0) * (newHeight / initCanvas.height!);
          obj.setCoords();
        });

        initCanvas.renderAll();
      };

      // Resize canvas initially and on window resize
      handleResize();
      window.addEventListener("resize", handleResize);

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
      };
    }
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.color = lineColor;
      canvas.freeDrawingBrush.width = lineWidth;
    }
  }, [lineColor, lineWidth, canvas]);

  const Pen = () => {
    if (canvas) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = lineColor;
      canvas.freeDrawingBrush.width = lineWidth;
    }
  };


  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLineColor(e.target.value);
  };

  const handleLineWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLineWidth(parseInt(e.target.value));
  };

  const Eraser = () => {
    if (canvas) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = "white";
      canvas.freeDrawingBrush.width = 30;
    }
  };

  return (
    <div  className="container">
      <center>
        <canvas ref={canvasRef} className="canvasBody"></canvas>
      </center>
      <Tools
        canvas = {canvas}
        pen={Pen}
        penColor={lineColor}
        penWidth={lineWidth}
        changeWidth={handleLineWidth}
        onColorChange={handleColorChange}
        eraser={Eraser}
      />
    </div>
  );
};
