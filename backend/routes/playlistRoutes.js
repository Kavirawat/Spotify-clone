const express = require('express');
const router = express.Router();
const {
  getPlaylists,
  getPlaylistById,
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
} = require('../controllers/playlistController');

router.get('/', getPlaylists);
router.post('/', createPlaylist);
router.get('/:id', getPlaylistById);
router.post('/:id/songs', addSongToPlaylist);
router.delete('/:id/songs/:songId', removeSongFromPlaylist);
router.delete('/:id', deletePlaylist);

module.exports = router;
