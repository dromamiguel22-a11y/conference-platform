import { Link } from 'react-router-dom';
import conferences from '../conference.js';
import { parseTimeToMinutes } from '../utils.js';
import { getTheme, decoBgStyle, crimson, crimsonBright } from '../theme.js';

function Dashboard({ registeredIds, selectedSessions, isDarkMode }) {
  const theme = getTheme(isDarkMode);
  const registeredConferences = conferences.filter((conf) =>
    registeredIds.includes(conf.id)
  );

  return (
    <div className="min-h-screen pb-16" style={decoBgStyle(theme)}>
      <div className="animate-fade-in-up px-6 pt-14 pb-6 max-w-5xl mx-auto text-center">
        <p className="text-xs font-['Montserrat'] tracking-[0.3em] uppercase mb-3 animate-shimmer" style={{ color: theme.muted }}>
          ✦ Your Pass ✦
        </p>
        <h1 className="font-['Bodoni_Moda'] text-4xl" style={{ color: crimson }}>My Dashboard</h1>
        <p className="font-['Montserrat'] text-sm mt-2" style={{ color: theme.muted }}>
          Registered conferences and personal schedule
        </p>
      </div>

      <div className="px-6 max-w-5xl mx-auto">
        {/* Registered Conferences */}
        <section className="mb-16">
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto mb-8">
            <div className="h-px flex-grow" style={{ backgroundColor: theme.accent }}></div>
            <span className="animate-shimmer" style={{ color: theme.accent }}>◆</span>
            <div className="h-px flex-grow" style={{ backgroundColor: theme.accent }}></div>
          </div>
          <h2 className="font-['Bodoni_Moda'] text-xl text-center mb-8 uppercase tracking-widest" style={{ color: crimson }}>
            Registered Conferences
          </h2>

          {registeredConferences.length === 0 ? (
            <div className="border border-dashed flex flex-col items-center justify-center py-14 text-center transition-colors duration-300" style={{ borderColor: theme.border }}>
              <p className="font-['Montserrat']" style={{ color: theme.muted }}>You haven't registered for any conferences yet.</p>
              <Link to="/" className="hover:underline text-sm mt-2 font-['Montserrat'] uppercase tracking-wide" style={{ color: crimson }}>
                Discover conferences →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredConferences.map((conf, i) => (
                <Link
                  key={conf.id}
                  to={`/conference/${conf.id}`}
                  className="animate-fade-in-up ziggurat-frame transition-all duration-300 hover:scale-[1.03]"
                  style={{ animationDelay: `${i * 90}ms`, '--frame-color': theme.accent }}
                >
                <div className="ziggurat-inner p-5 flex flex-col gap-3 group h-full" style={{ backgroundColor: theme.panel }}>
                  {conf.image && (
                    <div className="h-32 w-full border overflow-hidden" style={{ borderColor: theme.border }}>
                      <img
                        src={conf.image}
                        alt={conf.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                      />
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-['Montserrat'] tracking-widest uppercase" style={{ color: theme.accent }}>
                      {conf.date}
                    </span>
                    <h3 className="font-['Bodoni_Moda'] text-lg mt-1 transition-colors" style={{ color: theme.text }}>{conf.title}</h3>
                    <p className="text-sm font-['Montserrat'] mt-1" style={{ color: theme.muted }}>{conf.location}</p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* My Schedule */}
        <section>
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto mb-8">
            <div className="h-px flex-grow" style={{ backgroundColor: theme.accent }}></div>
            <span className="animate-shimmer" style={{ color: theme.accent }}>✦</span>
            <div className="h-px flex-grow" style={{ backgroundColor: theme.accent }}></div>
          </div>
          <h2 className="font-['Bodoni_Moda'] text-xl text-center mb-8 uppercase tracking-widest" style={{ color: crimson }}>
            My Schedule
          </h2>

          {selectedSessions.length === 0 ? (
            <div className="border border-dashed flex flex-col items-center justify-center py-14 text-center transition-colors duration-300" style={{ borderColor: theme.border }}>
              <p className="font-['Montserrat']" style={{ color: theme.muted }}>No sessions added yet.</p>
              <p className="text-sm font-['Montserrat'] mt-1 opacity-70" style={{ color: theme.muted }}>
                Add sessions from any conference's Agenda.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              {[...selectedSessions]
                .sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time))
                .map((session, index, sortedArray) => {
                  const hasConflict = sortedArray.some(
                    (other) => other !== session && other.time === session.time
                  );

                  return (
                    <div
                      key={index}
                      className="animate-fade-in-up relative flex items-center justify-between p-4 pl-6 transition-all duration-300 hover:translate-x-1 border-l-2"
                      style={{
                        animationDelay: `${index * 90}ms`,
                        backgroundColor: theme.panel,
                        borderColor: hasConflict ? crimsonBright : theme.accent,
                      }}
                    >
                      {hasConflict && (
                        <div
                          className="animate-glow-pulse absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-lg"
                          style={{ backgroundColor: crimsonBright, borderColor: theme.accent }}
                          title="Time Conflict"
                        >
                          <span className="text-white font-bold text-xs">⚠</span>
                        </div>
                      )}
                      <div className="flex items-center gap-6 sm:gap-10">
                        <div className="font-['Montserrat'] text-xs tracking-widest w-20 text-right font-bold" style={{ color: hasConflict ? crimsonBright : theme.accent }}>
                          {session.time}
                        </div>
                        <div>
                          <h4 className="font-['Bodoni_Moda'] text-base" style={{ color: theme.text }}>{session.title}</h4>
                          <p className="text-sm font-['Montserrat'] mt-0.5" style={{ color: theme.muted }}>{session.conferenceTitle}</p>
                        </div>
                      </div>
                      {hasConflict && (
                        <span className="text-[11px] font-['Montserrat'] uppercase tracking-widest shrink-0" style={{ color: crimsonBright }}>
                          Conflict
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;