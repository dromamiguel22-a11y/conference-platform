export const gold = '#D4AF37';
export const crimson = '#9E0027';
export const crimsonBright = '#C41E3A';

export const lightTheme = {
  bg: '#F7EFE0',
  panel: '#FFFCF5',
  panelAlt: '#F0E4C8',
  text: '#241512',
  muted: '#6B4A42',
  border: '#E4D6BE',
  accent: crimsonBright,
  texture: 'rgba(158,0,39,0.035)',
  pulseGlow: 'rgba(196,30,58,0.45)',
  isDark: false,
};

export const darkTheme = {
  bg: '#150A0A',
  panel: '#1D0F0F',
  panelAlt: '#241414',
  text: '#F3EDEA',
  muted: '#C9B6B0',
  border: '#3A2020',
  accent: gold,
  texture: 'rgba(212,175,55,0.055)',
  pulseGlow: 'rgba(212,175,55,0.16)',
  isDark: true,
};

export function getTheme(isDarkMode) {
  return isDarkMode ? darkTheme : lightTheme;
}

// Small tiled SVG: alternating flower rosette + dotted circle,
// echoing a classic Art Deco floral motif for night mode.
function nightPatternSVG(color) {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
      <g fill='${color}'>
        <g transform='translate(14,14)'>
          <circle cx='0' cy='-6' r='4'/>
          <circle cx='5.7' cy='-1.9' r='4'/>
          <circle cx='3.5' cy='5' r='4'/>
          <circle cx='-3.5' cy='5' r='4'/>
          <circle cx='-5.7' cy='-1.9' r='4'/>
        </g>
        <g transform='translate(54,14)'>
          <circle r='9' fill='none' stroke='${color}' stroke-width='2'/>
          <circle cx='0' cy='-5' r='1.5'/>
          <circle cx='4.3' cy='2.5' r='1.5'/>
          <circle cx='-4.3' cy='2.5' r='1.5'/>
        </g>
        <g transform='translate(14,54)'>
          <circle r='9' fill='none' stroke='${color}' stroke-width='2'/>
          <circle cx='0' cy='-5' r='1.5'/>
          <circle cx='4.3' cy='2.5' r='1.5'/>
          <circle cx='-4.3' cy='2.5' r='1.5'/>
        </g>
        <g transform='translate(54,54)'>
          <circle cx='0' cy='-6' r='4'/>
          <circle cx='5.7' cy='-1.9' r='4'/>
          <circle cx='3.5' cy='5' r='4'/>
          <circle cx='-3.5' cy='5' r='4'/>
          <circle cx='-5.7' cy='-1.9' r='4'/>
        </g>
      </g>
    </svg>
  `;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function decoBgStyle(t) {
  if (t.isDark) {
    return {
      backgroundColor: t.bg,
      backgroundImage: nightPatternSVG(t.texture),
      backgroundSize: '80px 80px',
    };
  }
  return {
    backgroundColor: t.bg,
    backgroundImage: `
      repeating-linear-gradient(135deg, transparent 0 8px, ${t.texture} 8px 10px, transparent 10px 24px),
      repeating-linear-gradient(45deg, transparent 0 8px, ${t.texture} 8px 10px, transparent 10px 24px)
    `,
    backgroundSize: '48px 48px',
  };
}

// Unused elsewhere currently, kept available: alternate patterns
// explored for Login/Register before reverting to the shared decoBgStyle.
export function scallopBgStyle(t) {
  return {
    backgroundColor: t.bg,
    backgroundImage: `radial-gradient(circle at 10px 0, transparent 9px, ${t.texture} 10px, ${t.texture} 12px, transparent 13px)`,
    backgroundSize: '20px 16px',
  };
}

export function chevronBgStyle(t) {
  return {
    backgroundColor: t.bg,
    backgroundImage: `
      linear-gradient(135deg, ${t.texture} 25%, transparent 25%),
      linear-gradient(225deg, ${t.texture} 25%, transparent 25%)
    `,
    backgroundPosition: '0 0, 12px 0',
    backgroundSize: '24px 24px',
  };
}