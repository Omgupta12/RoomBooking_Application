import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-xl font-bold">Room Booking</Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/bookings" className="text-white">My Bookings</Link>
            <div className="flex items-center text-white">
              <FaUserCircle className="text-2xl mr-2" />
              <span>{user.username}</span>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white px-4">Login</Link>
            <Link to="/register" className="text-white px-4">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


