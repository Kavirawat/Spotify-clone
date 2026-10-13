import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
  Heart,
  PlusCircle,
  Maximize2,
  ListMusic,
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function Player({ onOpenAddToPlaylist, onToggleQueue }) {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    togglePlay,
    nextSong,
    prevSong,
    seek,
    setVolumeLevel,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  const { toggleLike, isSongLiked } = usePlaylist();

  if (!currentSong) {
    return (
      <footer className="music-player-bar">
        <div style={{ color: '#888', fontSize: '0.85rem' }}>
          Select a song to start listening
        </div>
      </footer>
    );
  }

  const liked = isSongLiked(currentSong._id);

  return (
    <footer className="music-player-bar">
      {/* 1. Current Song Info */}
      <div className="player-album">
        <div
          className="player-album-cover-box"
          onClick={togglePlay}
          title={isPlaying ? 'Click to Pause' : 'Click to Play'}
        >
          <img
            src={currentSong.coverUrl || '/images/card1img.jpeg'}
            alt={currentSong.title}
            className="player-album-cover"
            onError={(e) => {
              e.target.src = '/card1img.jpeg';
            }}
          />
          <div className="player-album-cover-overlay">
            {isPlaying ? (
              <Pause size={22} fill="#fff" color="#fff" />
            ) : (
              <Play size={22} fill="#fff" color="#fff" style={{ marginLeft: '2px' }} />
            )}
          </div>
        </div>
        <div className="player-album-details">
          <span className="player-album-title" title={currentSong.title}>
            {currentSong.title}
          </span>
          <span className="player-album-artist" title={currentSong.artist}>
            {currentSong.artist}
          </span>
        </div>
        <button
          className={`like-btn ${liked ? 'liked' : ''}`}
          title={liked ? 'Remove from Your Library' : 'Save to Your Library'}
          onClick={() => toggleLike(currentSong)}
        >
          <Heart size={18} fill={liked ? 'var(--spotify-green)' : 'transparent'} />
        </button>
        {onOpenAddToPlaylist && (
          <button
            className="like-btn"
            title="Add to Playlist"
            onClick={() => onOpenAddToPlaylist(currentSong)}
          >
            <PlusCircle size={18} />
          </button>
        )}
      </div>

      {/* 2. Controls & Seek Bar (Desktop) */}
      <div className="player-center">
        <div className="player-controls">
          <button
            className={`control-icon ${isShuffle ? 'active' : ''}`}
            onClick={toggleShuffle}
            title={isShuffle ? 'Disable Shuffle' : 'Enable Shuffle'}
          >
            <Shuffle size={18} />
          </button>

          <button className="control-icon" onClick={prevSong} title="Previous">
            <SkipBack size={20} />
          </button>

          <button
            className="play-pause-circle"
            onClick={togglePlay}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={20} fill="#000" />
            ) : (
              <Play size={20} fill="#000" style={{ marginLeft: '2px' }} />
            )}
          </button>

          <button className="control-icon" onClick={nextSong} title="Next">
            <SkipForward size={20} />
          </button>

          <button
            className={`control-icon ${repeatMode !== 'none' ? 'active' : ''}`}
            onClick={toggleRepeat}
            title={`Repeat: ${repeatMode}`}
          >
            {repeatMode === 'one' ? <Repeat1 size={18} /> : <Repeat size={18} />}
          </button>
        </div>

        <div className="player-playback-bar">
          <span className="time-label">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.5}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="slider"
          />
          <span className="time-label">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Right Controls (Volume, Queue, Fullscreen) */}
      <div className="player-right">
        {onToggleQueue && (
          <button className="control-icon" title="Queue" onClick={onToggleQueue}>
            <ListMusic size={19} />
          </button>
        )}

        <div className="volume-container">
          <button className="control-icon" onClick={toggleMute} title="Mute/Unmute">
            {isMuted || volume === 0 ? (
              <VolumeX size={19} />
            ) : volume < 0.5 ? (
              <Volume1 size={19} />
            ) : (
              <Volume2 size={19} />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolumeLevel(Number(e.target.value))}
            className="slider"
          />
        </div>

        <button
          className="control-icon"
          title="Full screen"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            } else {
              document.exitFullscreen().catch(() => {});
            }
          }}
        >
          <Maximize2 size={17} />
        </button>
      </div>

      {/* Mobile Right Controls */}
      <div className="player-mobile-controls">
        <button
          className="play-pause-circle"
          style={{ width: '32px', height: '32px' }}
          onClick={togglePlay}
        >
          {isPlaying ? <Pause size={18} fill="#000" /> : <Play size={18} fill="#000" />}
        </button>
      </div>
    </footer>
  );
}
