import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchPlaylists,
  fetchLikedSongs,
  createPlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  toggleLikeSong,
} from '../services/api';

const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pls, lks] = await Promise.all([fetchPlaylists(), fetchLikedSongs()]);
      setPlaylists(pls);
      setLikedSongs(lks);
    } catch (err) {
      console.error('Error loading playlists & likes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreatePlaylist = async (name, desc) => {
    try {
      const newPl = await createPlaylist(name, desc);
      if (newPl) {
        setPlaylists((prev) => [newPl, ...prev]);
        return newPl;
      }
    } catch (err) {
      console.error('Failed to create playlist:', err);
    }
    return null;
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      const success = await deletePlaylist(playlistId);
      if (success) {
        setPlaylists((prev) => prev.filter((p) => p._id !== playlistId));
        return true;
      }
    } catch (err) {
      console.error('Failed to delete playlist:', err);
    }
    return false;
  };

  const handleAddSongToPlaylist = async (playlistId, songId, songData = null) => {
    try {
      const updated = await addSongToPlaylist(playlistId, songId, songData);
      if (updated) {
        setPlaylists((prev) =>
          prev.map((p) => (p._id === playlistId ? updated : p))
        );
        return true;
      }
    } catch (err) {
      console.error('Failed to add song to playlist:', err);
    }
    return false;
  };

  const handleRemoveSongFromPlaylist = async (playlistId, songId) => {
    try {
      const updated = await removeSongFromPlaylist(playlistId, songId);
      if (updated) {
        setPlaylists((prev) =>
          prev.map((p) => (p._id === playlistId ? updated : p))
        );
        return true;
      }
    } catch (err) {
      console.error('Failed to remove song from playlist:', err);
    }
    return false;
  };

  const handleToggleLike = async (song) => {
    try {
      const songId = song._id || song;
      const res = await toggleLikeSong(songId, song);
      if (res && res.success) {
        if (res.isLiked) {
          const songObj = res.song || song;
          setLikedSongs((prev) => [songObj, ...prev.filter((s) => s._id !== songId)]);
        } else {
          setLikedSongs((prev) => prev.filter((s) => s._id !== songId && s.title !== song.title));
        }
        return res.isLiked;
      }
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
    return false;
  };

  const isSongLiked = (songId, songTitle = '') => {
    return likedSongs.some(
      (s) => s._id === songId || (songTitle && s.title.toLowerCase() === songTitle.toLowerCase())
    );
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        likedSongs,
        loading,
        refreshData: loadData,
        createPlaylist: handleCreatePlaylist,
        deletePlaylist: handleDeletePlaylist,
        addSongToPlaylist: handleAddSongToPlaylist,
        removeSongFromPlaylist: handleRemoveSongFromPlaylist,
        toggleLike: handleToggleLike,
        isSongLiked,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  return useContext(PlaylistContext);
}

