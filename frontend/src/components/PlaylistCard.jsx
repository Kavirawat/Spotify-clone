import React from 'react';
import { Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function PlaylistCard({ playlist, onSelect }) {
  const { playSong } = usePlayer();

  const handlePlayDirect = (e) => {
    e.stopPropagation();
    if (playlist.songs && playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    } else if (onSelect) {
      onSelect(playlist);
    }
  };

  return (
    <div className="music-card" onClick={() => onSelect && onSelect(playlist)}>
      <div className="card-cover-container">
        <img
          src={playlist.coverUrl || '/images/card1img.jpeg'}
          alt={playlist.name}
          className="card-cover"
          onError={(e) => {
            e.target.src = '/card1img.jpeg';
          }}
        />
        <button
          className="card-play-btn"
          title={`Play ${playlist.name}`}
          onClick={handlePlayDirect}
        >
          <Play size={22} fill="#000" style={{ marginLeft: '2px' }} />
        </button>
      </div>
      <h4 className="card-title">{playlist.name}</h4>
      <p className="card-desc">{playlist.description}</p>
    </div>
  );
}
