import React from 'react';
import { Play, Heart, Clock } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';

export default function LikedSongs() {
  const { likedSongs, toggleLike } = usePlaylist();
  const { playSong, currentSong } = usePlayer();

  const handlePlayAll = () => {
    if (likedSongs.length > 0) {
      playSong(likedSongs[0], likedSongs);
    }
  };

  return (
    <div>
      {/* Banner */}
      <div
        className="playlist-banner"
        style={{
          background: 'linear-gradient(180deg, #450af5 0%, var(--bg-surface) 100%)',
        }}
      >
        <div
          style={{
            width: '190px',
            height: '190px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, #450af5, #8e8ee5, #c4efd9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
          }}
        >
          <Heart size={80} fill="#fff" color="#fff" />
        </div>
        <div className="playlist-banner-info">
          <span className="playlist-banner-type">Playlist</span>
          <h1 className="playlist-banner-title">Liked Songs</h1>
          <p className="playlist-banner-desc">Your favorite saved songs</p>
          <div className="playlist-banner-meta">
            <span>Spotify User</span>
            <span>•</span>
            <span>{likedSongs.length} songs</span>
          </div>
        </div>
      </div>

      <div className="content-body">
        {/* Play Button */}
        {likedSongs.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <button
              className="play-pause-circle"
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: 'var(--spotify-green)',
              }}
              onClick={handlePlayAll}
              title="Play Liked Songs"
            >
              <Play size={26} fill="#000" style={{ marginLeft: '4px' }} />
            </button>
          </div>
        )}

        {/* Songs List */}
        {likedSongs.length > 0 ? (
          <table className="song-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>Title</th>
                <th>Album</th>
                <th style={{ width: '80px' }}>
                  <Clock size={16} />
                </th>
                <th style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {likedSongs.map((song, idx) => {
                const isCurrent = currentSong?._id === song._id;
                return (
                  <tr
                    key={song._id}
                    className={`song-row ${isCurrent ? 'active' : ''}`}
                    onClick={() => playSong(song, likedSongs)}
                  >
                    <td>{idx + 1}</td>
                    <td>
                      <div className="song-cell-title">
                        <img
                          src={song.coverUrl || '/images/card1img.jpeg'}
                          alt={song.title}
                          className="song-cell-thumb"
                        />
                        <div className="song-cell-text">
                          <span className="main-text">{song.title}</span>
                          <span className="sub-text">{song.artist}</span>
                        </div>
                      </div>
                    </td>
                    <td>{song.album || 'Single'}</td>
                    <td>{song.duration || '03:30'}</td>
                    <td>
                      <button
                        className="like-btn liked"
                        title="Remove from Liked Songs"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(song);
                        }}
                      >
                        <Heart size={18} fill="var(--spotify-green)" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ color: '#b3b3b3', padding: '32px 0' }}>
            <p>Songs you like will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
