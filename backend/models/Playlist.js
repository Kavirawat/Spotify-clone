const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Playlist name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: 'A custom playlist curated for you.',
      trim: true,
    },
    coverUrl: {
      type: String,
      default: '/images/card1img.jpeg',
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
      },
    ],
    isCustom: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Playlist', playlistSchema);
