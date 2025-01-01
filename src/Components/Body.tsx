import { useEffect, useState, useRef } from "react";
import { Tools } from "./Tools";

export const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startX, setX] = useState(0);
    const [startY, setY] = useState(0);
    const [currentTool, setCurrentTool] = useState("pen");
    const [color, setColor] = useState("black");
    const [lineWidth, setLineWidth] = useState(5);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
    }, [color, lineWidth]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!ctxRef.current) return;
        setIsDrawing(true);
        setX(e.nativeEvent.offsetX);
        setY(e.nativeEvent.offsetY);
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !ctxRef.current) return;
        const ctx = ctxRef.current;

        if (currentTool === "pen") {
            ctx.strokeStyle = color;
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            setX(e.nativeEvent.offsetX);
            setY(e.nativeEvent.offsetY);
            ctx.stroke();
        } else if (currentTool === "eraser") {
            ctx.strokeStyle = "white"; // Eraser color
            ctx.lineWidth = 15; // Eraser width
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            setX(e.nativeEvent.offsetX);
            setY(e.nativeEvent.offsetY);
            ctx.stroke();
        }
    };

    const endDraw = () => {
        if (!ctxRef.current) return;
        setIsDrawing(false);
        ctxRef.current.closePath();
    };

    const Pen = () => {
        setCurrentTool("pen");
        setColor("black");
        setLineWidth(5);
    }
    const Eraser = () => {
        setCurrentTool("eraser");
        setColor("white");
        setLineWidth(15);
    }

    return (
        <>
            <div style={{overflow:"hidden"}}>
                <center>
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseUp={endDraw}
                        onMouseMove={draw}
                        style={{
                            borderRadius: "2%", boxShadow: "0px 0px 5px 1px black"
                        }}
                        width={1400}
                        height={650}
                    />
                </center>
                <Tools
                    pen={Pen}
                    eraser={Eraser}
                />
            </div>
        </>
    );
};
