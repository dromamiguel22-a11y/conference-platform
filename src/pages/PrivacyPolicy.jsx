import { Link } from 'react-router-dom';
import { getTheme, decoBgStyle } from '../theme.js';

function PrivacyPolicy({ isDarkMode }) {
  const theme = getTheme(isDarkMode);

  return (
    <div className="min-h-screen pb-16" style={decoBgStyle(theme)}>
      <div className="px-6 pt-14 pb-6 max-w-3xl mx-auto text-center">
        <p className="text-xs font-['Montserrat'] tracking-[0.3em] uppercase mb-3" style={{ color: theme.muted }}>
          Your Trust Matters
        </p>
        <h1 className="font-['Bodoni_Moda'] text-4xl" style={{ color: theme.accent }}>
          Privacy Policy
        </h1>
      </div>

      <div className="px-6 max-w-3xl mx-auto">
        <div className="rounded-xl border p-8 md:p-10 font-['Montserrat'] text-sm leading-relaxed space-y-4" style={{ backgroundColor: theme.panel, borderColor: theme.border, color: theme.text }}>
          <p>
            LinConference Hub was built as a student internship project. This page exists to be transparent about
            what happens with your information when you use the site.
          </p>
          <p>
            <strong style={{ color: theme.accent }}>Accounts:</strong> When you register or log in, your name,
            email, and password are stored only in your own browser's local storage. Nothing is sent to a
            real server or database — there is no backend collecting or sharing this information.
          </p>
          <p>
            <strong style={{ color: theme.accent }}>Registrations & Schedule:</strong> Conferences you register for
            and sessions you add to your schedule are also stored locally in your browser, and stay on the
            device you used to create them.
          </p>
          <p>
            <strong style={{ color: theme.accent }}>The Assistant:</strong> Messages you send to the chatbot are
            sent to Google's Gemini API to generate a response. No other personal data is included in that
            request beyond the message itself.
          </p>
          <p>
            <strong style={{ color: theme.accent }}>Contact Form:</strong> Messages submitted through the Contact
            page are not actually sent anywhere — this is a demonstration feature only.
          </p>
          <p>
            This project does not use cookies, analytics, or third-party tracking of any kind.
          </p>
        </div>

        <p className="text-center mt-6 font-['Montserrat'] text-sm">
          <Link to="/" className="hover:underline" style={{ color: theme.accent }}>
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;