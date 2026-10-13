import React from 'react';
import { Home, Search, Library, Plus, Heart, Music, X } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';

export default function Sidebar({
  currentView,
  setCurrentView,
  isMobileOpen,
  setIsMobileOpen,
  onOpenCreateModal,
  selectedPlaylistId,
  setSelectedPlaylistId,
}) {
  const { playlists, likedSongs } = usePlaylist();

  const handleNav = (view) => {
    setCurrentView(view);
    if (isMobileOpen) setIsMobileOpen(false);
  };

  const handleSelectPlaylist = (pl) => {
    setSelectedPlaylistId(pl._id);
    setCurrentView('playlist');
    if (isMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Mobile close button */}
        {isMobileOpen && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '4px' }}>
            <button className="icon-btn" onClick={() => setIsMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>
        )}

        {/* Top Nav Box */}
        <div className="sidebar-box nav-links">
          <button
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            <Home />
            <span>Home</span>
          </button>
          <button
            className={`nav-link ${currentView === 'search' ? 'active' : ''}`}
            onClick={() => handleNav('search')}
          >
            <Search />
            <span>Search</span>
          </button>
        </div>

        {/* Library Box */}
        <div className="sidebar-box library-section">
          <div className="library-header">
            <div className="library-title" onClick={() => handleNav('home')}>
              <Library size={22} />
              <span>Your Library</span>
            </div>
            <button
              className="icon-btn"
              title="Create playlist"
              onClick={onOpenCreateModal}
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="library-scroll">
            {/* Liked Songs Shortcut */}
            <div
              className={`playlist-item ${currentView === 'liked' ? 'active' : ''}`}
              onClick={() => handleNav('liked')}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '4px',
                  background: 'linear-gradient(135deg, #450af5, #c4efd9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Heart size={20} fill="#fff" />
              </div>
              <div className="playlist-meta">
                <span className="name">Liked Songs</span>
                <span className="info">Playlist • {likedSongs.length} songs</span>
              </div>
            </div>

            {/* Custom / Default Playlists list */}
            {playlists.map((pl) => (
              <div
                key={pl._id}
                className={`playlist-item ${
                  currentView === 'playlist' && selectedPlaylistId === pl._id
                    ? 'active'
                    : ''
                }`}
                onClick={() => handleSelectPlaylist(pl)}
              >
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
                  <span className="info">
                    Playlist • {pl.songs ? pl.songs.length : 0} songs
                  </span>
                </div>
              </div>
            ))}

            {/* Create Playlist Promo Card if empty */}
            {playlists.length === 0 && (
              <div className="promo-card">
                <h4>Create your first playlist</h4>
                <p>It's easy, we'll help you</p>
                <button className="badge-btn" onClick={onOpenCreateModal}>
                  Create playlist
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
