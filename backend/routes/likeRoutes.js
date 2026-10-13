const express = require('express');
const router = express.Router();
const { getLikedSongs, toggleLike } = require('../controllers/likeController');

router.get('/', getLikedSongs);
router.post('/toggle', toggleLike);

module.exports = router;
