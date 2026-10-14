import React, { useState, useEffect } from 'react';
import { X, Music, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const isInitialLogin = initialMode !== 'register' && initialMode !== 'signup';
  const [isLogin, setIsLogin] = useState(isInitialLogin);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  useEffect(() => {
    const isModeLogin = initialMode !== 'register' && initialMode !== 'signup';
    setIsLogin(isModeLogin);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (!isLogin && !name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!isLogin && password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(email.trim(), password);
      } else {
        result = await register(name.trim(), email.trim(), password);
      }

      if (result.success) {
        setName('');
        setEmail('');
        setPassword('');
        setError('');
        onClose();
      } else {
        setError(result.message || 'Authentication failed');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '420px', padding: '32px 28px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--spotify-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
              }}
            >
              <Music size={20} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
              Spotify
            </span>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ marginTop: '4px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>
            {isLogin ? 'Log in to Spotify' : 'Sign up to start listening'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#a7a7a7' }}>
            {isLogin
              ? 'Access your saved playlists, liked tracks, and personalized music.'
              : 'Create your account to save playlists and like your favorite songs.'}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            background: '#181818',
            padding: '4px',
            borderRadius: '8px',
            marginTop: '12px',
            marginBottom: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
            style={{
              flex: 1,
              padding: '9px 0',
              borderRadius: '6px',
              border: 'none',
              background: isLogin ? 'var(--spotify-green)' : 'transparent',
              color: isLogin ? '#000' : '#b3b3b3',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
            style={{
              flex: 1,
              padding: '9px 0',
              borderRadius: '6px',
              border: 'none',
              background: !isLogin ? 'var(--spotify-green)' : 'transparent',
              color: !isLogin ? '#000' : '#b3b3b3',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(233, 20, 41, 0.15)',
              border: '1px solid #e91429',
              borderRadius: '6px',
              padding: '10px 14px',
              fontSize: '0.85rem',
              color: '#ff7070',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {!isLogin && (
            <div>
              <label style={{ fontSize: '0.8rem', color: '#b3b3b3', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                What should we call you?
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Enter your profile name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: '38px' }}
                  required={!isLogin}
                />
                <User
                  size={18}
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', color: '#b3b3b3', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
              Email address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="modal-input"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '38px' }}
                required
              />
              <Mail
                size={18}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#b3b3b3', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="modal-input"
                placeholder="Password (minimum 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '38px' }}
                required
              />
              <Lock
                size={18}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="badge-btn"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: 'var(--spotify-green)',
              color: '#000',
              fontWeight: 700,
              fontSize: '0.95rem',
              borderRadius: '500px',
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spin-animation" />
                <span>{isLogin ? 'Logging in...' : 'Creating account...'}</span>
              </>
            ) : (
              <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
            )}
          </button>
        </form>

        <div style={{ borderTop: '1px solid #3e3e3e', paddingTop: '16px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: '#b3b3b3' }}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={switchMode}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontWeight: 700,
                marginLeft: '6px',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {isLogin ? 'Sign up for Spotify' : 'Log in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

