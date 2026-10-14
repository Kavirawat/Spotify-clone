const Song = require('../models/Song');

exports.getSongs = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const songs = await Song.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: songs.length, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ success: false, message: 'Song not found' });
    }
    res.json({ success: true, data: song });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

function formatDuration(ms) {
  if (!ms) return '03:30';
  const totalSecs = Math.floor(ms / 1000);
  const m = Math.floor(totalSecs / 60);
  const s = totalSecs % 60;
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

exports.searchSongs = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      const allSongs = await Song.find().limit(20);
      return res.json({ success: true, count: allSongs.length, data: allSongs });
    }

    const searchTerm = q.trim();
    const regex = new RegExp(searchTerm, 'i');

    const localSongs = await Song.find({
      $or: [{ title: regex }, { artist: regex }, { album: regex }, { category: regex }],
    });

    let externalSongs = [];
    try {
      const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(
        searchTerm
      )}&media=music&limit=25`;
      const response = await fetch(itunesUrl);
      if (response.ok) {
        const json = await response.json();
        if (json.results && Array.isArray(json.results)) {
          externalSongs = json.results
            .filter((item) => item.previewUrl && item.trackName)
            .map((item) => ({
              _id: `ext_${item.trackId}`,
              title: item.trackName,
              artist: item.artistName,
              album: item.collectionName || 'Single',
              duration: formatDuration(item.trackTimeMillis),
              durationSeconds: Math.round((item.trackTimeMillis || 200000) / 1000),
              audioUrl: item.previewUrl,
              coverUrl: (item.artworkUrl100 || '').replace('100x100bb', '600x600bb'),
              category: item.primaryGenreName ? item.primaryGenreName.toLowerCase() : 'trending',
              plays: Math.floor(Math.random() * 500000) + 100000,
            }));
        }
      }
    } catch (apiErr) {
      console.warn('External music search API error:', apiErr.message);
    }

    const seen = new Set();
    const combined = [];

    for (const song of localSongs) {
      const key = `${song.title.toLowerCase()}_${song.artist.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        combined.push(song);
      }
    }

    for (const song of externalSongs) {
      const key = `${song.title.toLowerCase()}_${song.artist.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        combined.push(song);
      }
    }

    res.json({ success: true, count: combined.length, data: combined });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json({ success: true, data: song });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

