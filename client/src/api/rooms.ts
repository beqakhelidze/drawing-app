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
      name:roomName,
      maxUsers,
      secured,
      password,
    });
    return response.data;
  } catch (error) {
    throw errorHandler(error as AxiosError | Error);
  }
}

export async function joinRoom(roomId: string, password: string = "") {
  try {
    const response = await axios.post("http://localhost:8000/join-room", {
      id:roomId,
      password:password,
    });
    return response.data;
  } catch (error) {
    throw errorHandler(error as AxiosError | Error);
  }
}


export async function getRoomData () {
  try {
    const response = await axios.post("http://localhost:8000/room");
    return response.data;
  } catch (error) {
    throw errorHandler(error as AxiosError | Error);
  }
}