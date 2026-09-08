import { Link } from 'react-router-dom';
import conferences from '../conference.js';
import { getTheme, decoBgStyle } from '../theme.js';

function Speakers({ isDarkMode }) {
  const theme = getTheme(isDarkMode);

  const allSpeakers = conferences.flatMap((conf) =>
    conf.speakers.map((speaker) => ({
      ...speaker,
      conferenceId: conf.id,
      conferenceTitle: conf.title,
      domain: conf.domain,
    }))
  );

  return (
    <div className="min-h-screen pb-16" style={decoBgStyle(theme)}>
      <div className="px-6 pt-14 pb-6 max-w-5xl mx-auto text-center animate-fade-in-up">
        <p className="text-xs font-['Montserrat'] tracking-[0.3em] uppercase mb-3" style={{ color: theme.accent }}>
          ✦ The Vanguard ✦
        </p>
        <h1 className="font-['Bodoni_Moda'] text-4xl" style={{ color: theme.accent }}>
          Distinguished Speakers
        </h1>
        <p className="font-['Montserrat'] text-sm mt-2" style={{ color: theme.muted }}>
          {allSpeakers.length} voices shaping this year's Grand Assembly
        </p>
      </div>

      <div className="px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {allSpeakers.map((speaker, index) => (
            <Link
              key={index}
              to={`/conference/${speaker.conferenceId}`}
              className="animate-fade-in-up flex flex-col items-center text-center group"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="relative w-20 h-20 mb-3 transition-transform duration-300 group-hover:scale-110">
                <div className="absolute inset-0 rounded-full border-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ borderColor: theme.accent }}></div>
                <div className="absolute inset-1.5 rounded-full border flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(212,175,55,0.4)] transition-shadow duration-300" style={{ borderColor: theme.accent, backgroundColor: theme.panelAlt }}>
                  <span className="font-['Bodoni_Moda'] text-lg" style={{ color: theme.accent }}>{speaker.name.charAt(0)}</span>
                </div>
              </div>
              <h3 className="font-['Montserrat'] text-xs font-bold uppercase" style={{ color: theme.text }}>{speaker.name}</h3>
              <p className="text-[11px] font-['Montserrat'] mt-1" style={{ color: theme.accent }}>{speaker.topic}</p>
              <p className="text-[10px] font-['Montserrat'] uppercase tracking-wide mt-1 opacity-70" style={{ color: theme.muted }}>
                {speaker.conferenceTitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Speakers;