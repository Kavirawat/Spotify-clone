const express = require('express');
const router = express.Router();
const {
  getSongs,
  getSongById,
  searchSongs,
  createSong,
} = require('../controllers/songController');

router.get('/', getSongs);
router.get('/search', searchSongs);
router.get('/:id', getSongById);
router.post('/', createSong);

module.exports = router;
