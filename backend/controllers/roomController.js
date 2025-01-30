const Room = require('../models/Room');

// Get all rooms
exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

// Create Room
exports.createRoom = async (req, res) => {
  const { name, description, price, availableSlots, capacity } = req.body;
  const room = new Room({ name, description, price, availableSlots, capacity });
  await room.save();
  res.status(201).json(room);
};

// Get room by id
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
