import type {FC} from 'react';
import {Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Backdrop, C, clamp, gradientText, useEdgeFade} from './theme';
import {STACK, TASKS, TaskCard} from './BusyworkOverload';

export const MeetNovamind: FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const fade = useEdgeFade(durationInFrames, 1, 10);

  const absorb = interpolate(frame, [0, 32], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  const orbGrow = interpolate(frame, [0, 32, 40], [0.4, 1, 1.25], clamp);
  const burst = interpolate(frame, [36, 52], [0, 1], clamp);
  const word = spring({frame: frame - 38, fps, config: {damping: 14}});
  const meet = spring({frame: frame - 34, fps, config: {damping: 16}});
  const badge = spring({frame: frame - 56, fps, config: {damping: 12}});

  return (
    <Backdrop glowY={50}>
      <Audio src={staticFile('sounds/riser.mp3')} volume={(f) => interpolate(f, [0, 30, 40], [0.6, 0.6, 0], clamp)} />
      <Sequence from={36}><Audio src={staticFile('sounds/aha-moment.MP3')} volume={0.8} /></Sequence>

      <div style={{position: 'absolute', inset: 0, opacity: fade}}>
        {/* Task cards spiral into the orb */}
        <div style={{position: 'absolute', left: '50%', top: '46%'}}>
          {TASKS.map((t, i) => {
            const p = STACK[i];
            const angle = absorb * (2.2 + i * 0.25) * Math.PI;
            const k = 1 - absorb;
            const x = (p.x * Math.cos(angle) - p.y * Math.sin(angle)) * k;
            const y = (p.x * Math.sin(angle) + p.y * Math.cos(angle)) * k;
            return (
              <div
                key={t.label}
                style={{
                  position: 'absolute',
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${p.r + absorb * 400}deg) scale(${k})`,
                  opacity: k > 0.05 ? 1 : 0,
                }}
              >
                <TaskCard {...t} />
              </div>
            );
          })}
        </div>

        {/* Orb */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '46%',
            width: 300,
            height: 300,
            borderRadius: 150,
            transform: `translate(-50%, -50%) scale(${orbGrow * (1 + burst * 6)})`,
            background: `radial-gradient(circle at 35% 35%, #fff 0%, ${C.accentLight} 18%, ${C.g1} 45%, ${C.g2} 70%, transparent 72%)`,
            boxShadow: `0 0 160px 60px rgba(124,58,237,0.6)`,
            opacity: 1 - burst,
          }}
        />

        {/* Wordmark */}
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
          <div style={{fontSize: 64, fontWeight: 600, color: C.muted, opacity: meet, transform: `translateY(${(1 - meet) * 30}px)`}}>Meet</div>
          <div
            style={{
              fontSize: 168,
              fontWeight: 900,
              letterSpacing: -6,
              lineHeight: 1,
              ...gradientText,
              transform: `scale(${interpolate(word, [0, 1], [0.6, 1])})`,
              opacity: word,
              filter: `drop-shadow(0 0 50px rgba(124,58,237,${0.6 * word}))`,
              textAlign: 'center',
            }}
          >
            NovaMind
            <br />
            AI
          </div>
          <div
            style={{
              marginTop: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 34px',
              borderRadius: 100,
              border: `2px solid ${C.border}`,
              background: C.surface,
              fontSize: 34,
              fontWeight: 500,
              color: C.accentLight,
              transform: `scale(${badge})`,
            }}
          >
            <div style={{width: 16, height: 16, borderRadius: 8, background: C.green, opacity: 0.6 + 0.4 * Math.sin(frame / 5)}} />
            Now accepting early access
          </div>
        </div>
      </div>
    </Backdrop>
  );
};
