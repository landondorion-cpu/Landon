import type {CSSProperties, FC, ReactNode} from 'react';
import {AbsoluteFill, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/fonts';

// Inter (variable, 100–900) bundled locally so renders don't depend on Google Fonts.
const fontFamily = 'Inter';
loadFont({family: fontFamily, url: staticFile('fonts/Inter-Variable.woff2'), weight: '100 900', format: 'woff2'});

export const C = {
  bg: '#06060a',
  surface: '#0e0e14',
  border: '#1a1a2e',
  text: '#e4e4ed',
  muted: '#8888a0',
  accent: '#7c3aed',
  accentLight: '#a78bfa',
  g1: '#7c3aed',
  g2: '#2563eb',
  g3: '#06b6d4',
  green: '#22c55e',
  red: '#ef4444',
};

export const FONT = fontFamily;

export const gradientText: CSSProperties = {
  background: `linear-gradient(135deg, ${C.g1}, ${C.g3})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export const card: CSSProperties = {
  background: C.surface,
  border: `2px solid ${C.border}`,
  borderRadius: 32,
};

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Dark backdrop with the landing page's pulsing purple glow and a faint grid. */
export const Backdrop: FC<{children: ReactNode; glowY?: number}> = ({children, glowY = 30}) => {
  const frame = useCurrentFrame();
  const pulse = 0.55 + 0.2 * Math.sin(frame / 22);
  return (
    <AbsoluteFill style={{background: C.bg, fontFamily: FONT, color: C.text, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.border}55 2px, transparent 2px), linear-gradient(90deg, ${C.border}55 2px, transparent 2px)`,
          backgroundSize: '90px 90px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: `${glowY}%`,
          width: 1500,
          height: 1500,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(124,58,237,0.38) 0%, transparent 65%)',
          opacity: pulse,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

/** Fades the whole scene in over the first frames and out over the last ones. */
export const useEdgeFade = (duration: number, inFrames = 8, outFrames = 8) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [0, inFrames, duration - outFrames, duration], [0, 1, 1, 0], clamp);
};

export const Check: FC<{size?: number; progress: number}> = ({size = 64, progress}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: progress > 0 ? C.green : 'transparent',
      border: `4px solid ${progress > 0 ? C.green : C.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: `scale(${0.6 + 0.4 * Math.min(progress, 1.15)})`,
      flexShrink: 0,
    }}
  >
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24">
      <path
        d="M4 12.5l5 5L20 6.5"
        fill="none"
        stroke="#fff"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={26}
        strokeDashoffset={26 * (1 - Math.min(progress, 1))}
      />
    </svg>
  </div>
);
