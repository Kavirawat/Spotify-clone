import React, { useState, useEffect } from 'react';
import { Play, Pause, PlusCircle, Heart, Search as SearchIcon } from 'lucide-react';
import { searchSongs } from '../services/api';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';

const browseCategories = [
  { name: '🚗 Long Drive Vibes', query: 'long drive', color: '#1db954' },
  { name: 'Bollywood Hits', query: 'Bollywood hits', color: '#bc5900' },
  { name: 'Arijit Singh', query: 'Arijit Singh', color: '#1e3264' },
  { name: 'Punjabi Top', query: 'Punjabi hits', color: '#e91429' },
  { name: 'Diljit Dosanjh', query: 'Diljit Dosanjh', color: '#e8115b' },
  { name: 'Shubh & AP Dhillon', query: 'Shubh', color: '#385dae' },
  { name: 'Romantic Hindi', query: 'Romantic Hindi songs', color: '#e1118c' },
  { name: 'Global Top 50', query: 'Top 50 Global hits', color: '#148a08' },
  { name: 'Lo-Fi Chill', query: 'Lofi chill beats', color: '#477d95' },
  { name: 'Pop & EDM', query: 'Pop hits 2024', color: '#8400e7' },
  { name: 'Sad Melodies', query: 'Sad Hindi songs', color: '#503750' },
  { name: 'Party & Dance', query: 'Party Hindi songs', color: '#8d67ab' },
  { name: 'Podcasts', query: 'Motivation podcast', color: '#006450' },
  { name: 'Workout Beats', query: 'Workout gym hits', color: '#777777' },
];

export default function Search({ searchQuery = '', setSearchQuery, onOpenAddToPlaylist }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { playSong, togglePlay, currentSong, isPlaying } = usePlayer();
  const { toggleLike, isSongLiked } = usePlaylist();

  const queryStr = typeof searchQuery === 'string' ? searchQuery : '';

  useEffect(() => {
    let active = true;
    async function doSearch() {
      if (!queryStr.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const data = await searchSongs(queryStr);
        if (active) {
          setResults(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setResults([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    const timer = setTimeout(doSearch, 150);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [queryStr]);

  const handleSongClick = (song) => {
    if (!song) return;
    if (currentSong && currentSong._id === song._id) {
      togglePlay();
    } else {
      playSong(song, results);
    }
  };

  return (
    <div className="content-body">

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
        {['🚗 Long Drive', 'Ilahi', 'Arijit Singh', 'Cheques', 'Diljit Dosanjh', 'Kesariya', 'Tum Hi Ho', 'Tauba Tauba', 'Chaleya', 'Believer'].map(
          (tag) => (
            <button
              key={tag}
              className={`pill-btn ${queryStr.toLowerCase() === tag.toLowerCase() ? 'active' : ''}`}
              onClick={() => setSearchQuery && setSearchQuery(tag)}
            >
              {tag}
            </button>
          )
        )}
      </div>

      {queryStr.trim() ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="section-title">
              Results for "<span style={{ color: 'var(--spotify-green)' }}>{queryStr}</span>"
            </h2>
            <span style={{ fontSize: '0.85rem', color: '#b3b3b3' }}>
              {Array.isArray(results) ? results.length : 0} real songs found
            </span>
          </div>

          {loading ? (
            <div style={{ color: '#b3b3b3', padding: '32px 0' }}>Searching real music catalog...</div>
          ) : results.length === 0 ? (
            <div style={{ color: '#b3b3b3', padding: '32px 0' }}>
              No songs found matching "{queryStr}". Try another artist or song name!
            </div>
          ) : (
            <table className="song-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th>Title</th>
                  <th>Album</th>
                  <th style={{ width: '70px' }}>Time</th>
                  <th style={{ width: '80px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((song, idx) => {
                  if (!song) return null;
                  const isCurrent = currentSong?._id === song._id;
                  const isLiked = isSongLiked ? isSongLiked(song._id, song.title) : false;
                  return (
                    <tr
                      key={`${song._id || 's'}-${idx}`}
                      className={`song-row ${isCurrent ? 'active' : ''}`}
                      onClick={() => handleSongClick(song)}
                    >
                      <td className="track-num-cell">
                        <div className="track-num-wrapper">
                          {isCurrent ? (
                            isPlaying ? (
                              <Pause size={16} fill="var(--spotify-green)" color="var(--spotify-green)" className="track-active-icon" />
                            ) : (
                              <Play size={16} fill="var(--spotify-green)" color="var(--spotify-green)" className="track-active-icon" style={{ marginLeft: '2px' }} />
                            )
                          ) : (
                            <>
                              <span className="track-num-text">{idx + 1}</span>
                              <Play size={15} fill="#fff" color="#fff" className="track-hover-play" style={{ marginLeft: '2px' }} />
                            </>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="song-cell-title">
                          <img
                            src={song.coverUrl || '/card1img.jpeg'}
                            alt={song.title || 'Track'}
                            className="song-cell-thumb"
                            onError={(e) => {
                              e.target.src = '/card1img.jpeg';
                            }}
                          />
                          <div className="song-cell-text">
                            <span className="main-text">{song.title || 'Untitled'}</span>
                            <span className="sub-text">{song.artist || 'Unknown Artist'}</span>
                          </div>
                        </div>
                      </td>
                      <td>{song.album || 'Single'}</td>
                      <td>{song.duration || '03:30'}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            className={`like-btn ${isLiked ? 'liked' : ''}`}
                            title={isLiked ? 'Liked' : 'Like song'}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (toggleLike) toggleLike(song);
                            }}
                          >
                            <Heart size={16} fill={isLiked ? 'var(--spotify-green)' : 'transparent'} />
                          </button>
                          {onOpenAddToPlaylist && (
                            <button
                              className="icon-btn"
                              title="Add to playlist"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenAddToPlaylist(song);
                              }}
                            >
                              <PlusCircle size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ) : (

        <div>
          <h2 className="section-title" style={{ marginBottom: '20px' }}>
            Browse All Categories
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              gap: '16px',
            }}
          >
            {browseCategories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => setSearchQuery && setSearchQuery(cat.query)}
                style={{
                  backgroundColor: cat.color,
                  borderRadius: '8px',
                  height: '130px',
                  padding: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '1.15rem',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

