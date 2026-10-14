import React, { useState } from 'react';
import { X, User, LogOut, Edit3, Calendar, Mail, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfileModal({ isOpen, onClose }) {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  if (!isOpen || !user) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    const res = await updateProfile({ name: name.trim(), bio: bio.trim() });
    setLoading(false);

    if (res.success) {
      setStatusMsg({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } else {
      setStatusMsg({ type: 'error', text: res.message || 'Failed to update profile' });
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : 'Recently';

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', padding: '28px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your Profile</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            background: 'linear-gradient(135deg, rgba(30, 215, 96, 0.2), rgba(18, 18, 18, 0.6))',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1db954, #1ed760)',
              color: '#000',
              fontWeight: 800,
              fontSize: '1.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              flexShrink: 0,
            }}
          >
            {userInitial}
          </div>

          <div style={{ overflow: 'hidden' }}>
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--spotify-green)',
                letterSpacing: '1px',
              }}
            >
              Profile
            </span>
            <h2
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                margin: '2px 0 4px 0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user.name}
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                color: '#b3b3b3',
              }}
            >
              <Mail size={13} />
              <span style={{ wordBreak: 'break-all' }}>{user.email}</span>
            </div>
          </div>
        </div>

        {statusMsg.text && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background:
                statusMsg.type === 'success'
                  ? 'rgba(30, 215, 96, 0.15)'
                  : 'rgba(233, 20, 41, 0.15)',
              border: `1px solid ${statusMsg.type === 'success' ? '#1db954' : '#e91429'}`,
              borderRadius: '6px',
              padding: '10px 14px',
              fontSize: '0.85rem',
              color: statusMsg.type === 'success' ? '#1db954' : '#ff7070',
            }}
          >
            {statusMsg.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#b3b3b3', display: 'block', marginBottom: '6px' }}>
                Profile Name
              </label>
              <input
                type="text"
                className="modal-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#b3b3b3', display: 'block', marginBottom: '6px' }}>
                Bio
              </label>
              <textarea
                className="modal-textarea"
                placeholder="Tell listeners about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={200}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '4px' }}>
              <button
                type="button"
                className="badge-btn dark"
                onClick={() => {
                  setName(user.name);
                  setBio(user.bio);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="badge-btn"
                disabled={loading}
                style={{
                  backgroundColor: 'var(--spotify-green)',
                  color: '#000',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {loading && <Loader2 size={16} className="spin-animation" />}
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#a7a7a7', textTransform: 'uppercase', fontWeight: 600 }}>
                Bio
              </span>
              <p style={{ fontSize: '0.9rem', color: '#fff', marginTop: '4px', lineHeight: 1.4 }}>
                {user.bio || 'Music lover on Spotify Clone 🎵'}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                color: '#a7a7a7',
              }}
            >
              <Calendar size={15} />
              <span>Member since {formattedDate}</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button
                className="badge-btn dark"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                onClick={() => setIsEditing(true)}
              >
                <Edit3 size={15} />
                <span>Edit Profile</span>
              </button>

              <button
                className="badge-btn dark"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  borderColor: 'rgba(233, 20, 41, 0.4)',
                  color: '#ff7070',
                }}
                onClick={handleLogout}
              >
                <LogOut size={15} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

