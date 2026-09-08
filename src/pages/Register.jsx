import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTheme, decoBgStyle, crimsonBright } from '../theme.js';
import { registerUser } from '../auth.js';

function Register({ isDarkMode, onRegister }) {
  const theme = getTheme(isDarkMode);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in every field.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    const result = registerUser({ name, email, password });
    if (!result.success) {
      setError(result.error);
      return;
    }
    onRegister(result.user);
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={decoBgStyle(theme)}>
      <div className="ziggurat-frame w-full max-w-md animate-fade-in-up" style={{ '--frame-color': theme.accent }}>
        <div className="ziggurat-inner px-8 py-10" style={{ backgroundColor: theme.panel }}>
          <p className="text-xs font-['Montserrat'] tracking-[0.3em] uppercase text-center mb-2" style={{ color: theme.accent }}>
            ✦ Join the Assembly ✦
          </p>
          <h1 className="font-['Bodoni_Moda'] text-3xl text-center mb-8" style={{ color: theme.accent }}>
            Register
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-['Montserrat'] uppercase tracking-widest" style={{ color: theme.muted }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full mt-1 border rounded-lg px-4 py-2.5 font-['Montserrat'] focus:outline-none transition-colors"
                style={{ backgroundColor: theme.panelAlt, borderColor: theme.border, color: theme.text }}
              />
            </div>

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
                placeholder="At least 6 characters"
                className="w-full mt-1 border rounded-lg px-4 py-2.5 font-['Montserrat'] focus:outline-none transition-colors"
                style={{ backgroundColor: theme.panelAlt, borderColor: theme.border, color: theme.text }}
              />
            </div>

            <div>
              <label className="text-xs font-['Montserrat'] uppercase tracking-widest" style={{ color: theme.muted }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
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
              Create Account
            </button>
          </form>

          <p className="text-sm font-['Montserrat'] text-center mt-6" style={{ color: theme.muted }}>
            Already have an account?{' '}
            <Link to="/login" className="font-bold hover:underline" style={{ color: theme.accent }}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;