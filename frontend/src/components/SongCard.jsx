import React from 'react';
import { Play, Pause } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function SongCard({ song, songList = [] }) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();

  const isCurrent = currentSong && currentSong._id === song._id;

  const handleClick = (e) => {
    e.stopPropagation();
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(song, songList);
    }
  };

  return (
    <div
      className={`music-card ${isCurrent ? 'is-active' : ''}`}
      onClick={handleClick}
    >
      <div className="card-cover-container">
        <img
          src={song.coverUrl || '/images/card1img.jpeg'}
          alt={song.title}
          className="card-cover"
          onError={(e) => {
            e.target.src = '/card1img.jpeg';
          }}
        />
        <button className="card-play-btn" onClick={handleClick}>
          {isCurrent && isPlaying ? (
            <Pause size={22} fill="#000" />
          ) : (
            <Play size={22} fill="#000" style={{ marginLeft: '2px' }} />
          )}
        </button>
      </div>
      <h4 className="card-title" title={song.title}>
        {song.title}
      </h4>
      <p className="card-desc" title={song.artist}>
        {song.artist}
      </p>
    </div>
  );
}
