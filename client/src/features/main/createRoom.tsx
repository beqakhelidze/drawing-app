import passwordGenerator from "password-generator";
import { useState } from "react";
import { FingerPrintIcon, UserIcon } from "@heroicons/react/24/solid";
import { createRoom } from "@/api/rooms";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateRoom = () => {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [maxUsers, setMaxUsers] = useState(3);
  const [isSecured, setIsSecured] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordProtection = () => {
    setIsSecured(!isSecured);
    setPassword("");
  };

  const generatePassword = () => {
    const newPassword = passwordGenerator(12, false, /[\w\d]/); // Logic to generate a password
    setPassword(newPassword);
  };

  const handleCreateRoomClick = async () => {
    createRoom(roomName, maxUsers, isSecured, password)
      .then((data: { id: string; token: string }) => {
        localStorage.setItem("token", data.token);
        router.push(data.id);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="w-52 flex flex-col items-center	">
      <input
        type="text"
        id="create-name"
        className="bg-gray-50 border mt-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter room name"
        autoComplete="off"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />

      <div className="relative flex items-center max-w-[11rem] mt-4">
        <button
          type="button"
          id="decrement-button"
          onClick={() => {
            setMaxUsers(Math.max(2, maxUsers - 1));
          }}
          data-input-counter-decrement="bedrooms-input"
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="max-users-input"
          data-input-counter
          data-input-counter-min="1"
          data-input-counter-max="5"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          value={maxUsers}
          onChange={() => {}}
          required
        />
        <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
          <UserIcon className="w-4" />
          <span>Max users</span>
        </div>
        <button
          type="button"
          id="increment-button"
          onClick={() => {
            setMaxUsers(Math.min(15, maxUsers + 1));
          }}
          data-input-counter-increment="bedrooms-input"
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center mb-4 mt-4">
        <input
          type="checkbox"
          id="password-protection"
          className="mr-2"
          checked={isSecured}
          onChange={togglePasswordProtection}
        />
        <label htmlFor="passwordProtection">Password Protect Room</label>
      </div>

      {isSecured && (
        <label className="relative text-gray-400 focus-within:text-gray-600 block">
          <input
            type="text"
            id="password"
            className="bg-gray-50 border pr-11 mt-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
  );
};

export default CreateRoom;
