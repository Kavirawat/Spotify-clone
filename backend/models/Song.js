const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Song title is required'],
      trim: true,
    },
    artist: {
      type: String,
      required: [true, 'Artist name is required'],
      trim: true,
    },
    album: {
      type: String,
      default: 'Single',
      trim: true,
    },
    duration: {
      type: String,
      default: '03:30',
    },
    durationSeconds: {
      type: Number,
      default: 210,
    },
    audioUrl: {
      type: String,
      required: [true, 'Audio URL is required'],
    },
    coverUrl: {
      type: String,
      required: [true, 'Cover image URL is required'],
    },
    category: {
      type: String,
      default: 'trending',
      trim: true,
    },
    plays: {
      type: Number,
      default: 12450,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Song', songSchema);
