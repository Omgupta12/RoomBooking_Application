import { useState, useEffect, useContext } from "react";
import { fetchAvailableSlots, createBooking } from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const BookingForm = ({ roomId, selectedDate }) => {
  const [timeSlot, setTimeSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(roomId, selectedDate)
        .then((res) => setAvailableSlots(res.data.availableSlots))
        .catch(() => toast.error("Failed to load available slots"));
    }
  }, [selectedDate, roomId]);

  const handleBooking = async () => {
    if (!user) {
      toast.error("You must be logged in to book a room!");
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!selectedDate) {
        toast.warning("Please select a date first.");
        return;
      }
      if (!timeSlot) {
        toast.warning("Please select a time slot.");
        return;
      }
      await createBooking({ roomId, date: selectedDate, timeSlot }, token);
      toast.success("Booking successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h3 className="text-2xl font-semibold text-gray-800 text-center">Select a Time Slot</h3>
      
      <div>
        <label htmlFor="timeSlot" className="block text-gray-700 font-medium mb-2">Choose a Time Slot</label>
        <select
          id="timeSlot"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        >
          <option value="">Select Slot</option>
          {availableSlots.length > 0 ? (
            availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))
          ) : (
            <option value="" disabled>No slots available</option>
          )}
        </select>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-3 w-full rounded-lg hover:bg-blue-700 transition duration-200"
        onClick={handleBooking}
      >
        Book Now
      </button>

      {!availableSlots.length && (
        <p className="text-center text-gray-600 text-sm mt-4">
          No available slots for the selected date. Please try another date.
        </p>
      )}
    </div>
  );
};

export default BookingForm;
