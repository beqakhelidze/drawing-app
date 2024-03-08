import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { useDraw } from "@/hooks/useDraw";
import { useCallback, useEffect, useRef, useState } from "react";
import { ColorResult } from "react-color";
import { HexColorPicker } from "react-colorful";
import dynamic from "next/dynamic";
import { io, Socket } from "socket.io-client";
import { drawLine } from "@/utils";
import { useSearchParams } from "next/navigation";
import RangeSlider from "react-bootstrap-range-slider";
import Cursor from "../../assets/cursor.svg";
import Image from "next/image";
import useSubscribeSocket from "@/hooks/useSubscribeSocket";
import useSocketStore from "@/store/useSocketStore";

const SketchPicker = dynamic(
  () => import("react-color").then((mod) => mod.SketchPicker),
  { ssr: false }
);

const DrawingBoard = () => {
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  const [color, setColor] = useState<string>("#000");
  const [lineWidth, setLineWidth] = useState(3);
  const socket = useSocketStore((state) => state.socket);
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const roomName = searchParams.get("roomName");
  const [partnersMouses, setPartnerMouses] = useState<
    (Point & { partnerId: string })[]
  >([]);
  const ctx = canvasRef.current?.getContext("2d");
  
  const handleCopy = useCallback(() => {
    if (roomId === null) return;
    navigator.clipboard.writeText(roomId);
  }, [roomId]);

  useSubscribeSocket("draw.line", ({ id, line }) => {
    setPartnerMouses([
      {
        x: line.currentPoint.x,
        y: line.currentPoint.y,
        partnerId: id,
      },
    ]);
    drawLine({ ...line, ctx });
  });

  useSubscribeSocket("clear", clear);

  function createLine(line: Draw) {
    if (socket === null) return;
    socket.emit("draw.line", {
      roomId,
      line: { color, lineWidth, ...line },
    });
    drawLine({ color, lineWidth, ...line });
  }

  function clearCanvas() {
    if (socket === null) return;
    socket.emit("clear", { roomId });
    clear();
  }

  useEffect(() => {
    
  },[]);

  return (
    <>
      <div className="flex justify-center items-center mt-8 gap-4">
        <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 text-center">
          Room Name: {roomName}
        </h1>
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleCopy}
        >
          Copy Room identificator
        </button>
      </div>
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
    </>
  );
};

export default DrawingBoard;
