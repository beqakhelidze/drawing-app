import { createRoom, checkRoom } from "@/api/rooms";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "@/components/toast/toast";

const Main = () => {
    const router = useRouter();
    const [roomId, setRoomId] = useState("");
    const { isToastOpen, showToast } = useToast();

    const handleCreateRoomClick = async () => {
        createRoom()
            .then((id: string) => {
                router.push(id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleJoinRoomClick = () => {
        checkRoom(roomId)
            .then(() => {
                router.push(roomId);
            })
            .catch((error) => {
                showToast();
            });
    };

    return (
        <div className="min-h-screen min-w-full flex justify-center items-center">
            <div className="shadow-md max-w-screen-md w-11/12 min-h-[350px] divide-y-2 divide-black bg-zinc-200 flex justify-center items-center flex-col">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-52 m-8"
                    onClick={handleCreateRoomClick}
                >
                    Create room
                </button>
                <div className="w-52">
                    <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border mt-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter room ID"
                        autoComplete="off"
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-52 mt-3"
                        onClick={handleJoinRoomClick}
                    >
                        Join room
                    </button>
                </div>
            </div>
            <Toast
                isOpen={isToastOpen}
                type="warning"
                text="Can not find room with ID"
            />
        </div>
    );
};

export default Main;
