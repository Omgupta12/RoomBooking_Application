const express = require('express');
const { getRooms, createRoom, getRoomById } = require('../controllers/roomController');
const router = express.Router();

router.get('/', getRooms);
router.post('/', createRoom);
router.get("/:id", getRoomById);

module.exports = router;
