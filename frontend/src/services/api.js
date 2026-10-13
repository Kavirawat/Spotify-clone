const BASE_URL = '/api';

export async function fetchSongs(category = '') {
  const url = category ? `${BASE_URL}/songs?category=${category}` : `${BASE_URL}/songs`;
  const res = await fetch(url);
  const data = await res.json();
  return data.success ? data.data : [];
}

export async function searchSongs(query) {
  const res = await fetch(`${BASE_URL}/songs/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.success ? data.data : [];
}

export async function fetchPlaylists() {
  const res = await fetch(`${BASE_URL}/playlists`);
  const data = await res.json();
  return data.success ? data.data : [];
}

export async function fetchPlaylistById(id) {
  const res = await fetch(`${BASE_URL}/playlists/${id}`);
  const data = await res.json();
  return data.success ? data.data : null;
}

export async function createPlaylist(name, description = '') {
  const res = await fetch(`${BASE_URL}/playlists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });
  const data = await res.json();
  return data.success ? data.data : null;
}

export async function addSongToPlaylist(playlistId, songId, songData = null) {
  const res = await fetch(`${BASE_URL}/playlists/${playlistId}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ songId, songData }),
  });
  const data = await res.json();
  return data.success ? data.data : null;
}

export async function removeSongFromPlaylist(playlistId, songId) {
  const res = await fetch(`${BASE_URL}/playlists/${playlistId}/songs/${songId}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data.success ? data.data : null;
}

export async function deletePlaylist(playlistId) {
  const res = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data.success;
}

export async function fetchLikedSongs() {
  const res = await fetch(`${BASE_URL}/likes`);
  const data = await res.json();
  return data.success ? data.data : [];
}

export async function toggleLikeSong(songId, songData = null) {
  const res = await fetch(`${BASE_URL}/likes/toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ songId, songData }),
  });
  const data = await res.json();
  return data;
}
