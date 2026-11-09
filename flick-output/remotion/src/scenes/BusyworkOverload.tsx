import type {FC} from 'react';
import {Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop, C, card, clamp, useEdgeFade} from './theme';

export const TASKS = [
  {label: 'Invoice #4821', tag: 'Finance', color: '#f59e0b'},
  {label: 'Follow up with lead', tag: 'Sales', color: '#3b82f6'},
  {label: 'Weekly report', tag: 'Ops', color: '#06b6d4'},
  {label: 'Update CRM', tag: 'Sales', color: '#3b82f6'},
  {label: 'Schedule call', tag: 'Admin', color: '#a78bfa'},
  {label: 'Reply to support ticket', tag: 'Support', color: '#ef4444'},
];

// Resting positions of the messy stack (shared with MeetNovamind so the hand-off is seamless).
export const STACK = [
  {x: -120, y: -380, r: -9},
  {x: 110, y: -230, r: 7},
  {x: -90, y: -70, r: -5},
  {x: 130, y: 90, r: 10},
  {x: -140, y: 250, r: -12},
  {x: 60, y: 400, r: 4},
];

export const TaskCard: FC<{label: string; tag: string; color: string}> = ({label, tag, color}) => (
  <div style={{...card, width: 640, padding: '34px 40px', display: 'flex', alignItems: 'center', gap: 28, boxShadow: '0 30px 80px rgba(0,0,0,0.55)'}}>
    <div style={{width: 44, height: 44, borderRadius: 12, border: `4px solid ${C.muted}`, flexShrink: 0}} />
    <div style={{flex: 1}}>
      <div style={{fontSize: 40, fontWeight: 700}}>{label}</div>
      <div style={{fontSize: 26, color, fontWeight: 600, marginTop: 6}}>● {tag} · Overdue</div>
    </div>
  </div>
);

export const BusyworkOverload: FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const fade = useEdgeFade(durationInFrames, 6, 1);

  const hours = Math.round(interpolate(frame, [5, 85], [0, 23], clamp));
  const headline = spring({frame: frame - 82, fps, config: {damping: 11, stiffness: 160}});
  const shake = frame > 82 && frame < 92 ? Math.sin(frame * 3) * (92 - frame) * 1.6 : 0;

  return (
    <Backdrop glowY={55}>
      <Sequence from={4}><Audio src={staticFile('sounds/Popups.mp3')} volume={0.7} /></Sequence>
      <Sequence from={82}><Audio src={staticFile('sounds/Impact.mp3')} volume={0.8} /></Sequence>

      <div style={{position: 'absolute', inset: 0, opacity: fade, transform: `translateX(${shake}px)`}}>
        {/* Hours-lost counter */}
        <div style={{position: 'absolute', top: 150, width: '100%', display: 'flex', justifyContent: 'center'}}>
          <div style={{...card, padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 20, borderColor: `${C.red}66`}}>
            <div style={{width: 18, height: 18, borderRadius: 9, background: C.red}} />
            <span style={{fontSize: 34, color: C.muted, fontWeight: 600}}>Hours lost this week</span>
            <span style={{fontSize: 52, fontWeight: 900, color: C.red, fontVariantNumeric: 'tabular-nums', minWidth: 110}}>{hours}h</span>
          </div>
        </div>

        {/* Cards dropping into a messy stack */}
        <div style={{position: 'absolute', left: '50%', top: '46%'}}>
          {TASKS.map((t, i) => {
            const s = spring({frame: frame - 6 - i * 11, fps, config: {damping: 13, stiffness: 140}});
            const p = STACK[i];
            return (
              <div
                key={t.label}
                style={{
                  position: 'absolute',
                  transform: `translate(-50%, -50%) translate(${p.x}px, ${interpolate(s, [0, 1], [p.y - 1400, p.y])}px) rotate(${p.r * s}deg)`,
                  opacity: s > 0.01 ? 1 : 0,
                }}
              >
                <TaskCard {...t} />
              </div>
            );
          })}
        </div>

        {/* Headline */}
        <div
          style={{
            position: 'absolute',
            bottom: 170,
            width: '100%',
            textAlign: 'center',
            padding: '0 70px',
            fontSize: 92,
            fontWeight: 900,
            letterSpacing: -3,
            lineHeight: 1.05,
            transform: `scale(${interpolate(headline, [0, 1], [1.8, 1])})`,
            opacity: headline,
            textShadow: '0 10px 40px rgba(0,0,0,0.9)',
          }}
        >
          Your team is drowning in <span style={{color: C.red}}>busywork.</span>
        </div>
      </div>
    </Backdrop>
  );
};
