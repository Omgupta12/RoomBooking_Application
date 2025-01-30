import { useEffect, useState, useContext } from "react";
import { fetchUserBookings, cancelBooking } from "../api/api";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");
    fetchUserBookings(token)
      .then((res) => setBookings(res.data))
      .catch(() => toast.error("Failed to fetch bookings"));
  }, [user, navigate]);

  const handleCancel = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await cancelBooking(bookingId, token);
      toast.success("Booking cancelled successfully!");
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (error) {
      toast.error("Failed to cancel booking! Try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800">Your Bookings</h1>
      
      {/* No bookings found */}
      {bookings.length === 0 ? (
        <p className="text-center text-gray-600 mt-4">You have no bookings at the moment.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">{booking.roomId.name}</h3>
              <p className="text-gray-600 mt-2">Date: {new Date(booking.date).toDateString()}</p>
              <p className="text-gray-600 mt-1">Time Slot: {booking.timeSlot}</p>
              
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Cancel Booking
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;
