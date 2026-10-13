import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';

export default function AddToPlaylistModal({ song, isOpen, onClose }) {
  const { playlists, addSongToPlaylist } = usePlaylist();
  const [successId, setSuccessId] = useState(null);

  if (!isOpen || !song) return null;

  const handleAdd = async (playlistId) => {
    const success = await addSongToPlaylist(playlistId, song._id, song);
    if (success) {
      setSuccessId(playlistId);
      setTimeout(() => {
        setSuccessId(null);
        onClose();
      }, 700);
    } else {
      alert('This song is already in this playlist!');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add to Playlist</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#b3b3b3' }}>
          Select a playlist for <b style={{ color: '#fff' }}>{song.title}</b>:
        </p>

        <div style={{ maxHeight: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {playlists.map((pl) => (
            <div
              key={pl._id}
              className="playlist-item"
              onClick={() => handleAdd(pl._id)}
              style={{ justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={pl.coverUrl || '/images/card1img.jpeg'}
                  alt={pl.name}
                  className="playlist-thumb"
                  onError={(e) => {
                    e.target.src = '/card1img.jpeg';
                  }}
                />
                <div className="playlist-meta">
                  <span className="name">{pl.name}</span>
                  <span className="info">{pl.songs?.length || 0} songs</span>
                </div>
              </div>
              {successId === pl._id && <Check size={18} color="var(--spotify-green)" />}
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="badge-btn dark" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
