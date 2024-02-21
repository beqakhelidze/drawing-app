import axios, { AxiosError } from "axios";

export async function createRoom() {
    try {
        const response = await axios.get("http://localhost:8000/create-room");
        return response.data.roomId;
    } catch (error) {
        throw error;
    }
}

export async function checkRoom(roomId: string) {
    return axios.post("http://localhost:8000/check-room", {
            roomId,
    }).catch((error) => {
        throw error.response.data;
    });
}
