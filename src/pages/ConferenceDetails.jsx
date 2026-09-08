import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import conferences from '../conference.js';
import getConferenceStatus from '../utils.js';
import { getTheme, decoBgStyle, crimsonBright } from '../theme.js';

function ConferenceDetails({ registeredIds, onRegister, onUnregister, selectedSessions, onAddSession, onRemoveSession, isDarkMode, currentUser }) {
  const theme = getTheme(isDarkMode);
  const { id } = useParams();
  const conference = conferences.find((conf) => conf.id === Number(id));
  const [confirmingUnregister, setConfirmingUnregister] = useState(false);

  if (!conference) {
    return (
      <div className="min-h-screen p-6" style={decoBgStyle(theme)}>
        <p style={{ color: theme.muted }}>Conference not found.</p>
        <Link to="/" style={{ color: theme.accent }} className="hover:underline">← Back to Home</Link>
      </div>
    );
  }

  const isRegistered = registeredIds.includes(conference.id);
  const status = getConferenceStatus(conference.dateISO);
  const isCompleted = status === 'Completed';

  return (
    <div className="min-h-screen pb-16" style={decoBgStyle(theme)}>
      {/* Hero */}
      <div className="relative py-16 px-6 flex flex-col items-center text-center">
        <Link to="/" className="self-start text-xs font-['Montserrat'] uppercase tracking-widest mb-6 max-w-4xl w-full mx-auto hover:opacity-70 transition-opacity" style={{ color: theme.muted }}>
          ← Back to Home
        </Link>

        <div className="animate-fade-in-up ziggurat-frame inline-block max-w-3xl" style={{ '--frame-color': theme.accent }}>
          <div className="ziggurat-inner" style={{ backgroundColor: theme.panel }}>
            <div className="px-8 py-10 md:px-14 md:py-14 flex flex-col items-center gap-5">
              <div className="flex gap-3 items-center flex-wrap justify-center">
                <span className="text-xs font-['Montserrat'] uppercase tracking-widest px-3 py-1 border" style={{ borderColor: theme.border, color: theme.muted }}>
                  {conference.domain}
                </span>
                <span
                  className="text-xs font-['Montserrat'] uppercase tracking-widest px-3 py-1 border font-bold"
                  style={{
                    borderColor: status === 'Ongoing' ? crimsonBright : theme.accent,
                    color: status === 'Ongoing' ? crimsonBright : status === 'Upcoming' ? theme.accent : theme.muted,
                  }}
                >
                  {status}
                </span>
              </div>

              <h1 className="font-['Bodoni_Moda'] text-3xl md:text-5xl uppercase leading-tight" style={{ color: theme.accent }}>
                {conference.title}
              </h1>

              <p className="font-['Montserrat'] text-sm" style={{ color: theme.muted }}>
                {conference.date} · {conference.location}
              </p>

              {conference.image && (
                <img src={conference.image} alt={conference.title} className="w-full max-w-md h-48 object-cover border mt-2 transition-transform duration-500 hover:scale-[1.02]" style={{ borderColor: theme.border }} />
              )}

              {isCompleted ? (
                isRegistered ? (
                  <button
                    disabled
                    className="mt-4 px-10 py-4 font-['Montserrat'] text-xs uppercase tracking-widest font-bold border-2 rounded-sm cursor-default"
                    style={{ backgroundColor: theme.panelAlt, color: theme.muted, borderColor: theme.border }}
                  >
                    ✓ Attended
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-4 px-10 py-4 font-['Montserrat'] text-xs uppercase tracking-widest font-bold border-2 rounded-sm cursor-not-allowed opacity-70"
                    style={{ backgroundColor: theme.panelAlt, color: theme.muted, borderColor: theme.border }}
                  >
                    Event Has Ended
                  </button>
                )
              ) : !currentUser ? (
                <div className="mt-4 flex flex-col items-center gap-2">
                  <Link
                    to="/login"
                    className="px-10 py-4 font-['Montserrat'] text-xs uppercase tracking-widest font-bold border-2 rounded-sm transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: crimsonBright, color: '#fff', borderColor: theme.accent }}
                  >
                    Log In to Register
                  </Link>
                  <p className="text-xs font-['Montserrat']" style={{ color: theme.muted }}>
                    Don't have an account? <Link to="/register" className="underline" style={{ color: theme.accent }}>Register here</Link>
                  </p>
                </div>
              ) : isRegistered ? (
                confirmingUnregister ? (
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => { onUnregister(conference.id); setConfirmingUnregister(false); }}
                      className="px-6 py-3 font-['Montserrat'] text-xs uppercase tracking-widest font-bold rounded-sm text-white transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: crimsonBright }}
                    >
                      Confirm Unregister
                    </button>
                    <button
                      onClick={() => setConfirmingUnregister(false)}
                      className="px-6 py-3 font-['Montserrat'] text-xs uppercase tracking-widest font-bold rounded-sm border-2 transition-all duration-300 hover:scale-105"
                      style={{ borderColor: theme.border, color: theme.muted }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmingUnregister(true)}
                    className="mt-4 px-10 py-4 font-['Montserrat'] text-xs uppercase tracking-widest font-bold border-2 rounded-sm transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: 'transparent', color: crimsonBright, borderColor: crimsonBright }}
                  >
                    ✓ Registered — Unregister
                  </button>
                )
              ) : (
                <button
                  onClick={() => onRegister(conference.id)}
                  className="mt-4 px-10 py-4 font-['Montserrat'] text-xs uppercase tracking-widest font-bold transition-all duration-300 border-2 rounded-sm hover:scale-105"
                  style={{ backgroundColor: crimsonBright, color: '#fff', borderColor: theme.accent }}
                >
                  ✦ Register Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6 flex items-center gap-4 ornamental-divider my-10" style={{ '--frame-color': theme.accent }}>
        <span className="animate-shimmer" style={{ color: theme.accent }}>◆</span>
      </div>

      {/* Speakers */}
      <section className="px-6 max-w-5xl mx-auto mb-14">
        <h2 className="font-['Bodoni_Moda'] text-2xl text-center mb-10 uppercase tracking-widest" style={{ color: theme.accent }}>
          Distinguished Voices
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {conference.speakers.map((speaker, index) => (
            <div
              key={index}
              className="animate-fade-in-up flex flex-col items-center text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative w-24 h-24 mb-3 transition-transform duration-300 group-hover:scale-110">
                <div className="absolute inset-0 rounded-full border-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ borderColor: theme.accent }}></div>
                <div className="absolute inset-1.5 rounded-full border flex items-center justify-center transition-shadow duration-300" style={{ borderColor: theme.accent, backgroundColor: theme.panelAlt }}>
                  <span className="font-['Bodoni_Moda'] text-xl" style={{ color: theme.accent }}>{speaker.name.charAt(0)}</span>
                </div>
              </div>
              <h3 className="font-['Montserrat'] text-sm font-bold uppercase" style={{ color: theme.text }}>{speaker.name}</h3>
              <p className="text-sm font-['Montserrat'] mt-1 leading-snug" style={{ color: theme.accent }}>{speaker.topic}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6 flex items-center gap-4 ornamental-divider my-10" style={{ '--frame-color': theme.accent }}>
        <span className="animate-shimmer" style={{ color: theme.accent }}>✦</span>
      </div>

      {/* Agenda */}
      <section className="px-6 max-w-4xl mx-auto">
        <div className="ziggurat-frame" style={{ '--frame-color': theme.accent }}>
          <div className="ziggurat-inner p-6 md:p-10" style={{ backgroundColor: theme.panel }}>
            <h2 className="font-['Bodoni_Moda'] text-xl text-center mb-10 uppercase tracking-[0.15em] border-b pb-5" style={{ color: theme.accent, borderColor: theme.border }}>
              Order of Proceedings
            </h2>

            {isCompleted && (
              <p className="text-center text-sm font-['Montserrat'] mb-6 italic" style={{ color: theme.muted }}>
                This event has concluded — scheduling is no longer available.
              </p>
            )}

            <div className="flex flex-col gap-6">
              {conference.agenda.map((item, index) => {
                const session = {
                  conferenceId: conference.id,
                  conferenceTitle: conference.title,
                  time: item.time,
                  title: item.session,
                };
                const isAdded = selectedSessions.some(
                  (s) => s.conferenceId === session.conferenceId && s.time === session.time && s.title === session.title
                );

                return (
                  <div
                    key={index}
                    className="animate-fade-in-up flex flex-col sm:flex-row gap-4 sm:gap-8 items-start border-b pb-6 last:border-0 transition-colors duration-300 rounded px-2 -mx-2"
                    style={{ animationDelay: `${index * 100}ms`, borderColor: theme.border }}
                  >
                    <div className="font-['Bodoni_Moda'] text-lg w-20 shrink-0" style={{ color: theme.accent }}>
                      {item.time}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-['Montserrat'] font-bold uppercase text-sm mb-2" style={{ color: theme.text }}>
                        {item.session}
                      </h4>
                      {!isCompleted && (
                        currentUser ? (
                          <button
                            onClick={() => (isAdded ? onRemoveSession(session) : onAddSession(session))}
                            className="text-xs font-['Montserrat'] uppercase tracking-widest transition-all duration-300 hover:tracking-[0.2em]"
                            style={{ color: isAdded ? theme.muted : theme.accent }}
                          >
                            {isAdded ? '✓ Added to Schedule' : '+ Add to Schedule'}
                          </button>
                        ) : (
                          <Link
                            to="/login"
                            className="text-xs font-['Montserrat'] uppercase tracking-widest underline"
                            style={{ color: theme.muted }}
                          >
                            Log in to add to schedule
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ConferenceDetails;