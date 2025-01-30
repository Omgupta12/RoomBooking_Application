import { useEffect, useState } from "react";
import { fetchRooms } from "../api/api";
import RoomCard from "../components/RoomCard";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    fetchRooms().then((res) => setRooms(res.data));
  }, []);

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase()) &&
    (priceFilter ? room.price <= priceFilter : true)
  );

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Available Rooms</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search rooms..."
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <select
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">Filter by Price</option>
            <option value="500">Under ₹500</option>
            <option value="1000">Under ₹1000</option>
            <option value="2000">Under ₹2000</option>
            <option value="5000">Under ₹5000</option>
          </select>
        </div>
      </div>

      {/* Room Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => <RoomCard key={room._id} room={room} />)
        ) : (
          <p className="text-center text-gray-600 col-span-full">No rooms match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
