import RoomsService from "@/api/rooms";
import router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");

  const handleJoinRoomClick = async () => {
    RoomsService.joinRoom(roomId, password)
      .then((data: { id: string; token: string }) => {
        localStorage.setItem("token", data.token);
        router.push(data.id);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="w-52">
      <input
        type="text"
        id="join-id"
        className="bg-gray-50 border mt-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter room ID"
        autoComplete="off"
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        id="join-password"
        className="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter password (optional)"
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-52 mt-6"
        onClick={handleJoinRoomClick}
      >
        Join
      </button>
    </div>
  );
};

export default JoinRoom;
