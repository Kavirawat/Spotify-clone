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
import { PlayerProvider } from './context/PlayerContext';
import { PlaylistProvider } from './context/PlaylistContext';
import { Home as HomeIcon, Search as SearchIcon, Library } from 'lucide-react';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [addToPlaylistSong, setAddToPlaylistSong] = useState(null);
  const [isQueueOpen, setIsQueueOpen] = useState(false);

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
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          selectedPlaylistId={selectedPlaylistId}
          setSelectedPlaylistId={setSelectedPlaylistId}
        />

        {/* Main Content Area */}
        <main className="main-view">
          <TopNav
            currentView={currentView}
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setIsMobileOpen={setIsMobileOpen}
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

      {/* Bottom Music Player */}
      <Player
        onOpenAddToPlaylist={(song) => setAddToPlaylistSong(song)}
        onToggleQueue={() => setIsQueueOpen((prev) => !prev)}
      />

      {/* Mobile Bottom Navigation */}
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

      {/* Modals */}
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
    </>
  );
}

export default function App() {
  return (
    <PlaylistProvider>
      <PlayerProvider>
        <AppContent />
      </PlayerProvider>
    </PlaylistProvider>
  );
}
