import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTheme, decoBgStyle, crimsonBright } from '../theme.js';
import { loginUser } from '../auth.js';

function Login({ isDarkMode, onLogin }) {
  const theme = getTheme(isDarkMode);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    const result = loginUser({ email, password });
    if (!result.success) {
      setError(result.error);
      return;
    }
    onLogin(result.user);
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={decoBgStyle(theme)}>
      <div className="ziggurat-frame w-full max-w-md animate-fade-in-up" style={{ '--frame-color': theme.accent }}>
        <div className="ziggurat-inner px-8 py-10" style={{ backgroundColor: theme.panel }}>
          <p className="text-xs font-['Montserrat'] tracking-[0.3em] uppercase text-center mb-2" style={{ color: theme.accent }}>
            ✦ Welcome Back ✦
          </p>
          <h1 className="font-['Bodoni_Moda'] text-3xl text-center mb-8" style={{ color: theme.accent }}>
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-['Montserrat'] uppercase tracking-widest" style={{ color: theme.muted }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full mt-1 border rounded-lg px-4 py-2.5 font-['Montserrat'] focus:outline-none transition-colors"
                style={{ backgroundColor: theme.panelAlt, borderColor: theme.border, color: theme.text }}
              />
            </div>

            <div>
              <label className="text-xs font-['Montserrat'] uppercase tracking-widest" style={{ color: theme.muted }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1 border rounded-lg px-4 py-2.5 font-['Montserrat'] focus:outline-none transition-colors"
                style={{ backgroundColor: theme.panelAlt, borderColor: theme.border, color: theme.text }}
              />
            </div>

            {error && (
              <p className="text-sm font-['Montserrat']" style={{ color: crimsonBright }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 py-3 rounded-lg font-['Montserrat'] uppercase tracking-widest font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: crimsonBright }}
            >
              Sign In
            </button>
          </form>

          <p className="text-sm font-['Montserrat'] text-center mt-6" style={{ color: theme.muted }}>
            Don't have an account?{' '}
            <Link to="/register" className="font-bold hover:underline" style={{ color: theme.accent }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;