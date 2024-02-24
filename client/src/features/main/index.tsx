import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";

enum Tabs {
  CREATE_ROOM = "createRoom",
  JOIN_ROOM = "joinRoom",
}

const Main = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const { isToastOpen, showToast, toastText } = useToast();
  const [activeTab, setActiveTab] = useState("joinRoom");

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

        {activeTab === "joinRoom" && <JoinRoom />}

        {activeTab === "createRoom" && <CreateRoom />}
      </div>
    </div>
  );
};

export default Main;
