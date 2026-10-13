import React, { useState } from 'react';
import { X } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';

export default function PlaylistModal({ isOpen, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const { createPlaylist } = usePlaylist();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    const created = await createPlaylist(name.trim(), desc.trim());
    setLoading(false);
    if (created) {
      setName('');
      setDesc('');
      onClose();
      if (onCreated) onCreated(created);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create Playlist</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#b3b3b3', display: 'block', marginBottom: '6px' }}>
              Name
            </label>
            <input
              type="text"
              className="modal-input"
              placeholder="My Playlist #1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#b3b3b3', display: 'block', marginBottom: '6px' }}>
              Description
            </label>
            <textarea
              className="modal-textarea"
              placeholder="Give your playlist a catchy description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="badge-btn dark" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="badge-btn"
              disabled={loading || !name.trim()}
              style={{
                backgroundColor: 'var(--spotify-green)',
                color: '#000',
                opacity: loading || !name.trim() ? 0.6 : 1,
              }}
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
