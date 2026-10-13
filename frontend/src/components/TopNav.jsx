import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search as SearchIcon,
  User,
  Menu,
  Download,
} from 'lucide-react';

export default function TopNav({
  currentView,
  setCurrentView,
  searchQuery,
  setSearchQuery,
  setIsMobileOpen,
}) {
  return (
    <header className="top-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Mobile toggle button */}
        <button
          className="mobile-menu-toggle icon-btn"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          <Menu size={22} />
        </button>

        {/* Back and Forward navigation buttons */}
        <div className="nav-arrows">
          <button
            className="arrow-circle"
            onClick={() => setCurrentView('home')}
            title="Go to Home"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="arrow-circle"
            onClick={() => setCurrentView('search')}
            title="Go to Search"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Search input field if on search view or user wants to search */}
        {currentView === 'search' && (
          <div className="search-input-wrapper">
            <SearchIcon size={18} />
            <input
              type="text"
              placeholder="What do you want to play?"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Top right actions */}
      <div className="top-nav-actions">
        <button
          className="badge-btn dark"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          onClick={() => alert('Spotify App download initiated!')}
        >
          <Download size={15} />
          <span>Install App</span>
        </button>

        <div className="user-avatar" title="Profile">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}
