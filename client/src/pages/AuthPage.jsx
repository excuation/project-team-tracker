import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '14px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.8)',
    color: '#1f2937',
    outline: 'none',
    fontSize: '15px',
    boxSizing: 'border-box',
    backdropFilter: 'blur(10px)',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await signup(form.name, form.email, form.password, form.role);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }

    setLoading(false);
  };

  if (user) {
    navigate('/');
    return null;
  }

  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background:
      'radial-gradient(circle at top left, rgba(249,115,22,0.15), transparent 35%), radial-gradient(circle at bottom right, rgba(251,146,60,0.15), transparent 30%), linear-gradient(135deg, #ffffff 0%, #fff7ed 50%, #ffedd5 100%)',
    fontFamily: 'Inter, Arial, sans-serif',
    color: '#1f2937',
  };

  const shellStyle = {
    width: '100%',
    maxWidth: '1180px',
    minHeight: '780px',
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    borderRadius: '32px',
    overflow: 'hidden',
    background: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(249,115,22,0.15)',
    boxShadow: '0 30px 90px rgba(249,115,22,0.1)',
    backdropFilter: 'blur(18px)',
  };

  const leftStyle = {
    position: 'relative',
    padding: '70px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '28px',
    background:
      'linear-gradient(160deg, rgba(255,237,213,0.6), rgba(255,255,255,0.4), rgba(254,215,170,0.6))',
  };

  const glow1 = {
    position: 'absolute',
    top: '-80px',
    left: '-80px',
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(249,115,22,0.25), transparent 70%)',
    filter: 'blur(10px)',
    pointerEvents: 'none',
  };

  const glow2 = {
    position: 'absolute',
    bottom: '-70px',
    right: '30px',
    width: '260px',
    height: '260px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(251,146,60,0.2), transparent 70%)',
    filter: 'blur(10px)',
    pointerEvents: 'none',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '430px',
    margin: '0 auto',
    padding: '34px',
    borderRadius: '28px',
    background: 'rgba(255,255,255,0.95)',
    border: '1px solid rgba(249,115,22,0.1)',
    boxShadow: '0 18px 50px rgba(249,115,22,0.12)',
  };

  return (
    <div style={pageStyle}>
      <div style={shellStyle}>
        <div style={leftStyle}>
          <div style={glow1} />
          <div style={glow2} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(135deg, #ea580c, #f97316)',
                boxShadow: '0 12px 30px rgba(249,115,22,0.3)',
                flexShrink: 0,
              }}
            >
              <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
                <path
                  d="M14 34V18L24 12L34 18V34L24 28L14 34Z"
                  stroke="#fff"
                  strokeWidth="2.8"
                  fill="none"
                />
                <circle cx="24" cy="22" r="4" fill="#fff" opacity="0.95" />
              </svg>
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: '54px',
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: '-0.05em',
                  background: 'linear-gradient(90deg, #c2410c, #ea580c, #f97316)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Ethara AI
              </h1>
              <p style={{ margin: '8px 0 0', color: '#4b5563', fontSize: '17px' }}>
                Intelligent Task Management for Modern Teams
              </p>
            </div>
          </div>

          <div
            style={{
              zIndex: 1,
              maxWidth: '560px',
              color: '#4b5563',
              fontSize: '16px',
              lineHeight: 1.8,
            }}
          >
            Manage work faster, collaborate smarter, and keep every task visible in one clean workspace.
          </div>

          <div
            style={{
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '14px',
              maxWidth: '520px',
            }}
          >
            {[
              { icon: '📊', text: 'Real-time Dashboard' },
              { icon: '👥', text: 'Team Collaboration' },
              { icon: '🔒', text: 'Role-based Access' },
              { icon: '📋', text: 'Smart Task Tracking' },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '16px 18px',
                  borderRadius: '18px',
                  background: 'rgba(249,115,22,0.06)',
                  border: '1px solid rgba(249,115,22,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#1f2937',
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ fontSize: '15px', fontWeight: 600 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.30), rgba(255,255,255,0.70))',
          }}
        >
          <div style={cardStyle}>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                padding: '6px',
                marginBottom: '26px',
                borderRadius: '16px',
                background: 'rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.02)',
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
                  padding: '12px 14px',
                  border: 'none',
                  borderRadius: '12px',
                  background: isLogin
                    ? 'linear-gradient(135deg, #ea580c, #f97316)'
                    : 'transparent',
                  color: isLogin ? '#fff' : '#4b5563',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: '0.2s ease',
                  boxShadow: isLogin ? '0 4px 12px rgba(249,115,22,0.2)' : 'none',
                }}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  border: 'none',
                  borderRadius: '12px',
                  background: !isLogin
                    ? 'linear-gradient(135deg, #ea580c, #f97316)'
                    : 'transparent',
                  color: !isLogin ? '#fff' : '#4b5563',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: '0.2s ease',
                  boxShadow: !isLogin ? '0 4px 12px rgba(249,115,22,0.2)' : 'none',
                }}
              >
                Sign Up
              </button>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px', color: '#111827' }}>
                {isLogin ? 'Welcome back' : 'Create account'}
              </div>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>
                {isLogin ? 'Sign in to continue.' : 'Fill the details below to get started.'}
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: 'rgba(254,226,226,0.85)',
                  border: '1px solid rgba(252,165,165,0.35)',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  color: '#991b1b',
                  fontSize: '14px',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
              {!isLogin && (
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#4b5563', fontSize: '14px', fontWeight: 500 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#4b5563', fontSize: '14px', fontWeight: 500 }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@ethara.ai"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#4b5563', fontSize: '14px', fontWeight: 500 }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Min 6 characters"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {!isLogin && (
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#4b5563', fontSize: '14px', fontWeight: 500 }}>
                    Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: '6px',
                  padding: '14px 16px',
                  border: 'none',
                  borderRadius: '14px',
                  background: loading
                    ? 'linear-gradient(135deg, #d1d5db, #9ca3af)'
                    : 'linear-gradient(135deg, #ea580c, #f97316)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '16px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 14px 30px rgba(249,115,22,0.25)',
                }}
              >
                {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}