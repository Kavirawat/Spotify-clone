import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import PlaylistDetail from './pages/PlaylistDetail';
import LikedSongs from './pages/LikedSongs';
import PlaylistModal from './components/PlaylistModal';
import AddToPlaylistModal from './components/AddToPlaylistModal';
import QueueModal from './components/QueueModal';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { PlaylistProvider } from './context/PlaylistContext';
import { ThemeProvider } from './context/ThemeContext';
import { Home as HomeIcon, Search as SearchIcon, Library } from 'lucide-react';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [addToPlaylistSong, setAddToPlaylistSong] = useState(null);
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true);
  };

  const handleSelectPlaylist = (pl) => {
    setSelectedPlaylistId(pl._id);
    setCurrentView('playlist');
  };

  const handleCreatedPlaylist = (newPl) => {
    setSelectedPlaylistId(newPl._id);
    setCurrentView('playlist');
  };

  return (
    <>
      <div className="app-container">

        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          selectedPlaylistId={selectedPlaylistId}
          setSelectedPlaylistId={setSelectedPlaylistId}
        />

        <main className="main-view">
          <TopNav
            currentView={currentView}
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setIsMobileOpen={setIsMobileOpen}
            onOpenAuth={handleOpenAuth}
            onOpenProfile={handleOpenProfile}
          />

          {currentView === 'home' && (
            <Home onSelectPlaylist={handleSelectPlaylist} />
          )}

          {currentView === 'search' && (
            <Search
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenAddToPlaylist={(song) => setAddToPlaylistSong(song)}
            />
          )}

          {currentView === 'playlist' && (
            <PlaylistDetail
              playlistId={selectedPlaylistId}
              onGoBack={() => setCurrentView('home')}
            />
          )}

          {currentView === 'liked' && <LikedSongs />}
        </main>
      </div>

      <Player
        onOpenAddToPlaylist={(song) => setAddToPlaylistSong(song)}
        onToggleQueue={() => setIsQueueOpen((prev) => !prev)}
      />

      <div className="mobile-bottom-nav">
        <button
          className={`mobile-nav-item ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentView('home')}
        >
          <HomeIcon />
          <span>Home</span>
        </button>
        <button
          className={`mobile-nav-item ${currentView === 'search' ? 'active' : ''}`}
          onClick={() => setCurrentView('search')}
        >
          <SearchIcon />
          <span>Search</span>
        </button>
        <button
          className="mobile-nav-item"
          onClick={() => setIsMobileOpen(true)}
        >
          <Library />
          <span>Your Library</span>
        </button>
      </div>

      <PlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={handleCreatedPlaylist}
      />

      <AddToPlaylistModal
        song={addToPlaylistSong}
        isOpen={Boolean(addToPlaylistSong)}
        onClose={() => setAddToPlaylistSong(null)}
      />

      <QueueModal
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
      />

      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authModalMode}
          key={`auth-modal-${authModalMode}`}
        />
      )}

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('UI Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#fff', textAlign: 'center', padding: '20px' }}>
          <h2>Something went wrong</h2>
          <p style={{ color: '#b3b3b3', marginTop: '8px' }}>Please reload the player.</p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '16px', background: 'var(--spotify-green, #1db954)', color: '#000', border: 'none', padding: '10px 24px', borderRadius: '500px', fontWeight: 700, cursor: 'pointer' }}
          >
            Reload Spotify
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <PlaylistProvider>
            <PlayerProvider>
              <AppContent />
            </PlayerProvider>
          </PlaylistProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

