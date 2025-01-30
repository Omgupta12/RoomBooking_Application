import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRoomDetails } from "../api/api";
import BookingForm from "../components/BookingForm";
import CalendarComponent from "../components/Calender";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchRoomDetails(id).then((res) => setRoom(res.data));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      {room ? (
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-8 max-w-3xl w-full">
          <div className="flex flex-col items-center space-y-6">       
            <div className="w-full text-center">
              <h1 className="text-4xl font-semibold text-gray-800">{room.name}</h1>
              <p className="text-gray-600 mt-4">{room.description}</p>
              <p className="text-blue-600 font-bold text-xl mt-6">₹{room.price} per hour</p>
            </div>
          </div>

          {/* Calendar for Date Selection */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Select a Date</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CalendarComponent onDateSelect={setSelectedDate} />
            </div>
          </div>

          {/* Booking Form Section */}
          {selectedDate && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Booking Form</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <BookingForm roomId={room._id} selectedDate={selectedDate} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-xl">
          Loading room details...
        </div>
      )}
    </div>
  );
};

export default RoomDetails;




