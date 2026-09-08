import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home.jsx";
import ConferenceDetails from "./pages/ConferenceDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Speakers from "./pages/Speakers.jsx";
import Venues from "./pages/Venues.jsx";
import Contact from "./pages/Contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import Chatbot from "./components/Chatbot.jsx";
import { getTheme, decoBgStyle, gold, crimsonBright } from "./theme.js";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = getTheme(isDarkMode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [registeredIds, setRegisteredIds] = useState(() => {
    const saved = localStorage.getItem('registeredIds');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('registeredIds', JSON.stringify(registeredIds));
  }, [registeredIds]);

  function registerConference(id) {
    setRegisteredIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }
  function unregisterConference(id) {
    setRegisteredIds((prev) => prev.filter((rid) => rid !== id));
  }

  const [viewedDomains, setViewedDomains] = useState([]);
  function trackDomainView(domain) {
    setViewedDomains((prev) => [...prev, domain]);
  }

  const [selectedSessions, setSelectedSessions] = useState(() => {
    const saved = localStorage.getItem('selectedSessions');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('selectedSessions', JSON.stringify(selectedSessions));
  }, [selectedSessions]);

  function addToSchedule(session) {
    setSelectedSessions((prev) => {
      const alreadyAdded = prev.some(
        (s) => s.conferenceId === session.conferenceId && s.time === session.time && s.title === session.title
      );
      return alreadyAdded ? prev : [...prev, session];
    });
  }
  function removeFromSchedule(session) {
    setSelectedSessions((prev) =>
      prev.filter(
        (s) => !(s.conferenceId === session.conferenceId && s.time === session.time && s.title === session.title)
      )
    );
  }

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  function handleLogin(user) {
    setCurrentUser(user);
  }
  function handleRegisterUser(user) {
    setCurrentUser(user);
  }
  function handleLogout() {
    setCurrentUser(null);
    setIsMenuOpen(false);
  }

  const navbarBg = isDarkMode ? '#4A0815' : crimsonBright;
  const navLinkStyle = { color: 'rgba(255,248,239,0.85)' };

  const navLinks = (
    <>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle dark mode"
        className="relative flex items-center w-11 h-6 p-0.5 rounded-full transition-colors duration-300"
        style={{
          backgroundColor: isDarkMode ? 'rgba(21,10,10,0.55)' : 'rgba(255,248,239,0.3)',
          border: `1px solid ${gold}`,
        }}
      >
        <span
          className="flex items-center justify-center shadow-md transition-transform duration-300"
          style={{
            width: 18,
            height: 18,
            borderRadius: 9999,
            background: `radial-gradient(circle at 30% 30%, #FFE9A8, ${gold})`,
            fontSize: 10,
            color: '#150A0A',
            transform: isDarkMode ? 'translateX(20px)' : 'translateX(0px)',
            boxShadow: '0 0 6px rgba(212,175,55,0.7)',
          }}
        >
          {isDarkMode ? '☾' : '☀'}
        </span>
      </button>

      <Link to="/" onClick={() => setIsMenuOpen(false)} className="uppercase font-bold hover:opacity-70 transition-opacity" style={navLinkStyle}>
        Discover
      </Link>
      <Link to="/speakers" onClick={() => setIsMenuOpen(false)} className="uppercase font-bold hover:opacity-70 transition-opacity" style={navLinkStyle}>
        Speakers
      </Link>
      <Link to="/venues" onClick={() => setIsMenuOpen(false)} className="uppercase font-bold hover:opacity-70 transition-opacity" style={navLinkStyle}>
        Venues
      </Link>
      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="uppercase font-bold hover:opacity-70 transition-opacity" style={navLinkStyle}>
        Schedule
      </Link>

      {currentUser ? (
        <>
          <span className="uppercase font-bold" style={navLinkStyle}>
            Welcome, {currentUser.name}
          </span>
          <button
            onClick={handleLogout}
            className="uppercase px-3 py-1 rounded-full font-bold transition-transform hover:scale-105"
            style={{ backgroundColor: '#FFF8EF', color: crimsonBright }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="uppercase font-bold hover:opacity-70 transition-opacity" style={navLinkStyle}>
            Login
          </Link>
          <Link
            to="/register"
            onClick={() => setIsMenuOpen(false)}
            className="uppercase px-3 py-1 rounded-full font-bold transition-transform hover:scale-105"
            style={{ backgroundColor: '#FFF8EF', color: crimsonBright }}
          >
            Register
          </Link>
        </>
      )}
    </>
  );

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{ color: theme.text, ...decoBgStyle(theme) }}>
        {/* Navbar */}
        <nav
          className="px-4 sm:px-6 py-3 sticky top-0 z-40 border-b-2 transition-colors duration-300"
          style={{ backgroundColor: navbarBg, borderColor: gold }}
        >
          <div className="flex items-center justify-between">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="font-['Bodoni_Moda'] text-base sm:text-lg hover:opacity-80 transition-opacity"
              style={{ color: '#FFF8EF' }}
            >
              LinConference Hub
            </Link>

            {/* Desktop nav — full row */}
            <div className="hidden md:flex flex-wrap items-center gap-4 text-sm font-['Montserrat'] uppercase tracking-widest">
              {navLinks}
            </div>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
            >
              <span className="block w-6 h-0.5 transition-transform" style={{ backgroundColor: '#FFF8EF', transform: isMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }}></span>
              <span className="block w-6 h-0.5 transition-opacity" style={{ backgroundColor: '#FFF8EF', opacity: isMenuOpen ? 0 : 1 }}></span>
              <span className="block w-6 h-0.5 transition-transform" style={{ backgroundColor: '#FFF8EF', transform: isMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }}></span>
            </button>
          </div>

          {/* Mobile dropdown panel */}
          {isMenuOpen && (
            <div className="md:hidden flex flex-col items-start gap-4 mt-4 pb-2 text-sm font-['Montserrat'] uppercase tracking-widest animate-fade-in-up">
              {navLinks}
            </div>
          )}
        </nav>

        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={<Home viewedDomains={viewedDomains} onTrackDomainView={trackDomainView} isDarkMode={isDarkMode} />}
            />
            <Route
              path="/conference/:id"
              element={
                <ConferenceDetails
                  registeredIds={registeredIds}
                  onRegister={registerConference}
                  onUnregister={unregisterConference}
                  selectedSessions={selectedSessions}
                  onAddSession={addToSchedule}
                  onRemoveSession={removeFromSchedule}
                  isDarkMode={isDarkMode}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  registeredIds={registeredIds}
                  onUnregister={unregisterConference}
                  selectedSessions={selectedSessions}
                  isDarkMode={isDarkMode}
                />
              }
            />
            <Route path="/login" element={<Login isDarkMode={isDarkMode} onLogin={handleLogin} />} />
            <Route path="/register" element={<Register isDarkMode={isDarkMode} onRegister={handleRegisterUser} />} />
            <Route path="/speakers" element={<Speakers isDarkMode={isDarkMode} />} />
            <Route path="/venues" element={<Venues isDarkMode={isDarkMode} />} />
            <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
            <Route path="/privacy" element={<PrivacyPolicy isDarkMode={isDarkMode} />} />
            <Route path="/terms" element={<TermsOfService isDarkMode={isDarkMode} />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="border-t-2 mt-auto" style={{ backgroundColor: theme.panelAlt, borderColor: theme.accent }}>
          <div className="flex flex-col items-center gap-4 px-6 py-10 max-w-4xl mx-auto text-center">
            <div className="font-['Bodoni_Moda'] text-2xl" style={{ color: theme.accent }}>
              LinConference Hub
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-base font-['Montserrat'] uppercase tracking-widest">
              <Link to="/contact" className="uppercase font-bold hover:underline transition-all" style={{ color: theme.muted }}>Contact</Link>
              <Link to="/privacy" className="uppercase font-bold hover:underline transition-all" style={{ color: theme.muted }}>Privacy Policy</Link>
              <Link to="/terms" className="uppercase font-bold hover:underline transition-all" style={{ color: theme.muted }}>Terms of Service</Link>
            </nav>
            <p className="text-xs font-['Montserrat'] uppercase tracking-widest opacity-70" style={{ color: theme.muted }}>
              © 2026 LinConference Hub — Lincoln University College Internship Project
            </p>
          </div>
        </footer>

        <Chatbot isDarkMode={isDarkMode} />
      </div>
    </BrowserRouter>
  );
}

export default App;