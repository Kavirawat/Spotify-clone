import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // 'none', 'all', 'one'
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(-1);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      handleSongEnded();
    };

    const onError = (e) => {
      console.warn('Audio playback error:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [queue, queueIndex, repeatMode, isShuffle]);

  const playSong = (song, newQueue = null) => {
    if (!song) return;

    let targetQueue = queue;
    let targetIndex = queueIndex;

    if (newQueue && newQueue.length > 0) {
      targetQueue = newQueue;
      setQueue(newQueue);
      targetIndex = newQueue.findIndex((s) => s._id === song._id);
      setQueueIndex(targetIndex !== -1 ? targetIndex : 0);
    } else if (queue.length === 0) {
      targetQueue = [song];
      setQueue([song]);
      targetIndex = 0;
      setQueueIndex(0);
    } else {
      const idx = queue.findIndex((s) => s._id === song._id);
      if (idx !== -1) {
        targetIndex = idx;
        setQueueIndex(idx);
      } else {
        targetQueue = [...queue, song];
        setQueue(targetQueue);
        targetIndex = targetQueue.length - 1;
        setQueueIndex(targetIndex);
      }
    }

    setCurrentSong(song);
    audioRef.current.src = song.audioUrl;
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn('Autoplay prevented or error:', err);
        setIsPlaying(false);
      });
  };

  const togglePlay = () => {
    if (!currentSong) {
      if (queue.length > 0) {
        playSong(queue[0]);
      }
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.warn);
    }
  };

  const nextSong = () => {
    if (queue.length === 0) return;

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      setQueueIndex(randomIndex);
      playSong(queue[randomIndex]);
      return;
    }

    let nextIndex = queueIndex + 1;
    if (nextIndex >= queue.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        return; // reached end
      }
    }

    setQueueIndex(nextIndex);
    playSong(queue[nextIndex]);
  };

  const prevSong = () => {
    if (queue.length === 0) return;

    // If more than 3 seconds in, restart the song
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    let prevIndex = queueIndex - 1;
    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }

    setQueueIndex(prevIndex);
    playSong(queue[prevIndex]);
  };

  const handleSongEnded = () => {
    if (repeatMode === 'one') {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.warn);
      return;
    }
    nextSong();
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolumeLevel = (val) => {
    const newVol = Math.max(0, Math.min(1, val));
    setVolume(newVol);
    if (isMuted && newVol > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === 'none') return 'all';
      if (prev === 'all') return 'one';
      return 'none';
    });
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        repeatMode,
        queue,
        queueIndex,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        seek,
        setVolumeLevel,
        toggleMute,
        toggleShuffle,
        toggleRepeat,
        setQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
