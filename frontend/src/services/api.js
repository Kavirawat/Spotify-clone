const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : '';
const BASE_URL = API_BASE ? `${API_BASE}/api` : '/api';

export async function fetchSongs(category = '') {
  try {
    const url = category ? `${BASE_URL}/songs?category=${category}` : `${BASE_URL}/songs`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json().catch(() => null);
    return data && data.success ? data.data : [];
  } catch {
    return [];
  }
}

export async function searchSongs(query) {
  try {
    const res = await fetch(`${BASE_URL}/songs/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    const data = await res.json().catch(() => null);
    return data && data.success ? data.data : [];
  } catch {
    return [];
  }
}

export async function fetchPlaylists() {
  try {
    const res = await fetch(`${BASE_URL}/playlists`);
    if (!res.ok) return [];
    const data = await res.json().catch(() => null);
    return data && data.success ? data.data : [];
  } catch {
    return [];
  }
}

export async function fetchPlaylistById(id) {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${id}`);
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    return data && data.success ? data.data : null;
  } catch {
    return null;
  }
}

export async function createPlaylist(name, description = '') {
  try {
    const res = await fetch(`${BASE_URL}/playlists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    return data && data.success ? data.data : null;
  } catch {
    return null;
  }
}

export async function addSongToPlaylist(playlistId, songId, songData = null) {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${playlistId}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId, songData }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    return data && data.success ? data.data : null;
  } catch {
    return null;
  }
}

export async function removeSongFromPlaylist(playlistId, songId) {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${playlistId}/songs/${songId}`, {
      method: 'DELETE',
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    return data && data.success ? data.data : null;
  } catch {
    return null;
  }
}

export async function deletePlaylist(playlistId) {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
      method: 'DELETE',
    });
    if (!res.ok) return false;
    const data = await res.json().catch(() => null);
    return Boolean(data && data.success);
  } catch {
    return false;
  }
}

export async function fetchLikedSongs() {
  try {
    const res = await fetch(`${BASE_URL}/likes`);
    if (!res.ok) return [];
    const data = await res.json().catch(() => null);
    return data && data.success ? data.data : [];
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
    const data = await res.json().catch(() => null);
    return data || { success: false };
  } catch {
    return { success: false };
  }
}

export async function registerUser(name, email, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return {
        success: false,
        message: data?.message || `Server error (${res.status})`,
      };
    }
    return data || { success: false, message: 'Invalid server response' };
  } catch (err) {
    return {
      success: false,
      message: 'Cannot connect to backend server. Please make sure the backend is running.',
    };
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
    if (!res.ok) {
      return {
        success: false,
        message: data?.message || `Server error (${res.status})`,
      };
    }
    return data || { success: false, message: 'Invalid server response' };
  } catch (err) {
    return {
      success: false,
      message: 'Cannot connect to backend server. Please make sure the backend is running.',
    };
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
    if (!res.ok) {
      return { success: false, message: data?.message || 'Failed to fetch profile' };
    }
    return data || { success: false, message: 'Invalid profile response' };
  } catch (err) {
    return { success: false, message: err.message };
  }
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
    if (!res.ok) {
      return { success: false, message: data?.message || 'Failed to update profile' };
    }
    return data || { success: false, message: 'Invalid response' };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

