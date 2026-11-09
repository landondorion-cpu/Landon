import type {FC} from 'react';
import {Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Backdrop, C, card, clamp, gradientText, useEdgeFade} from './theme';

const STATS = [
  {start: 10, render: (p: number) => `${Math.max(1, Math.round(p * 10))}x`, label: 'Faster workflows', bar: 0.92},
  {start: 42, render: (p: number) => `${Math.round(p * 85)}%`, label: 'Lower costs', bar: 0.85},
  {start: 74, render: (p: number) => (p < 1 ? `${Math.round(p * 24)}/7` : '24/7'), label: 'Always running', bar: 1},
];

export const ResultsCountUp: FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const fade = useEdgeFade(durationInFrames, 8, 1);
  const zoomOut = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 1.35], {...clamp, easing: Easing.in(Easing.quad)});
  const outFade = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], clamp);

  return (
    <Backdrop glowY={50}>
      {STATS.map((s) => (
        <Sequence key={s.label} from={s.start}><Audio src={staticFile('sounds/Pop.mp3')} volume={0.7} /></Sequence>
      ))}

      <div style={{position: 'absolute', inset: 0, opacity: fade * outFade, transform: `scale(${zoomOut})`, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 90px', gap: 56}}>
        {STATS.map((s) => {
          const enter = spring({frame: frame - s.start, fps, config: {damping: 13}});
          const count = interpolate(frame, [s.start + 4, s.start + 30], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
          return (
            <div
              key={s.label}
              style={{
                ...card,
                padding: '50px 60px',
                opacity: enter,
                transform: `translateX(${(1 - enter) * -600}px)`,
              }}
            >
              <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                <div style={{fontSize: 170, fontWeight: 900, letterSpacing: -6, lineHeight: 1, ...gradientText, fontVariantNumeric: 'tabular-nums'}}>
                  {s.render(count)}
                </div>
              </div>
              <div style={{fontSize: 46, fontWeight: 600, color: C.text, marginTop: 14}}>{s.label}</div>
              <div style={{height: 12, borderRadius: 6, background: C.border, marginTop: 28, overflow: 'hidden'}}>
                <div style={{height: '100%', width: `${count * s.bar * 100}%`, background: `linear-gradient(90deg, ${C.g1}, ${C.g3})`, borderRadius: 6}} />
              </div>
            </div>
          );
        })}
      </div>
    </Backdrop>
  );
};
