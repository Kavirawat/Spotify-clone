const mongoose = require('mongoose');
const Playlist = require('../models/Playlist');
const Song = require('../models/Song');

exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs').sort({ createdAt: -1 });
    res.json({ success: true, count: playlists.length, data: playlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs');
    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }
    res.json({ success: true, data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPlaylist = async (req, res) => {
  try {
    const { name, description, coverUrl } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Playlist name is required' });
    }

    const playlist = await Playlist.create({
      name: name.trim(),
      description: description || 'My custom Spotify playlist',
      coverUrl: coverUrl || '/images/card1img.jpeg',
      songs: [],
      isCustom: true,
    });

    res.status(201).json({ success: true, data: playlist });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  try {
    const { songId, songData } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }

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

    if (playlist.songs.includes(targetSongId)) {
      return res.status(400).json({ success: false, message: 'Song already in playlist' });
    }

    playlist.songs.push(targetSongId);
    await playlist.save();
    const updated = await Playlist.findById(playlist._id).populate('songs');

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeSongFromPlaylist = async (req, res) => {
  try {
    const { songId } = req.params;
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }

    playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);
    await playlist.save();
    const updated = await Playlist.findById(playlist._id).populate('songs');

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }

    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

