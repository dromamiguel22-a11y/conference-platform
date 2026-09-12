import { Link } from 'react-router-dom';
import { getTheme, decoBgStyle } from '../theme.js';

function NotFound({ isDarkMode }) {
  const theme = getTheme(isDarkMode);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={decoBgStyle(theme)}>
      <div className="w-full max-w-md rounded-xl border px-8 py-14 text-center" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
        <p className="text-3xl mb-4" style={{ color: theme.accent }}>◆</p>
        <h1 className="font-['Bodoni_Moda'] text-3xl mb-3" style={{ color: theme.accent }}>
          Lost in the Assembly
        </h1>
        <p className="font-['Montserrat'] text-sm mb-8" style={{ color: theme.muted }}>
          This page doesn't exist — perhaps it hasn't been written into the program yet.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-lg font-['Montserrat'] uppercase tracking-widest font-bold text-white transition-transform hover:scale-105"
          style={{ backgroundColor: theme.accent }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;