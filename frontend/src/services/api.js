import { defaultSongs, defaultPlaylists } from './defaultData';

const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : '';
const BASE_URL = API_BASE ? `${API_BASE}/api` : '/api';

export async function fetchSongs(category = '') {
  try {
    const url = category ? `${BASE_URL}/songs?category=${category}` : `${BASE_URL}/songs`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    }
  } catch {}

  if (!category || category === 'all') return defaultSongs;
  return defaultSongs.filter((s) => s.category === category);
}

export async function searchSongs(query) {
  try {
    const res = await fetch(`${BASE_URL}/songs/search?q=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    }
  } catch {}

  if (!query || !query.trim()) return defaultSongs;
  const q = query.toLowerCase();
  return defaultSongs.filter(
    (s) =>
      (s.title && s.title.toLowerCase().includes(q)) ||
      (s.artist && s.artist.toLowerCase().includes(q)) ||
      (s.album && s.album.toLowerCase().includes(q))
  );
}

export async function fetchPlaylists() {
  try {
    const res = await fetch(`${BASE_URL}/playlists`);
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    }
  } catch {}

  try {
    const saved = localStorage.getItem('spotify_custom_playlists');
    const custom = saved ? JSON.parse(saved) : [];
    return [...defaultPlaylists, ...custom];
  } catch {
    return defaultPlaylists;
  }
}

export async function fetchPlaylistById(id) {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${id}`);
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.success && data.data) {
        return data.data;
      }
    }
  } catch {}

  const all = await fetchPlaylists();
  return all.find((p) => p._id === id) || null;
}

export async function createPlaylist(name, description = '') {
  try {
    const res = await fetch(`${BASE_URL}/playlists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.success) return data.data;
    }
  } catch {}

  const newPl = {
    _id: 'pl_custom_' + Date.now(),
    name,
    description,
    coverUrl: '/card1img.jpeg',
    songs: [],
    isCustom: true,
  };
  try {
    const saved = localStorage.getItem('spotify_custom_playlists');
    const list = saved ? JSON.parse(saved) : [];
    list.unshift(newPl);
    localStorage.setItem('spotify_custom_playlists', JSON.stringify(list));
  } catch {}
  return newPl;
}

export async function addSongToPlaylist(playlistId, songId, songData = null) {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${playlistId}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId, songData }),
    });
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.success) return data.data;
    }
  } catch {}

  try {
    const saved = localStorage.getItem('spotify_custom_playlists');
    if (saved) {
      const list = JSON.parse(saved);
      const pl = list.find((p) => p._id === playlistId);
      if (pl && songData) {
        pl.songs = pl.songs || [];
        if (!pl.songs.some((s) => s._id === songId)) {
          pl.songs.push(songData);
          localStorage.setItem('spotify_custom_playlists', JSON.stringify(list));
          return pl;
        }
      }
    }
  } catch {}
  return null;
}

export async function removeSongFromPlaylist(playlistId, songId) {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${playlistId}/songs/${songId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.success) return data.data;
    }
  } catch {}

  try {
    const saved = localStorage.getItem('spotify_custom_playlists');
    if (saved) {
      const list = JSON.parse(saved);
      const pl = list.find((p) => p._id === playlistId);
      if (pl) {
        pl.songs = (pl.songs || []).filter((s) => (s._id || s) !== songId);
        localStorage.setItem('spotify_custom_playlists', JSON.stringify(list));
        return pl;
      }
    }
  } catch {}
  return null;
}

export async function deletePlaylist(playlistId) {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.success) return true;
    }
  } catch {}

  try {
    const saved = localStorage.getItem('spotify_custom_playlists');
    if (saved) {
      const list = JSON.parse(saved).filter((p) => p._id !== playlistId);
      localStorage.setItem('spotify_custom_playlists', JSON.stringify(list));
      return true;
    }
  } catch {}
  return false;
}

export async function fetchLikedSongs() {
  try {
    const res = await fetch(`${BASE_URL}/likes`);
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    }
  } catch {}

  try {
    const saved = localStorage.getItem('spotify_liked_songs');
    return saved ? JSON.parse(saved) : defaultSongs.slice(0, 4).map((s) => ({ _id: 'like_' + s._id, song: s }));
  } catch {
    return [];
  }
}

export async function toggleLikeSong(songId, songData = null) {
  try {
    const res = await fetch(`${BASE_URL}/likes/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId, songData }),
    });
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data) return data;
    }
  } catch {}

  try {
    const saved = localStorage.getItem('spotify_liked_songs');
    let list = saved ? JSON.parse(saved) : defaultSongs.slice(0, 4).map((s) => ({ _id: 'like_' + s._id, song: s }));
    const exists = list.some((item) => (item.song?._id || item.song) === songId);
    if (exists) {
      list = list.filter((item) => (item.song?._id || item.song) !== songId);
      localStorage.setItem('spotify_liked_songs', JSON.stringify(list));
      return { success: true, isLiked: false, message: 'Removed from Liked Songs' };
    } else {
      const songObj = songData || defaultSongs.find((s) => s._id === songId);
      if (songObj) {
        list.unshift({ _id: 'like_' + songId, song: songObj });
        localStorage.setItem('spotify_liked_songs', JSON.stringify(list));
        return { success: true, isLiked: true, message: 'Added to Liked Songs' };
      }
    }
  } catch {}
  return { success: false };
}

