import DrawingBoard from "@/features/drawingBoard";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Room: React.FC = () => {
    const searchParams = useSearchParams();
    const roomId = searchParams.get("roomId");

    const handleCopy = useCallback(() => {
        if (roomId === null) return;
        navigator.clipboard.writeText(roomId);
    }, [roomId]);

    return (
        <>
            <div className="flex justify-center items-center mt-8 gap-4">
                <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 text-center">
                    Room id: {roomId}
                </h1>
                <button
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={handleCopy}
                >
                    Copy
                </button>
            </div>
            <DrawingBoard />
        </>
    );
};

export default Room;
