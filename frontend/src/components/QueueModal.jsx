import React from 'react';
import { X, Play, Music } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function QueueModal({ isOpen, onClose }) {
  const { currentSong, queue, queueIndex, playSong } = usePlayer();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Playback Queue</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {currentSong && (
          <div>
            <h4 style={{ fontSize: '0.85rem', color: '#b3b3b3', marginBottom: '8px' }}>
              Now Playing
            </h4>
            <div className="playlist-item active">
              <img
                src={currentSong.coverUrl || '/images/card1img.jpeg'}
                alt={currentSong.title}
                className="playlist-thumb"
              />
              <div className="playlist-meta">
                <span className="name" style={{ color: 'var(--spotify-green)' }}>
                  {currentSong.title}
                </span>
                <span className="info">{currentSong.artist}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '12px' }}>
          <h4 style={{ fontSize: '0.85rem', color: '#b3b3b3', marginBottom: '8px' }}>
            Next in Queue ({queue.length} songs)
          </h4>
          <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {queue.map((song, idx) => {
              const isCurrent = idx === queueIndex;
              return (
                <div
                  key={`${song._id}-${idx}`}
                  className={`playlist-item ${isCurrent ? 'active' : ''}`}
                  onClick={() => playSong(song, queue)}
                >
                  <img
                    src={song.coverUrl || '/images/card1img.jpeg'}
                    alt={song.title}
                    className="playlist-thumb"
                  />
                  <div className="playlist-meta" style={{ flex: 1 }}>
                    <span className="name" style={{ color: isCurrent ? 'var(--spotify-green)' : '#fff' }}>
                      {song.title}
                    </span>
                    <span className="info">{song.artist}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>
                    {song.duration || '03:30'}
                  </span>
                </div>
              );
            })}
          </div>
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

