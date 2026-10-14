import React, { useState, useEffect } from 'react';
import { Play, Pause, Trash2, Clock, Trash } from 'lucide-react';
import { fetchPlaylistById } from '../services/api';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';

export default function PlaylistDetail({ playlistId, onGoBack }) {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const { deletePlaylist, removeSongFromPlaylist, refreshData } = usePlaylist();

  useEffect(() => {
    async function load() {
      if (!playlistId) return;
      setLoading(true);
      try {
        const data = await fetchPlaylistById(playlistId);
        setPlaylist(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [playlistId]);

  if (loading) {
    return <div className="content-body" style={{ color: '#b3b3b3' }}>Loading playlist details...</div>;
  }

  if (!playlist) {
    return (
      <div className="content-body">
        <p style={{ color: '#b3b3b3' }}>Playlist not found.</p>
        <button className="badge-btn" onClick={onGoBack} style={{ marginTop: '12px' }}>
          Back to Home
        </button>
      </div>
    );
  }

  const handlePlayAll = () => {
    if (playlist.songs && playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    }
  };

  const handleDeletePlaylist = async () => {
    if (confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
      const ok = await deletePlaylist(playlist._id);
      if (ok) {
        refreshData();
        onGoBack();
      }
    }
  };

  const handleRemoveSong = async (e, songId) => {
    e.stopPropagation();
    const ok = await removeSongFromPlaylist(playlist._id, songId);
    if (ok) {
      setPlaylist((prev) => ({
        ...prev,
        songs: prev.songs.filter((s) => s._id !== songId),
      }));
    }
  };

  return (
    <div>

      <div className="playlist-banner">
        <img
          src={playlist.coverUrl || '/images/card1img.jpeg'}
          alt={playlist.name}
          className="playlist-banner-img"
          onError={(e) => {
            e.target.src = '/card1img.jpeg';
          }}
        />
        <div className="playlist-banner-info">
          <span className="playlist-banner-type">Playlist</span>
          <h1 className="playlist-banner-title">{playlist.name}</h1>
          <p className="playlist-banner-desc">{playlist.description}</p>
          <div className="playlist-banner-meta">
            <span>Spotify</span>
            <span>•</span>
            <span>{playlist.songs?.length || 0} songs</span>
          </div>
        </div>
      </div>

      <div className="content-body">

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <button
            className="play-pause-circle"
            style={{ width: '56px', height: '56px', backgroundColor: 'var(--spotify-green)' }}
            onClick={() => {
              const isPlaylistActive = playlist.songs?.some((s) => s._id === currentSong?._id);
              if (isPlaylistActive) {
                togglePlay();
              } else {
                handlePlayAll();
              }
            }}
            title={isPlaying && playlist.songs?.some((s) => s._id === currentSong?._id) ? 'Pause' : 'Play'}
          >
            {isPlaying && playlist.songs?.some((s) => s._id === currentSong?._id) ? (
              <Pause size={26} fill="#000" color="#000" />
            ) : (
              <Play size={26} fill="#000" color="#000" style={{ marginLeft: '4px' }} />
            )}
          </button>

          {playlist.isCustom && (
            <button
              className="icon-btn"
              title="Delete Playlist"
              onClick={handleDeletePlaylist}
              style={{ color: '#ff5555' }}
            >
              <Trash2 size={24} />
            </button>
          )}
        </div>

        {playlist.songs && playlist.songs.length > 0 ? (
          <table className="song-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }} className="hide-mobile">#</th>
                <th>Title</th>
                <th className="hide-mobile">Album</th>
                <th style={{ width: '80px' }} className="hide-small">
                  <Clock size={16} />
                </th>
                <th style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {playlist.songs.map((song, idx) => {
                const isCurrent = currentSong?._id === song._id;
                return (
                  <tr
                    key={song._id}
                    className={`song-row ${isCurrent ? 'active' : ''}`}
                    onClick={() => {
                      if (isCurrent) {
                        togglePlay();
                      } else {
                        playSong(song, playlist.songs);
                      }
                    }}
                  >
                    <td className="track-num-cell hide-mobile">
                      <div className="track-num-wrapper">
                        {isCurrent ? (
                          isPlaying ? (
                            <Pause size={16} fill="var(--spotify-green)" color="var(--spotify-green)" className="track-active-icon" />
                          ) : (
                            <Play size={16} fill="var(--spotify-green)" color="var(--spotify-green)" className="track-active-icon" style={{ marginLeft: '2px' }} />
                          )
                        ) : (
                          <>
                            <span className="track-num-text">{idx + 1}</span>
                            <Play size={15} fill="#fff" color="#fff" className="track-hover-play" style={{ marginLeft: '2px' }} />
                          </>
                        )}
                      </div>
                    </td>
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
                    <td className="hide-mobile">{song.album || 'Single'}</td>
                    <td className="hide-small">{song.duration || '03:30'}</td>
                    <td>
                      {playlist.isCustom && (
                        <button
                          className="icon-btn"
                          title="Remove from playlist"
                          onClick={(e) => handleRemoveSong(e, song._id)}
                        >
                          <Trash size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ color: '#b3b3b3', padding: '32px 0' }}>
            <p>This playlist is empty. Add songs from Home or Search!</p>
          </div>
        )}
      </div>
    </div>
  );
}

