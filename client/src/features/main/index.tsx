import { createRoom, checkRoom } from "@/api/rooms";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateRoom from "./createRoom";

enum Tabs {
  CREATE_ROOM = "createRoom",
  JOIN_ROOM = "joinRoom",
}

const Main = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const { isToastOpen, showToast, toastText } = useToast();
  const [activeTab, setActiveTab] = useState("joinRoom");

  const handleJoinRoomClick = () => {
    checkRoom(roomId)
      .then(() => {
        router.push(roomId);
      })
      .catch((error) => {
        showToast(error.message);
      });
  };

  const handleTabChange = (tab: Tabs) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center min-w-96 items-center h-screen">
      <div className="p-6 shadow-md max-w-screen-md w-12/12 min-h-[350px]  bg-zinc-200 flex justify-center items-center flex-col">
        <div className="flex space-x-4">
          <button
            className={`rounded py-2 px-4 text-white ${
              activeTab === "joinRoom"
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => handleTabChange(Tabs.JOIN_ROOM)}
          >
            Join Room
          </button>
          <button
            className={`rounded py-2 px-4 text-white ${
              activeTab === "createRoom"
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => handleTabChange(Tabs.CREATE_ROOM)}
          >
            Create Room
          </button>
        </div>

        <hr className="my-4 w-full border-black" />

        {activeTab === "joinRoom" && (
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
              Join
            </button>
          </div>
        )}

        {activeTab === "createRoom" && <CreateRoom />}
      </div>
    </div>
  );
};

export default Main;
