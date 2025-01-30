import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-semibold text-blue-700">{room.name}</h2>
      <p className="text-gray-600 mt-2">{room.description}</p>
      <div className="mt-4">
        <p className="text-gray-800 font-semibold">Price: ₹{room.price} per hour</p>
        <p className="text-gray-800 font-semibold">Capacity: {room.capacity}</p>
      </div>
      <Link
        to={`/rooms/${room._id}`}
        className="bg-blue-600 text-white px-6 py-3 mt-4 inline-block rounded-lg text-center w-full hover:bg-blue-700 transition duration-300"
      >
        View Details
      </Link>
    </div>
  );
};

export default RoomCard;
