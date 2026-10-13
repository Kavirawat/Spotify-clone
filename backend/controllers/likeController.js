const mongoose = require('mongoose');
const LikedSong = require('../models/LikedSong');
const Song = require('../models/Song');

// GET all liked songs
exports.getLikedSongs = async (req, res) => {
  try {
    const likes = await LikedSong.find().populate('song').sort({ createdAt: -1 });
    const validSongs = likes.filter((l) => l.song != null).map((l) => l.song);
    res.json({ success: true, count: validSongs.length, data: validSongs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle like / unlike a song (supports both existing MongoDB songs & external search tracks)
exports.toggleLike = async (req, res) => {
  try {
    const { songId, songData } = req.body;
    let targetSongId = songId;

    if (!mongoose.Types.ObjectId.isValid(targetSongId)) {
      if (songData) {
        let existing = await Song.findOne({
          title: songData.title,
          artist: songData.artist,
        });
        if (!existing) {
          existing = await Song.create({
            title: songData.title,
            artist: songData.artist,
            album: songData.album || 'Single',
            duration: songData.duration || '03:30',
            durationSeconds: songData.durationSeconds || 210,
            audioUrl: songData.audioUrl,
            coverUrl: songData.coverUrl,
            category: songData.category || 'trending',
          });
        }
        targetSongId = existing._id;
      } else {
        return res.status(400).json({ success: false, message: 'Invalid song ID' });
      }
    }

    const song = await Song.findById(targetSongId);
    if (!song) {
      return res.status(404).json({ success: false, message: 'Song not found' });
    }

    const existing = await LikedSong.findOne({ song: targetSongId });
    if (existing) {
      await LikedSong.findByIdAndDelete(existing._id);
      return res.json({
        success: true,
        isLiked: false,
        songId: targetSongId,
        message: 'Removed from Liked Songs',
      });
    } else {
      await LikedSong.create({ song: targetSongId });
      return res.json({
        success: true,
        isLiked: true,
        songId: targetSongId,
        song,
        message: 'Added to Liked Songs',
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
