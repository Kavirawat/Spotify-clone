import React, { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';
import PlaylistCard from '../components/PlaylistCard';
import { fetchSongs } from '../services/api';
import { usePlaylist } from '../context/PlaylistContext';

export default function Home({ onSelectPlaylist }) {
  const [songs, setSongs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { playlists } = usePlaylist();

  useEffect(() => {
    async function loadSongs() {
      setLoading(true);
      try {
        const data = await fetchSongs();
        setSongs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSongs();
  }, []);

  const driveSongs = songs.filter((s) => s.category === 'long drive');
  const recentSongs = songs.filter((s) => s.category === 'recent').slice(0, 4);
  const trendingSongs = songs.filter((s) => s.category === 'trending');
  const featuredSongs = songs.filter((s) => s.category === 'featured');

  return (
    <div className="content-body">
      {/* Category Pills */}
      <div className="category-pills">
        <button
          className={`pill-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`pill-btn ${filter === 'long drive' ? 'active' : ''}`}
          onClick={() => setFilter('long drive')}
        >
          🚗 Long Drive Vibes
        </button>
        <button
          className={`pill-btn ${filter === 'music' ? 'active' : ''}`}
          onClick={() => setFilter('music')}
        >
          Music
        </button>
        <button
          className={`pill-btn ${filter === 'podcasts' ? 'active' : ''}`}
          onClick={() => setFilter('podcasts')}
        >
          Podcasts
        </button>
      </div>

      {loading ? (
        <div style={{ color: '#b3b3b3', padding: '24px 0' }}>Loading music tracks...</div>
      ) : filter === 'long drive' ? (
        /* Only Long Drive View */
        <div>
          <div className="section-header">
            <h2 className="section-title">🚗 Long Drive Vibes & Road Trips ({driveSongs.length} Songs)</h2>
          </div>
          <div className="cards-grid">
            {driveSongs.map((song) => (
              <SongCard key={song._id} song={song} songList={driveSongs} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* 🚗 Long Drive Vibes Section */}
          <div className="section-header">
            <h2 className="section-title">🚗 Long Drive Vibes (Best Road Trip Songs)</h2>
            <span
              className="section-see-all"
              onClick={() => setFilter('long drive')}
            >
              Show all ({driveSongs.length})
            </span>
          </div>
          <div className="cards-grid">
            {driveSongs.slice(0, 8).map((song) => (
              <SongCard key={song._id} song={song} songList={songs} />
            ))}
          </div>

          {/* Popular Playlists */}
          {playlists.length > 0 && (
            <>
              <div className="section-header">
                <h2 className="section-title">Popular Playlists</h2>
                <span className="section-see-all">Show all</span>
              </div>
              <div className="cards-grid">
                {playlists.map((pl) => (
                  <PlaylistCard
                    key={pl._id}
                    playlist={pl}
                    onSelect={onSelectPlaylist}
                  />
                ))}
              </div>
            </>
          )}

          {/* Trending Now */}
          <div className="section-header">
            <h2 className="section-title">Trending Now Near You</h2>
            <span className="section-see-all">Show all</span>
          </div>
          <div className="cards-grid">
            {trendingSongs.map((song) => (
              <SongCard key={song._id} song={song} songList={songs} />
            ))}
          </div>

          {/* Recently Played */}
          {recentSongs.length > 0 && (
            <>
              <div className="section-header">
                <h2 className="section-title">Recently Played</h2>
                <span className="section-see-all">Show all</span>
              </div>
              <div className="cards-grid">
                {recentSongs.map((song) => (
                  <SongCard key={song._id} song={song} songList={songs} />
                ))}
              </div>
            </>
          )}

          {/* Featured Charts */}
          <div className="section-header">
            <h2 className="section-title">Featured Charts</h2>
            <span className="section-see-all">Show all</span>
          </div>
          <div className="cards-grid">
            {featuredSongs.map((song) => (
              <SongCard key={song._id} song={song} songList={songs} />
            ))}
          </div>
        </>
      )}

      {/* Footer Divider */}
      <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '90%', borderTop: '1px solid rgba(255,255,255,0.1)' }}></div>
      </div>
    </div>
  );
}
