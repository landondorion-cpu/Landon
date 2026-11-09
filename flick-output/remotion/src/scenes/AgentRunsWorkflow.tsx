import type {FC} from 'react';
import {Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop, C, Check, card, clamp, gradientText, useEdgeFade} from './theme';

const NODES = [
  {icon: '🎯', title: 'Lead captured', sub: 'Website form · Acme Co.'},
  {icon: '📩', title: 'Personalized email sent', sub: 'Follow-up drafted by AI'},
  {icon: '🗂️', title: 'CRM updated', sub: 'Deal moved to “Qualified”'},
  {icon: '💸', title: 'Invoice paid', sub: '$4,800 · auto-reconciled'},
];

const NODE_H = 170;
const GAP = 90;
const TOP = 720;
// Frame at which the pulse reaches each node.
export const HITS = [62, 92, 122, 152];

export const AgentRunsWorkflow: FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const fade = useEdgeFade(durationInFrames, 8, 1);
  const exit = interpolate(frame, [durationInFrames - 10, durationInFrames], [0, -260], clamp);

  const title = spring({frame: frame - 2, fps, config: {damping: 15}});
  const sub = spring({frame: frame - 12, fps, config: {damping: 15}});

  const centerY = (i: number) => TOP + i * (NODE_H + GAP) + NODE_H / 2;
  const pulseY = interpolate(frame, [HITS[0] - 14, ...HITS], [centerY(0) - 100, ...NODES.map((_, i) => centerY(i))], clamp);
  const lineFill = interpolate(frame, [HITS[0], HITS[3]], [0, 1], clamp);
  const pulseOn = frame >= HITS[0] - 14 && frame <= HITS[3] + 6;

  return (
    <Backdrop glowY={40}>
      {HITS.map((h) => (
        <Sequence key={h} from={h}><Audio src={staticFile('sounds/Correct.mp3')} volume={0.45} /></Sequence>
      ))}

      <div style={{position: 'absolute', inset: 0, opacity: fade, transform: `translateY(${exit}px)`}}>
        <div style={{position: 'absolute', top: 200, width: '100%', textAlign: 'center', padding: '0 60px'}}>
          <div style={{fontSize: 100, fontWeight: 900, letterSpacing: -3, ...gradientText, opacity: title, transform: `translateY(${(1 - title) * 40}px)`}}>
            Custom AI agents
          </div>
          <div style={{fontSize: 54, fontWeight: 700, marginTop: 16, lineHeight: 1.2, opacity: sub, transform: `translateY(${(1 - sub) * 40}px)`}}>
            that run your workflows<br />end to end.
          </div>
        </div>

        {/* Connector */}
        <div style={{position: 'absolute', left: 190, top: centerY(0), width: 6, height: centerY(3) - centerY(0), background: C.border, borderRadius: 3}} />
        <div
          style={{
            position: 'absolute',
            left: 190,
            top: centerY(0),
            width: 6,
            height: (centerY(3) - centerY(0)) * lineFill,
            background: `linear-gradient(${C.g1}, ${C.g3})`,
            borderRadius: 3,
            boxShadow: `0 0 20px ${C.g1}`,
          }}
        />

        {NODES.map((n, i) => {
          const enter = spring({frame: frame - 20 - i * 7, fps, config: {damping: 14}});
          const done = spring({frame: frame - HITS[i], fps, config: {damping: 9, stiffness: 200}});
          return (
            <div
              key={n.title}
              style={{
                ...card,
                position: 'absolute',
                left: 110,
                right: 80,
                top: TOP + i * (NODE_H + GAP),
                height: NODE_H,
                padding: '0 40px 0 130px',
                display: 'flex',
                alignItems: 'center',
                gap: 30,
                opacity: enter,
                transform: `translateX(${(1 - enter) * 300}px)`,
                borderColor: done > 0.05 ? `${C.green}88` : C.border,
                boxShadow: done > 0.05 ? `0 0 40px rgba(34,197,94,${0.25 * Math.min(done, 1)})` : 'none',
              }}
            >
              <div style={{fontSize: 64}}>{n.icon}</div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 42, fontWeight: 700}}>{n.title}</div>
                <div style={{fontSize: 28, color: C.muted, marginTop: 4}}>{n.sub}</div>
              </div>
              <Check progress={done} />
            </div>
          );
        })}

        {/* Agent pulse */}
        {pulseOn && (
          <div style={{position: 'absolute', left: 193, top: pulseY, transform: 'translate(-50%, -50%)'}}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                background: `radial-gradient(circle, #fff 0%, ${C.accentLight} 35%, ${C.g1} 70%)`,
                boxShadow: `0 0 50px 16px rgba(124,58,237,0.7)`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: -175, whiteSpace: 'nowrap',
                top: 14,
                fontSize: 22,
                fontWeight: 800,
                color: C.accentLight,
                letterSpacing: 2,
                width: 150,
                textAlign: 'right',
              }}
            >
              AI AGENT
            </div>
          </div>
        )}
      </div>
    </Backdrop>
  );
};
