import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9100",
});

export async function addRoom(photo, roomType, roomPrice) {
  try {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/room/add/new-room", formData);
    console.log("success to add room");
    return response.status === 201;
  } catch (error) {
    console.log("failed to adding room", error);
    return false;
  }
}

export async function getRoomTypes() {
  try {
    const response = await api.get("/room/types");
    return response.data;
  } catch (error) {
    throw new Error("failed to fetching room types");
  }
}
