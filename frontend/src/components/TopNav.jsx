import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search as SearchIcon,
  User,
  Menu,
  Download,
  LogOut,
  ChevronDown,
  LogIn,
  UserPlus,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function TopNav({
  currentView,
  setCurrentView,
  searchQuery,
  setSearchQuery,
  setIsMobileOpen,
  onOpenAuth,
  onOpenProfile,
}) {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="top-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          className="mobile-menu-toggle icon-btn"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          <Menu size={22} />
        </button>

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

      <div className="top-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          className="badge-btn dark"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          onClick={() => alert('Spotify Desktop App preview ready!')}
        >
          <Download size={15} />
          <span>Install App</span>
        </button>

        <div style={{ position: 'relative' }} ref={dropdownRef}>
          {isAuthenticated ? (
            <button
              type="button"
              className="user-profile-btn"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              title={`${user?.name} (${user?.email})`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--nav-btn-bg)',
                padding: '3px 12px 3px 3px',
                borderRadius: '500px',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.1s',
                color: 'var(--text-main)',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'var(--spotify-green)',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {userInitial}
              </div>
              <span
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  maxWidth: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user?.name}
              </span>
              <ChevronDown
                size={15}
                style={{
                  color: 'var(--text-muted)',
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                }}
              />
            </button>
          ) : (
            <button
              type="button"
              className="user-profile-btn"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              title="Profile & Account options"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--nav-btn-bg)',
                padding: '4px 14px 4px 4px',
                borderRadius: '500px',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.1s',
                color: 'var(--text-main)',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'var(--bg-highlight)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <User size={17} />
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>Profile</span>
              <ChevronDown
                size={15}
                style={{
                  color: 'var(--text-muted)',
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                }}
              />
            </button>
          )}

          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                background: 'var(--dropdown-bg)',
                borderRadius: '8px',
                minWidth: '220px',
                padding: '6px',
                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-subtle)',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              {isAuthenticated ? (
                <>
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 700 }}>
                      {user?.name}
                    </p>
                    <p
                      style={{
                        margin: '2px 0 0 0',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {user?.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onOpenProfile();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '10px 12px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dropdown-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <User size={16} />
                    <span>View Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleTheme}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '10px 12px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dropdown-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                      <span>Theme</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {theme === 'dark' ? 'Dark' : 'Light'}
                    </span>
                  </button>

                  <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '4px 0' }} />

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '10px 12px',
                      background: 'transparent',
                      border: 'none',
                      color: '#ff7070',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dropdown-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </>
              ) : (
                <>
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: 700 }}>
                      Spotify Account
                    </p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Log in to access your music & playlists
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onOpenAuth('login');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '10px 12px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dropdown-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <LogIn size={16} style={{ color: 'var(--spotify-green)' }} />
                    <span>Log in</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onOpenAuth('register');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '10px 12px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dropdown-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <UserPlus size={16} style={{ color: 'var(--spotify-green)' }} />
                    <span>Sign up</span>
                  </button>

                  <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '4px 0' }} />

                  <button
                    type="button"
                    onClick={toggleTheme}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '10px 12px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dropdown-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                      <span>Theme</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {theme === 'dark' ? 'Dark' : 'Light'}
                    </span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

