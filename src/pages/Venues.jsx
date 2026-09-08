import { Link } from 'react-router-dom';
import conferences from '../conference.js';
import { getTheme, decoBgStyle } from '../theme.js';

function Venues({ isDarkMode }) {
  const theme = getTheme(isDarkMode);

  const venueMap = {};
  conferences.forEach((conf) => {
    if (!venueMap[conf.location]) {
      venueMap[conf.location] = [];
    }
    venueMap[conf.location].push(conf);
  });
  const venues = Object.entries(venueMap);

  return (
    <div className="min-h-screen pb-16" style={decoBgStyle(theme)}>
      <div className="px-6 pt-14 pb-6 max-w-5xl mx-auto text-center animate-fade-in-up">
        <p className="text-xs font-['Montserrat'] tracking-[0.3em] uppercase mb-3" style={{ color: theme.accent }}>
          ✦ Where It Happens ✦
        </p>
        <h1 className="font-['Bodoni_Moda'] text-4xl" style={{ color: theme.accent }}>
          Featured Venues
        </h1>
        <p className="font-['Montserrat'] text-sm mt-2" style={{ color: theme.muted }}>
          {venues.length} cities hosting this year's assembly
        </p>
      </div>

      <div className="px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {venues.map(([location, confs], index) => (
            <div
              key={location}
              className="ziggurat-frame animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms`, '--frame-color': theme.accent }}
            >
              <div className="ziggurat-inner p-6" style={{ backgroundColor: theme.panel }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-['Bodoni_Moda'] text-2xl" style={{ color: theme.text }}>{location}</h2>
                  <span
                    className="text-[10px] font-['Montserrat'] uppercase tracking-widest px-2 py-1 rounded-full"
                    style={{ backgroundColor: theme.panelAlt, color: theme.accent }}
                  >
                    {confs.length} {confs.length === 1 ? 'event' : 'events'}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {confs.map((conf) => (
                    <Link
                      key={conf.id}
                      to={`/conference/${conf.id}`}
                      className="flex items-center justify-between border-t pt-3 first:border-t-0 first:pt-0 group"
                      style={{ borderColor: theme.border }}
                    >
                      <div>
                        <p className="font-['Montserrat'] text-sm font-semibold group-hover:underline" style={{ color: theme.text }}>
                          {conf.title}
                        </p>
                        <p className="text-[11px] font-['Montserrat'] uppercase tracking-wide" style={{ color: theme.muted }}>
                          {conf.domain}
                        </p>
                      </div>
                      <span className="text-xs font-['Montserrat'] shrink-0" style={{ color: theme.accent }}>
                        {conf.date}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Venues;