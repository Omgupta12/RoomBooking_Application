import axios from "axios";

const API = axios.create({
  baseURL: "https://roombooking-backend-lzlb.onrender.com/api",
});

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const fetchRooms = () => API.get("/rooms");
export const fetchRoomDetails = (roomId) => API.get(`/rooms/${roomId}`);
export const createBooking = (bookingData, token) =>
  API.post("/bookings", bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchUserBookings = (token) =>
  API.get("/bookings", { headers: { Authorization: `Bearer ${token}` } });

export const cancelBooking = (bookingId, token) =>
  API.delete(`/bookings/${bookingId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchAvailableSlots = (roomId, date) =>
  API.get(`/bookings/available-slots/${roomId}/${date}`);
