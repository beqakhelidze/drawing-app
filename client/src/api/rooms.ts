import axios from "axios";

export async function createRoom() {
    try {
        const response = await axios.get("http://localhost:8000/create-room");
        return response.data.roomId;
    } catch (error) {
        throw error;
    }
}

export async function checkRoom(roomId: string) {
    try {
        const response = await axios.post("http://localhost:8000/check-room", {
            roomId,
        });
        console.log(response);
    } catch (error){
        throw error;
    }
}
