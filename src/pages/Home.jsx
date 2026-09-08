import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import conferences from '../conference.js';
import getConferenceStatus from '../utils.js';
import { getTheme, decoBgStyle, crimsonBright } from '../theme.js';

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = null;
    let frame;
    function step(ts) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

function statusTag(status, theme) {
  if (status === 'Ongoing') return { label: 'Live Now', bg: crimsonBright, text: '#fff', live: true };
  if (status === 'Upcoming') return { label: 'Up Next', bg: theme.panelAlt, text: theme.accent, live: false };
  return { label: 'Closed', bg: theme.panelAlt, text: theme.muted, live: false };
}

function ConferenceCard(props) {
  const t = props.theme;
  const tag = statusTag(props.status, t);

  return (
    <div
      className="animate-fade-in-up ziggurat-frame w-full h-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
      style={{ animationDelay: props.delay, '--frame-color': t.accent }}
    >
      <div className="ziggurat-inner flex flex-col overflow-hidden group h-full" style={{ backgroundColor: t.panel }}>
        <div className="relative h-32 sm:h-40 w-full border-b overflow-hidden shrink-0" style={{ borderColor: t.border }}>
          <img
            src={props.image}
            alt={props.title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          />
          {props.isRegistered && (
            <div
              className="absolute top-2 left-2 px-2 py-1 rounded-sm border flex items-center gap-1"
              style={{ backgroundColor: t.panel, borderColor: t.accent }}
            >
              <span className="text-[10px] font-['Montserrat'] uppercase tracking-wider font-bold whitespace-nowrap" style={{ color: t.accent }}>
                ✓ Registered
              </span>
            </div>
          )}
          <div
            className={`absolute top-2 right-2 px-2 py-1 rounded-sm border flex items-center gap-1 ${tag.live ? 'animate-glow-pulse' : ''}`}
            style={{ backgroundColor: tag.bg, borderColor: t.accent, '--pulse-color': t.pulseGlow }}
          >
            {tag.live && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>}
            <span
              className="text-[10px] font-['Montserrat'] uppercase tracking-wider font-bold whitespace-nowrap"
              style={{ color: tag.text }}
            >
              {tag.label}
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 flex flex-col flex-grow">
          <span className="text-[11px] font-['Montserrat'] font-bold uppercase tracking-widest mb-1" style={{ color: t.accent }}>
            {props.domain}
          </span>
          <h3
            className="font-['Bodoni_Moda'] text-sm sm:text-base mb-2 leading-snug line-clamp-2 min-h-[2.6rem] transition-colors duration-300"
            style={{ color: t.text }}
          >
            {props.title}
          </h3>
          <div className="mt-auto pt-2 border-t space-y-1 text-xs font-['Montserrat']" style={{ borderColor: t.border, color: t.muted }}>
            <p className="truncate">{props.location}</p>
            <p className="uppercase tracking-wide opacity-70">{props.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  { name: 'All', icon: '◈' },
  { name: 'AI & Machine Learning', icon: '⬡' },
  { name: 'Business & Entrepreneurship', icon: '◆' },
  { name: 'Medical & Healthcare', icon: '✚' },
  { name: 'IT & Computing', icon: '▣' },
  { name: 'Sustainability', icon: '❖' },
];

function SideColumn({ side, theme }) {
  const positionClass = side === 'left' ? 'left-6 lg:left-10' : 'right-6 lg:right-10';
  return (
    <div className={`hidden md:flex flex-col items-center gap-6 absolute ${positionClass} top-1/2 -translate-y-1/2 opacity-35 pointer-events-none`}>
      <span style={{ color: theme.accent }}>✦</span>
      <div className="w-px h-20" style={{ background: `linear-gradient(to bottom, transparent, ${theme.accent}, transparent)` }}></div>
      <span style={{ color: theme.accent }}>◆</span>
      <div className="w-px h-20" style={{ background: `linear-gradient(to bottom, transparent, ${theme.accent}, transparent)` }}></div>
      <span style={{ color: theme.accent }}>✦</span>
    </div>
  );
}

function Home({ viewedDomains, onTrackDomainView, isDarkMode, registeredIds }) {
  const theme = getTheme(isDarkMode);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const gridRef = useRef(null);

  const searchLower = searchText.toLowerCase();
  const filteredConferences = conferences
    .filter((conf) => {
      const matchesTitle = conf.title.toLowerCase().includes(searchLower);
      const matchesLocation = conf.location.toLowerCase().includes(searchLower);
      const matchesSpeaker = conf.speakers.some((s) => s.name.toLowerCase().includes(searchLower));
      return matchesTitle || matchesLocation || matchesSpeaker;
    })
    .filter((conf) => selectedCategory === 'All' || conf.domain === selectedCategory);

  const hasActiveFilters = searchText !== '' || selectedCategory !== 'All';
  function clearFilters() {
    setSearchText('');
    setSelectedCategory('All');
  }

  function scrollToResults() {
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function getMostViewedDomain() {
    if (viewedDomains.length === 0) return null;
    const counts = {};
    viewedDomains.forEach((domain) => {
      counts[domain] = (counts[domain] || 0) + 1;
    });
    let topDomain = null, topCount = 0;
    for (const domain in counts) {
      if (counts[domain] > topCount) { topDomain = domain; topCount = counts[domain]; }
    }
    return topDomain;
  }

  const mostViewedDomain = getMostViewedDomain();
  const recommendedConferences = mostViewedDomain
    ? conferences.filter((conf) => conf.domain === mostViewedDomain)
    : [];

  const conferenceCount = useCountUp(conferences.length);
  const domainCount = useCountUp(categories.length - 1);
  const cityCount = useCountUp(new Set(conferences.map((c) => c.location)).size);

  return (
    <div className="min-h-screen pb-16" style={decoBgStyle(theme)}>
      {/* Hero */}
      <div className="relative pt-2 sm:pt-3 pb-8 sm:pb-10 px-4 sm:px-6 flex flex-col items-center text-center overflow-hidden">
        <SideColumn side="left" theme={theme} />
        <SideColumn side="right" theme={theme} />

        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div
            className="animate-glow-breathe w-72 h-72 sm:w-[420px] sm:h-[420px] md:w-[560px] md:h-[560px] rounded-full"
            style={{ background: `radial-gradient(circle, ${theme.accent} 0%, transparent 65%)` }}
          ></div>
        </div>

        <div className="relative z-10 max-w-2xl animate-fade-in-up px-4 py-2 sm:px-8 sm:py-4 md:px-14 md:py-6">
          <p className="text-2xl mb-2 animate-shimmer" style={{ color: theme.accent }}>❋</p>
          <p className="text-xs font-['Montserrat'] tracking-[0.3em] uppercase mb-4" style={{ color: theme.accent }}>
            ✦ Est. 2026 ✦
          </p>
          <h1 className="font-['Bodoni_Moda'] text-3xl sm:text-4xl md:text-6xl leading-tight" style={{ color: theme.accent }}>
            The Grand Assembly<br />Awaits
          </h1>
          <p className="mt-5 font-['Montserrat'] text-sm sm:text-base" style={{ color: theme.muted }}>
            Discover premier conferences and exclusive symposia curated for the modern visionary.
          </p>

          <div
            className={`mt-6 sm:mt-8 border p-2 flex items-center max-w-lg mx-auto transition-all duration-300 rounded-lg ${isSearchFocused ? 'animate-glow-pulse' : ''}`}
            style={{
              backgroundColor: theme.panel,
              borderColor: theme.accent,
              '--pulse-color': theme.pulseGlow,
            }}
          >
            <span className="text-lg px-2 animate-icon-pulse" style={{ color: theme.accent }}>
              ◆
            </span>
            <input
              type="text"
              placeholder="Search events, speakers, or dates..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && scrollToResults()}
              className="bg-transparent border-none focus:ring-0 w-full min-w-0 px-2 py-2 outline-none font-['Montserrat'] text-sm sm:text-base"
              style={{ color: theme.text }}
            />
            <button
              onClick={scrollToResults}
              className="shrink-0 px-4 sm:px-6 py-2.5 text-xs font-['Montserrat'] uppercase tracking-widest font-bold text-white transition-transform hover:scale-105 rounded"
              style={{ backgroundColor: crimsonBright }}
            >
              Find
            </button>
          </div>

          {/* Stats strip */}
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap">
            <div className="text-center">
              <p className="font-['Bodoni_Moda'] text-xl sm:text-2xl" style={{ color: theme.accent }}>{conferenceCount}</p>
              <p className="text-[10px] font-['Montserrat'] uppercase tracking-widest" style={{ color: theme.muted }}>Conferences</p>
            </div>
            <span className="animate-shimmer" style={{ color: theme.accent }}>◆</span>
            <div className="text-center">
              <p className="font-['Bodoni_Moda'] text-xl sm:text-2xl" style={{ color: theme.accent }}>{domainCount}</p>
              <p className="text-[10px] font-['Montserrat'] uppercase tracking-widest" style={{ color: theme.muted }}>Domains</p>
            </div>
            <span className="animate-shimmer" style={{ color: theme.accent }}>◆</span>
            <div className="text-center">
              <p className="font-['Bodoni_Moda'] text-xl sm:text-2xl" style={{ color: theme.accent }}>{cityCount}</p>
              <p className="text-[10px] font-['Montserrat'] uppercase tracking-widest" style={{ color: theme.muted }}>Cities</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Category pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-1">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className="animate-fade-in-up flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-['Montserrat'] uppercase tracking-widest transition-all duration-300 border hover:scale-105"
              style={{
                animationDelay: `${i * 60}ms`,
                backgroundColor: selectedCategory === cat.name ? crimsonBright : theme.panel,
                color: selectedCategory === cat.name ? '#fff' : theme.muted,
                borderColor: selectedCategory === cat.name ? crimsonBright : theme.border,
                fontWeight: selectedCategory === cat.name ? 700 : 400,
                transform: selectedCategory === cat.name ? 'scale(1.06)' : 'scale(1)',
              }}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs sm:text-sm font-['Montserrat'] uppercase tracking-widest font-bold hover:underline transition-all"
              style={{ color: theme.muted }}
            >
              ✕ Clear Filters
            </button>
          )}
        </div>

        {/* Recommended */}
        {recommendedConferences.length > 0 && (
          <div className="mt-10 animate-fade-in-up">
            <div className="flex items-center gap-4 ornamental-divider mb-6" style={{ '--frame-color': theme.accent }}>
              <span className="animate-shimmer" style={{ color: theme.accent }}>✦</span>
            </div>
            <p className="text-center text-[11px] font-['Montserrat'] tracking-widest uppercase mb-1" style={{ color: theme.accent }}>
              Matched to your interests
            </p>
            <h2 className="text-center font-['Bodoni_Moda'] text-xl sm:text-2xl mb-6" style={{ color: theme.text }}>
              More {mostViewedDomain}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
              {recommendedConferences.map((conf, i) => (
                <Link key={conf.id} to={`/conference/${conf.id}`} onClick={() => onTrackDomainView(conf.domain)}>
                  <ConferenceCard
                    title={conf.title}
                    domain={conf.domain}
                    location={conf.location}
                    date={conf.date}
                    status={getConferenceStatus(conf.dateISO)}
                    image={conf.image}
                    delay={`${i * 80}ms`}
                    theme={theme}
                    isRegistered={registeredIds.includes(conf.id)}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div ref={gridRef} className="mt-12 mb-6 flex items-center gap-4 ornamental-divider" style={{ '--frame-color': theme.accent }}>
          <span className="animate-shimmer" style={{ color: theme.accent }}>◆</span>
        </div>

        {/* Grid */}
        {filteredConferences.length === 0 ? (
          <p className="text-center font-['Montserrat'] py-10" style={{ color: theme.muted }}>
            No conferences match your search. Try a different term or clear your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filteredConferences.map((conf, i) => (
              <Link key={conf.id} to={`/conference/${conf.id}`} onClick={() => onTrackDomainView(conf.domain)}>
                <ConferenceCard
                  title={conf.title}
                  domain={conf.domain}
                  location={conf.location}
                  date={conf.date}
                  status={getConferenceStatus(conf.dateISO)}
                  image={conf.image}
                  delay={`${i * 80}ms`}
                  theme={theme}
                  isRegistered={registeredIds.includes(conf.id)}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;