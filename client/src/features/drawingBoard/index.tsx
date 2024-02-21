import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { useDraw } from "@/hooks/useDraw";
import { useEffect, useRef, useState } from "react";
import { ColorResult } from "react-color";
import { HexColorPicker } from "react-colorful";
import dynamic from "next/dynamic";
import { io, Socket } from "socket.io-client";
import { drawLine } from "@/utils";
import { useSearchParams } from "next/navigation";
import RangeSlider from "react-bootstrap-range-slider";
import Cursor from "../../assets/cursor.svg";
import Image from "next/image";

const SketchPicker = dynamic(
    () => import("react-color").then((mod) => mod.SketchPicker),
    { ssr: false }
);

const DrawingBoard = () => {
    const { canvasRef, onMouseDown, clear } = useDraw(createLine);
    const [color, setColor] = useState<string>("#000");
    const [lineWidth, setLineWidth] = useState(3);
    const socket = useRef<Socket | null>(null);
    const searchParams = useSearchParams();
    const roomId = searchParams.get("roomId");
    const [partnersMouses, setPartnerMouses] = useState<
        (Point & { partnerId: string })[]
    >([]);

    useEffect(() => {
        if (!roomId) return;
        const WS = io(`http://localhost:8000`, {
            query: {
                roomId,
            },
        });
        const ctx = canvasRef.current?.getContext("2d");
        WS.connect();
        WS.on("connect", () => {
            console.log("Socket connected");
        });

        WS.on("draw.line", ({id, line}) => {
            setPartnerMouses([
                {
                    x: line.currentPoint.x,
                    y: line.currentPoint.y,
                    partnerId: id,
                },
            ]);
            drawLine({ ...line, ctx });
        });

        WS.on("clear", clear);

        WS.on('disconnect', () => {
            console.log('socket disconnected');
        })

        socket.current = WS;
        return () => {
            WS.disconnect();
        };
    }, [canvasRef, clear, roomId, socket]);

    function createLine(line: Draw) {
        if (socket.current === null) return;
        socket.current.emit("draw.line", {
            roomId,
            line: { color, lineWidth, ...line },
        });
        drawLine({ color, lineWidth, ...line });
    }

    function clearCanvas() {
        if (socket.current === null) return;
        socket.current.emit("clear", { roomId });
        clear();
    }

    return (
        <div className=" h-screen flex justify-center items-center">
            <div className="flex justify-center items-center gap-4">
                <div className="flex flex-col gap-10">
                    <HexColorPicker color={color} onChange={setColor} />
                    <RangeSlider
                        value={lineWidth}
                        max={10}
                        min={1}
                        tooltipPlacement="top"
                        tooltipLabel={(currentValue) => `${currentValue}px`}
                        onChange={(e) => setLineWidth(Number(e.target.value))}
                    />
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={clearCanvas}
                    >
                        Clear Canvas
                    </button>
                </div>
                <div
                    style={{
                        position: "relative",
                        width: "400px",
                        height: "400px",
                    }}
                >
                    {partnersMouses.map((partnerMouse) => {
                        return (
                            <Image
                                src={Cursor}
                                key={partnerMouse.partnerId}
                                alt={""}
                                style={{
                                    position: "absolute",
                                    top: partnerMouse.y,
                                    left: partnerMouse.x,
                                }}
                            />
                        );
                    })}
                    <canvas
                        ref={canvasRef}
                        onMouseDown={onMouseDown}
                        width={400}
                        height={400}
                        className="bg-white border-2 border-black"
                    ></canvas>
                </div>
            </div>
        </div>
    );
};

export default DrawingBoard;
