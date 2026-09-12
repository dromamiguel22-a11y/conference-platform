import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTheme, decoBgStyle, crimsonBright } from '../theme.js';

function Contact({ isDarkMode }) {
  const theme = getTheme(isDarkMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in every field.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={decoBgStyle(theme)}>
      <div className="w-full max-w-md rounded-xl border p-8" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
          <p className="text-xs font-['Montserrat'] tracking-[0.3em] uppercase text-center mb-2" style={{ color: theme.muted }}>
            Reach the Assembly
          </p>
          <h1 className="font-['Bodoni_Moda'] text-3xl text-center mb-8" style={{ color: theme.accent }}>
            Contact Us
          </h1>

          {submitted ? (
            <div className="text-center">
              <p className="text-4xl mb-3" style={{ color: theme.accent }}>✦</p>
              <p className="font-['Montserrat']" style={{ color: theme.text }}>
                Thank you, {name}. Your message has been received — we'll be in touch at {email}.
              </p>
              <Link
                to="/"
                className="inline-block mt-6 text-sm font-bold hover:underline"
                style={{ color: theme.accent }}
              >
                ← Back to Home
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-['Montserrat'] uppercase tracking-widest" style={{ color: theme.muted }}>
                    Name
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
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    rows={4}
                    className="w-full mt-1 border rounded-lg px-4 py-2.5 font-['Montserrat'] focus:outline-none transition-colors resize-none"
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
                  Send Message
                </button>
              </form>

              <p className="text-sm font-['Montserrat'] text-center mt-6" style={{ color: theme.muted }}>
                <Link to="/" className="hover:underline" style={{ color: theme.accent }}>
                  ← Back to Home
                </Link>
              </p>
            </>
          )}
      </div>
    </div>
  );
}

export default Contact;