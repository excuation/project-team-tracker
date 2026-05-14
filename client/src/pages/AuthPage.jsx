import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

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
    } finally {
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <div className="auth-page">
      <style>{`
        .auth-page{
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:24px;
          background:
            radial-gradient(circle at top left, rgba(249,115,22,0.15), transparent 35%),
            radial-gradient(circle at bottom right, rgba(251,146,60,0.15), transparent 30%),
            linear-gradient(135deg, #ffffff 0%, #fff7ed 50%, #ffedd5 100%);
          font-family: Inter, Arial, sans-serif;
          color:#1f2937;
          box-sizing:border-box;
        }

        .auth-shell{
          width:100%;
          max-width:1180px;
          min-height:780px;
          display:grid;
          grid-template-columns:1.1fr 0.9fr;
          border-radius:32px;
          overflow:hidden;
          background:rgba(255,255,255,0.6);
          border:1px solid rgba(249,115,22,0.15);
          box-shadow:0 30px 90px rgba(249,115,22,0.10);
          backdrop-filter:blur(18px);
        }

        .auth-left{
          position:relative;
          padding:70px;
          display:flex;
          flex-direction:column;
          justify-content:center;
          gap:28px;
          background:
            linear-gradient(160deg, rgba(255,237,213,0.6), rgba(255,255,255,0.4), rgba(254,215,170,0.6));
        }

        .auth-right{
          padding:24px;
          display:flex;
          align-items:center;
          justify-content:center;
          background:linear-gradient(180deg, rgba(255,255,255,0.30), rgba(255,255,255,0.70));
        }

        .glow-1, .glow-2{
          position:absolute;
          border-radius:50%;
          pointer-events:none;
          filter:blur(10px);
        }

        .glow-1{
          top:-80px;
          left:-80px;
          width:220px;
          height:220px;
          background:radial-gradient(circle, rgba(249,115,22,0.25), transparent 70%);
        }

        .glow-2{
          bottom:-70px;
          right:30px;
          width:260px;
          height:260px;
          background:radial-gradient(circle, rgba(251,146,60,0.2), transparent 70%);
        }

        .brand-row{
          display:flex;
          align-items:center;
          gap:16px;
          z-index:1;
        }

        .brand-icon{
          width:64px;
          height:64px;
          border-radius:20px;
          display:grid;
          place-items:center;
          background:linear-gradient(135deg, #ea580c, #f97316);
          box-shadow:0 12px 30px rgba(249,115,22,0.3);
          flex-shrink:0;
        }

        .brand-title{
          margin:0;
          font-size:54px;
          line-height:1;
          font-weight:900;
          letter-spacing:-0.05em;
          background:linear-gradient(90deg, #c2410c, #ea580c, #f97316);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }

        .brand-subtitle{
          margin:8px 0 0;
          color:#4b5563;
          font-size:17px;
        }

        .brand-copy{
          z-index:1;
          max-width:560px;
          color:#4b5563;
          font-size:16px;
          line-height:1.8;
        }

        .feature-grid{
          z-index:1;
          display:grid;
          grid-template-columns:repeat(2, minmax(0, 1fr));
          gap:14px;
          max-width:520px;
        }

        .feature-card{
          padding:16px 18px;
          border-radius:18px;
          background:rgba(249,115,22,0.06);
          border:1px solid rgba(249,115,22,0.12);
          display:flex;
          align-items:center;
          gap:12px;
          color:#1f2937;
          box-sizing:border-box;
        }

        .feature-card span:last-child{
          font-size:15px;
          font-weight:600;
        }

        .auth-card{
          width:100%;
          max-width:430px;
          margin:0 auto;
          padding:34px;
          border-radius:28px;
          background:rgba(255,255,255,0.95);
          border:1px solid rgba(249,115,22,0.10);
          box-shadow:0 18px 50px rgba(249,115,22,0.12);
          box-sizing:border-box;
        }

        .toggle-row{
          display:flex;
          gap:8px;
          padding:6px;
          margin-bottom:26px;
          border-radius:16px;
          background:rgba(0,0,0,0.04);
          border:1px solid rgba(0,0,0,0.02);
        }

        .toggle-btn{
          flex:1;
          padding:12px 14px;
          border:none;
          border-radius:12px;
          font-weight:700;
          cursor:pointer;
          transition:0.2s ease;
        }

        .toggle-btn.active{
          background:linear-gradient(135deg, #ea580c, #f97316);
          color:#fff;
          box-shadow:0 4px 12px rgba(249,115,22,0.2);
        }

        .toggle-btn.inactive{
          background:transparent;
          color:#4b5563;
        }

        .title-block{
          margin-bottom:18px;
        }

        .form-title{
          font-size:28px;
          font-weight:800;
          margin-bottom:6px;
          color:#111827;
        }

        .form-subtitle{
          color:#6b7280;
          font-size:14px;
        }

        .error-box{
          background:rgba(254,226,226,0.85);
          border:1px solid rgba(252,165,165,0.35);
          padding:12px 14px;
          border-radius:12px;
          margin-bottom:16px;
          color:#991b1b;
          font-size:14px;
        }

        .form-grid{
          display:grid;
          gap:16px;
        }

        .field label{
          display:block;
          margin-bottom:8px;
          color:#4b5563;
          font-size:14px;
          font-weight:500;
        }

        .field input,
        .field select{
          width:100%;
          padding:14px 16px;
          border-radius:14px;
          border:1px solid rgba(0, 0, 0, 0.1);
          background:rgba(255,255,255,0.8);
          color:#1f2937;
          outline:none;
          font-size:15px;
          box-sizing:border-box;
          backdrop-filter:blur(10px);
        }

        .field input::placeholder{
          color:#94a3b8;
        }

        .submit-btn{
          margin-top:6px;
          padding:14px 16px;
          border:none;
          border-radius:14px;
          background:linear-gradient(135deg, #ea580c, #f97316);
          color:#fff;
          font-weight:800;
          font-size:16px;
          cursor:pointer;
          box-shadow:0 14px 30px rgba(249,115,22,0.25);
          transition:0.2s ease;
        }

        .submit-btn:disabled{
          opacity:0.8;
          cursor:not-allowed;
        }

        @media (max-width: 1024px){
          .auth-shell{
            grid-template-columns:1fr;
            min-height:auto;
          }

          .auth-left{
            padding:56px 40px;
          }

          .auth-right{
            padding:24px 20px 40px;
          }

          .auth-card{
            max-width:520px;
          }
        }

        @media (max-width: 768px){
          .auth-page{
            padding:16px;
          }

          .auth-left{
            padding:40px 24px;
          }

          .brand-row{
            align-items:flex-start;
          }

          .brand-title{
            font-size:42px;
          }

          .brand-subtitle{
            font-size:15px;
          }

          .brand-copy{
            font-size:15px;
          }

          .feature-grid{
            grid-template-columns:1fr;
            max-width:100%;
          }

          .auth-card{
            padding:24px;
            border-radius:24px;
          }

          .form-title{
            font-size:24px;
          }
        }

        @media (max-width: 480px){
          .auth-page{
            padding:10px;
          }

          .auth-left{
            padding:28px 18px;
            gap:18px;
          }

          .brand-row{
            flex-direction:column;
            align-items:flex-start;
          }

          .brand-icon{
            width:58px;
            height:58px;
            border-radius:18px;
          }

          .brand-title{
            font-size:34px;
          }

          .brand-subtitle{
            font-size:14px;
          }

          .brand-copy{
            font-size:14px;
            line-height:1.7;
          }

          .auth-right{
            padding:16px 12px 24px;
          }

          .auth-card{
            padding:18px;
            border-radius:20px;
          }

          .toggle-row{
            flex-direction:column;
          }

          .toggle-btn{
            width:100%;
          }
        }
      `}</style>

      <div className="auth-shell">
        <div className="auth-left">
          <div className="glow-1" />
          <div className="glow-2" />

          <div className="brand-row">
            <div className="brand-icon">
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
              <h1 className="brand-title">Ethara AI</h1>
              <p className="brand-subtitle">Intelligent Task Management for Modern Teams</p>
            </div>
          </div>

          <div className="brand-copy">
            Manage work faster, collaborate smarter, and keep every task visible in one clean workspace.
          </div>

          <div className="feature-grid">
            {[
              { icon: '📊', text: 'Real-time Dashboard' },
              { icon: '👥', text: 'Team Collaboration' },
              { icon: '🔒', text: 'Role-based Access' },
              { icon: '📋', text: 'Smart Task Tracking' },
            ].map((item, index) => (
              <div key={index} className="feature-card">
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <div className="toggle-row">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
                className={`toggle-btn ${isLogin ? 'active' : 'inactive'}`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                className={`toggle-btn ${!isLogin ? 'active' : 'inactive'}`}
              >
                Sign Up
              </button>
            </div>

            <div className="title-block">
              <div className="form-title">{isLogin ? 'Welcome back' : 'Create account'}</div>
              <div className="form-subtitle">
                {isLogin ? 'Sign in to continue.' : 'Fill the details below to get started.'}
              </div>
            </div>

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit} className="form-grid">
              {!isLogin && (
                <div className="field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              )}

              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="you@ethara.ai"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Min 6 characters"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              {!isLogin && (
                <div className="field">
                  <label>Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}