export async function registerUser(name, email, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data && data.success) {
      return data;
    }
    if (res.status === 400 || res.status === 409) {
      return {
        success: false,
        message: data?.message || 'Registration failed',
      };
    }
  } catch {}

  try {
    const saved = localStorage.getItem('spotify_local_users');
    const users = saved ? JSON.parse(saved) : [];
    if (users.some((u) => u.email === email)) {
      return { success: false, message: 'User already exists with this email' };
    }
    const newUser = {
      _id: 'user_' + Date.now(),
      name,
      email,
      password,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    };
    users.push(newUser);
    localStorage.setItem('spotify_local_users', JSON.stringify(users));
    const token = 'local_token_' + Date.now();
    const safeUser = { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, avatar: newUser.avatar };
    localStorage.setItem('spotify_token', token);
    localStorage.setItem('spotify_user', JSON.stringify(safeUser));
    return {
      success: true,
      message: 'Registration successful',
      token,
      user: safeUser,
    };
  } catch {
    return { success: false, message: 'Could not complete registration' };
  }
}

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data && data.success) {
      return data;
    }
    if (res.status === 400 || res.status === 401) {
      return {
        success: false,
        message: data?.message || 'Invalid email or password',
      };
    }
  } catch {}

  try {
    const saved = localStorage.getItem('spotify_local_users');
    const users = saved ? JSON.parse(saved) : [];
    const matched = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      if (matched.password !== password) {
        return { success: false, message: 'Incorrect password' };
      }
      const token = 'local_token_' + Date.now();
      const safeUser = { _id: matched._id, name: matched.name, email: matched.email, role: matched.role, avatar: matched.avatar };
      return { success: true, message: 'Login successful', token, user: safeUser };
    }
    const token = 'local_token_' + Date.now();
    const demoUser = {
      _id: 'user_' + Date.now(),
      name: email.split('@')[0] || 'Spotify User',
      email,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    };
    users.push({ ...demoUser, password });
    localStorage.setItem('spotify_local_users', JSON.stringify(users));
    return { success: true, message: 'Login successful', token, user: demoUser };
  } catch {
    return { success: false, message: 'Could not complete login' };
  }
}

export async function fetchUserProfile(token) {
  try {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data && data.success) {
      return data;
    }
  } catch {}

  try {
    const saved = localStorage.getItem('spotify_user');
    if (saved) {
      return { success: true, user: JSON.parse(saved) };
    }
  } catch {}
  return { success: false, message: 'Session expired' };
}

export async function updateUserProfile(token, profileData) {
  try {
    const res = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data && data.success) {
      return data;
    }
  } catch {}

  try {
    const saved = localStorage.getItem('spotify_user');
    if (saved) {
      const user = { ...JSON.parse(saved), ...profileData };
      localStorage.setItem('spotify_user', JSON.stringify(user));
      return { success: true, user, message: 'Profile updated successfully' };
    }
  } catch {}
  return { success: false, message: 'Failed to update profile' };
}
