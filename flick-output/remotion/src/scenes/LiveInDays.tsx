import type {FC} from 'react';
import {Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop, C, Check, card, clamp, gradientText, useEdgeFade} from './theme';

const STEPS = [
  {title: 'Tell us your pain points', day: 'Day 1'},
  {title: 'We build your AI agent', day: 'Day 3'},
  {title: 'Launch & optimize', day: 'Day 7'},
];
const STEP_AT = [52, 78, 104];

export const LiveInDays: FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const fade = useEdgeFade(durationInFrames, 10, 10);

  const head = spring({frame: frame - 2, fps, config: {damping: 14}});
  const months = spring({frame: frame - 14, fps, config: {damping: 14}});
  const strike = interpolate(frame, [26, 38], [0, 1], clamp);
  const bar = interpolate(frame, [STEP_AT[0] - 6, STEP_AT[2] + 8], [0, 1], clamp);

  return (
    <Backdrop glowY={35}>
      {STEP_AT.map((f) => (
        <Sequence key={f} from={f}><Audio src={staticFile('sounds/Click.mp3')} volume={0.8} /></Sequence>
      ))}

      <div style={{position: 'absolute', inset: 0, opacity: fade}}>
        <div style={{position: 'absolute', top: 230, width: '100%', textAlign: 'center'}}>
          <div style={{fontSize: 128, fontWeight: 900, letterSpacing: -4, ...gradientText, opacity: head, transform: `scale(${0.8 + 0.2 * head})`}}>
            Live in days,
          </div>
          <div style={{position: 'relative', display: 'inline-block', marginTop: 10, fontSize: 96, fontWeight: 800, color: C.muted, opacity: months}}>
            not months
            <div
              style={{
                position: 'absolute',
                left: -10,
                top: '54%',
                height: 12,
                width: `calc(${strike * 100}% + 20px)`,
                background: C.red,
                borderRadius: 6,
                transform: 'rotate(-3deg)',
              }}
            />
          </div>
        </div>

        {/* Progress bar */}
        <div style={{position: 'absolute', top: 700, left: 100, right: 100}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 28, color: C.muted, fontWeight: 600, marginBottom: 16}}>
            <span>Kickoff</span>
            <span style={{color: bar >= 1 ? C.green : C.muted}}>{bar >= 1 ? 'Live ✓' : 'Go-live'}</span>
          </div>
          <div style={{height: 20, borderRadius: 10, background: C.border, overflow: 'hidden'}}>
            <div style={{height: '100%', width: `${bar * 100}%`, background: `linear-gradient(90deg, ${C.g1}, ${C.g2}, ${C.g3})`}} />
          </div>
        </div>

        {/* Steps */}
        <div style={{position: 'absolute', top: 860, left: 90, right: 90, display: 'flex', flexDirection: 'column', gap: 40}}>
          {STEPS.map((s, i) => {
            const on = spring({frame: frame - STEP_AT[i], fps, config: {damping: 11, stiffness: 180}});
            const enter = spring({frame: frame - 30 - i * 5, fps, config: {damping: 15}});
            return (
              <div
                key={s.title}
                style={{
                  ...card,
                  padding: '40px 44px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 34,
                  opacity: 0.35 + 0.65 * Math.min(1, enter * (0.4 + on)),
                  transform: `translateY(${(1 - enter) * 80}px) scale(${1 + 0.04 * Math.min(on, 1)})`,
                  borderColor: on > 0.05 ? C.accent : C.border,
                }}
              >
                <div
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: 22,
                    background: `linear-gradient(135deg, ${C.g1}, ${C.g2})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 44,
                    fontWeight: 800,
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{flex: 1}}>
                  <div style={{fontSize: 26, color: C.accentLight, fontWeight: 700, letterSpacing: 2}}>{s.day.toUpperCase()}</div>
                  <div style={{fontSize: 44, fontWeight: 700, marginTop: 4}}>{s.title}</div>
                </div>
                <Check progress={on} size={60} />
              </div>
            );
          })}
        </div>
      </div>
    </Backdrop>
  );
};
