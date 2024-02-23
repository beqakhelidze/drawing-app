import errorHandler from "@/helpers/errorHandler";
import axios, { AxiosError } from "axios";

export async function createRoom(
  roomName: string,
  maxUsers: number,
  secured: boolean,
  password: string
) {
  try {
    const response = await axios.post("http://localhost:8000/create-room", {
      roomName,
      maxUsers,
      secured,
      password,
    });
    return response.data.roomId;
  } catch (error) {
    return errorHandler(error as AxiosError | Error);
  }
}

export async function checkRoom(roomId: string) {
  return axios
    .post("http://localhost:8000/check-room", {
      roomId,
    })
    .catch((error) => {
      throw error.response.data;
    });
}
