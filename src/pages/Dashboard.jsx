import { useState } from 'react';
import { Link } from 'react-router-dom';
import conferences from '../conference.js';
import { parseTimeToMinutes } from '../utils.js';
import { getTheme, decoBgStyle, crimsonBright } from '../theme.js';

function RegisteredCard({ conf, theme }) {
  return (
    <div
      className="rounded-xl border overflow-hidden flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-300"
      style={{ backgroundColor: theme.panel, borderColor: theme.border }}
    >
      <Link to={`/conference/${conf.id}`} className="p-5 flex flex-col gap-3">
        {conf.image && (
          <div className="h-32 w-full border overflow-hidden" style={{ borderColor: theme.border }}>
            <img src={conf.image} alt={conf.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <span className="text-xs font-['Montserrat'] tracking-widest uppercase" style={{ color: theme.accent }}>
            {conf.date}
          </span>
          <h3 className="font-['Bodoni_Moda'] text-lg mt-1" style={{ color: theme.text }}>{conf.title}</h3>
          <p className="text-sm font-['Montserrat'] mt-1" style={{ color: theme.muted }}>{conf.location}</p>
        </div>
      </Link>
    </div>
  );
}

function RegisteredCardWithUnregister({ conf, theme, onUnregister }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div
      className="rounded-xl border overflow-hidden flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-300 p-5"
      style={{ backgroundColor: theme.panel, borderColor: theme.border }}
    >
      <Link to={`/conference/${conf.id}`}>
        {conf.image && (
          <div className="h-32 w-full border overflow-hidden" style={{ borderColor: theme.border }}>
            <img src={conf.image} alt={conf.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="mt-3">
          <span className="text-xs font-['Montserrat'] tracking-widest uppercase" style={{ color: theme.accent }}>
            {conf.date}
          </span>
          <h3 className="font-['Bodoni_Moda'] text-lg mt-1" style={{ color: theme.text }}>{conf.title}</h3>
          <p className="text-sm font-['Montserrat'] mt-1" style={{ color: theme.muted }}>{conf.location}</p>
        </div>
      </Link>

      {confirming ? (
        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={() => { onUnregister(conf.id); setConfirming(false); }}
            className="text-xs font-['Montserrat'] uppercase tracking-widest font-bold hover:underline"
            style={{ color: crimsonBright }}
          >
            Confirm
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="text-xs font-['Montserrat'] uppercase tracking-widest font-bold hover:underline"
            style={{ color: theme.muted }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="mt-2 text-xs font-['Montserrat'] uppercase tracking-widest font-bold self-start hover:underline transition-all"
          style={{ color: crimsonBright }}
        >
          Unregister
        </button>
      )}
    </div>
  );
}

function Dashboard({ registeredIds, onUnregister, selectedSessions, isDarkMode }) {
  const theme = getTheme(isDarkMode);
  const registeredConferences = conferences.filter((conf) =>
    registeredIds.includes(conf.id)
  );

  return (
    <div className="min-h-screen pb-16" style={decoBgStyle(theme)}>
      <div className="px-6 pt-14 pb-6 max-w-5xl mx-auto text-center">
        <p className="text-xs font-['Montserrat'] tracking-[0.3em] uppercase mb-3" style={{ color: theme.muted }}>
          Your Pass
        </p>
        <h1 className="font-['Bodoni_Moda'] text-4xl" style={{ color: theme.accent }}>My Dashboard</h1>
        <p className="font-['Montserrat'] text-sm mt-2" style={{ color: theme.muted }}>
          Registered conferences and personal schedule
        </p>
      </div>

      <div className="px-6 max-w-5xl mx-auto">
        {/* Registered Conferences */}
        <section className="mb-16">
          <h2 className="font-['Montserrat'] text-xs text-center mb-8 uppercase tracking-widest border-b pb-3 max-w-xs mx-auto" style={{ color: theme.muted, borderColor: theme.border }}>
            Registered Conferences
          </h2>

          {registeredConferences.length === 0 ? (
            <div className="border border-dashed rounded-xl flex flex-col items-center justify-center py-14 text-center" style={{ borderColor: theme.border }}>
              <p className="font-['Montserrat']" style={{ color: theme.muted }}>You haven't registered for any conferences yet.</p>
              <Link to="/" className="hover:underline text-sm mt-2 font-['Montserrat'] uppercase tracking-wide" style={{ color: theme.accent }}>
                Discover conferences →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredConferences.map((conf) => (
                <RegisteredCardWithUnregister key={conf.id} conf={conf} theme={theme} onUnregister={onUnregister} />
              ))}
            </div>
          )}
        </section>

        {/* My Schedule */}
        <section>
          <h2 className="font-['Montserrat'] text-xs text-center mb-8 uppercase tracking-widest border-b pb-3 max-w-xs mx-auto" style={{ color: theme.muted, borderColor: theme.border }}>
            My Schedule
          </h2>

          {selectedSessions.length === 0 ? (
            <div className="border border-dashed rounded-xl flex flex-col items-center justify-center py-14 text-center" style={{ borderColor: theme.border }}>
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
                    (other) => other !== session && Math.abs(parseTimeToMinutes(other.time) - parseTimeToMinutes(session.time)) < 60
                  );

                  return (
                    <div
                      key={index}
                      className="relative flex items-center justify-between p-4 pl-6 rounded-lg border-l-2"
                      style={{
                        backgroundColor: theme.panel,
                        borderColor: hasConflict ? crimsonBright : theme.border,
                      }}
                    >
                      {hasConflict && (
                        <div
                          className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: crimsonBright }}
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