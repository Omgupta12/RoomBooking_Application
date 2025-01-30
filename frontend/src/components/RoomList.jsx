import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Available Rooms</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg">Loading rooms...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.length === 0 ? (
            <p className="col-span-full text-center text-xl text-gray-600">No rooms available.</p>
          ) : (
            rooms.map((room) => (
              <div key={room._id} className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-semibold text-blue-600">{room.name}</h3>
                <p className="text-gray-600 mt-2">{room.description}</p>
                <div className="mt-4">
                  <p className="font-semibold text-gray-800">Capacity: {room.capacity}</p>
                  <p className="font-semibold text-gray-800">Price: ₹{room.price} per hour</p>
                </div>
                <button className="bg-blue-600 text-white mt-4 px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition duration-300">
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default RoomList;

