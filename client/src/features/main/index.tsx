import { createRoom, checkRoom } from "@/api/rooms";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "@/components/toast/toast";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import passwordGenerator from 'password-generator'; // Importing the LockClosedIcon from HeroIcons

const Main = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const { isToastOpen, showToast, toastText } = useToast();
  const [activeTab, setActiveTab] = useState("joinRoom");
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

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
        showToast(error.message);
      });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const togglePasswordProtection = () => {
    setIsPasswordProtected(!isPasswordProtected);
  };

  const generatePassword = () => {
    const newPassword = passwordGenerator(12, false, /[\w\d]/,); // Logic to generate a password
    setPassword(newPassword);
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
            onClick={() => handleTabChange("joinRoom")}
          >
            Join Room
          </button>
          <button
            className={`rounded py-2 px-4 text-white ${
              activeTab === "createRoom"
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => handleTabChange("createRoom")}
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

        {activeTab === "createRoom" && (
          <div className="w-52">
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border mt-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter room name"
              autoComplete="off"
              onChange={(e) => setRoomId(e.target.value)}
            />
            <div className="flex items-center mb-4 mt-2">
              <input
                type="checkbox"
                id="passwordProtection"
                className="mr-2"
                checked={isPasswordProtected}
                onChange={togglePasswordProtection}
              />
              <label htmlFor="passwordProtection">Password Protect Room</label>
            </div>
            {isPasswordProtected && (
              <label className="relative text-gray-400 focus-within:text-gray-600 block">
                <input
                  type="text"
                  id="password"
                  className="bg-gray-50 border pr-11 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute rounded-e-lg top-1/2 transform -translate-y-1/2 right-0 mr-0 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={generatePassword}
                >
                  <FingerPrintIcon className="pointer-events-none z-50 h-5 w-5 text-gray-400 fill-white" />
                </button>
              </label>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-52 mt-3"
              onClick={handleCreateRoomClick}
            >
              Create
            </button>
          </div>
        )}
        <Toast isOpen={isToastOpen} type="warning" text={toastText} />
      </div>
    </div>
  );
};

export default Main;
