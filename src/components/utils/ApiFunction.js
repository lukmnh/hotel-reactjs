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

export async function getAllRooms() {
  try {
    const response = await api.get("/room/all-rooms");
    return response.data;
  } catch (error) {
    throw new Error("failed to fetching rooms");
  }
}

export async function deleteRoom(roomId) {
  try {
    const response = await api.delete(`/room/delete/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to delete room with id ${roomId}: ${error.message}`
    );
  }
}

export async function updateRoom(id, roomData) {
  try {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);
    const response = await api.put(`/room/update/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update room with id ${id}: ${error.message}`);
  }
}

export async function getRoomById(id) {
  try {
    const response = await api.get(`/room/getRoomById/${id}`);
    console.log(response.data);
    if (response.status !== undefined) {
      return response.data;
    }
  } catch (error) {
    throw new Error(`Failed to get room with id ${id}: ${error.message}`);
  }
}
