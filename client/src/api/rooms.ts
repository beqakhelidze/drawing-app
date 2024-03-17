import errorHandler from "@/helpers/errorHandler";
import axios, { AxiosError } from "axios";

class RoomService {
  async createRoom(
    roomName: string,
    maxUsers: number,
    secured: boolean,
    password: string
  ) {
    try {
      const response = await axios.post("/create-room", {
        name: roomName,
        maxUsers,
        secured,
        password,
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error as AxiosError | Error);
    }
  }

  async joinRoom(roomId: string, password: string = "") {
    try {
      const response = await axios.post("/join-room", {
        id: roomId,
        password,
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error as AxiosError | Error);
    }
  }

  async getRoomData() {
    try {
      const response = await axios.get("/room");
      return response.data;
    } catch (error) {
      throw errorHandler(error as AxiosError | Error);
    }
  }
}

const roomService = new RoomService;

export default roomService;