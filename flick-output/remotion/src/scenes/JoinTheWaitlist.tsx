import type {FC} from 'react';
import {Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Backdrop, C, card, clamp, gradientText, useEdgeFade} from './theme';

const EMAIL = 'you@company.com';
const TYPE_START = 22;
const TYPE_END = 58;
const CLICK = 76;
const SUCCESS = 84;

export const JoinTheWaitlist: FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const fade = useEdgeFade(durationInFrames, 10, 12);

  const box = spring({frame: frame - 2, fps, config: {damping: 15}});
  const typed = EMAIL.slice(0, Math.round(interpolate(frame, [TYPE_START, TYPE_END], [0, EMAIL.length], clamp)));
  const caretOn = frame < CLICK && Math.floor(frame / 8) % 2 === 0;

  // Cursor travels from the input to the button, then presses it.
  const cursorX = interpolate(frame, [TYPE_END, CLICK - 4], [700, 560], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const cursorY = interpolate(frame, [TYPE_END, CLICK - 4], [930, 1110], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const press = frame >= CLICK && frame < CLICK + 6 ? 0.94 : 1;
  const cursorOpacity = interpolate(frame, [TYPE_END - 4, TYPE_END, SUCCESS, SUCCESS + 6], [0, 1, 1, 0], clamp);

  const success = spring({frame: frame - SUCCESS, fps, config: {damping: 12}});
  const formOut = interpolate(frame, [SUCCESS - 2, SUCCESS + 6], [1, 0], clamp);
  const proof = spring({frame: frame - SUCCESS - 18, fps, config: {damping: 14}});
  const joined = Math.round(interpolate(frame, [SUCCESS + 18, SUCCESS + 50], [480, 500], clamp));

  return (
    <Backdrop glowY={45}>
      <Sequence from={TYPE_START} durationInFrames={TYPE_END - TYPE_START + 4}>
        <Audio src={staticFile('sounds/Typing.mp3')} volume={0.6} />
      </Sequence>
      <Sequence from={CLICK}><Audio src={staticFile('sounds/Click.mp3')} volume={0.9} /></Sequence>
      <Sequence from={SUCCESS}><Audio src={staticFile('sounds/Notification.mp3')} volume={0.7} /></Sequence>

      <div style={{position: 'absolute', inset: 0, opacity: fade}}>
        <div style={{position: 'absolute', top: 210, width: '100%', textAlign: 'center', fontSize: 64, fontWeight: 900, letterSpacing: -2, ...gradientText}}>
          NovaMind AI
        </div>

        {/* Waitlist card */}
        <div
          style={{
            ...card,
            position: 'absolute',
            left: 90,
            right: 90,
            top: 520,
            height: 720,
            padding: '64px 56px',
            borderRadius: 40,
            opacity: box,
            transform: `translateY(${(1 - box) * 120}px)`,
            boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{fontSize: 76, fontWeight: 800, letterSpacing: -2, textAlign: 'center'}}>Get Early Access</div>
          <div style={{fontSize: 32, color: C.muted, textAlign: 'center', marginTop: 16}}>Priority onboarding + founder pricing</div>

          <div style={{opacity: formOut, marginTop: 70}}>
            <div
              style={{
                padding: '34px 36px',
                borderRadius: 20,
                border: `3px solid ${frame >= TYPE_START ? C.accent : C.border}`,
                background: C.bg,
                fontSize: 42,
                color: typed ? C.text : C.muted,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {typed || 'Your email'}
              <span style={{width: 4, height: 50, background: C.accentLight, marginLeft: 4, opacity: caretOn && frame >= TYPE_START ? 1 : 0}} />
            </div>
            <div
              style={{
                marginTop: 34,
                padding: '36px 0',
                borderRadius: 20,
                textAlign: 'center',
                fontSize: 46,
                fontWeight: 700,
                color: '#fff',
                background: `linear-gradient(135deg, ${C.g1}, ${C.g2})`,
                boxShadow: `0 0 ${frame >= CLICK ? 90 : 50}px rgba(124,58,237,0.55)`,
                transform: `scale(${press})`,
              }}
            >
              Join the Waitlist
            </div>
          </div>

          {/* Success */}
          <div
            style={{
              position: 'absolute',
              left: 56,
              right: 56,
              top: 300,
              padding: '60px 30px',
              borderRadius: 24,
              background: 'rgba(34,197,94,0.1)',
              border: '3px solid rgba(34,197,94,0.35)',
              color: C.green,
              textAlign: 'center',
              opacity: success,
              transform: `scale(${0.7 + 0.3 * success})`,
            }}
          >
            <div style={{fontSize: 90}}>🎉</div>
            <div style={{fontSize: 56, fontWeight: 800, marginTop: 10}}>You're on the list!</div>
          </div>
        </div>

        {/* Social proof */}
        <div style={{position: 'absolute', top: 1340, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
          <div style={{display: 'flex'}}>
            {['L', 'M', 'K', 'J', 'R'].map((l, i) => {
              const a = spring({frame: frame - SUCCESS - 14 - i * 4, fps, config: {damping: 10}});
              return (
                <div
                  key={l}
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 48,
                    marginLeft: i === 0 ? 0 : -24,
                    border: `5px solid ${C.bg}`,
                    background: `linear-gradient(135deg, ${C.g1}, ${C.g3})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 38,
                    fontWeight: 800,
                    color: '#fff',
                    transform: `scale(${a})`,
                  }}
                >
                  {l}
                </div>
              );
            })}
          </div>
          <div style={{fontSize: 50, fontWeight: 600, color: C.muted, opacity: proof, transform: `translateY(${(1 - proof) * 30}px)`}}>
            <span style={{color: C.text, fontWeight: 900, fontVariantNumeric: 'tabular-nums'}}>{joined}+</span> already joined
          </div>
          <div style={{fontSize: 40, fontWeight: 700, color: C.accentLight, opacity: proof, marginTop: 10}}>Join the waitlist today →</div>
        </div>

        {/* Cursor */}
        <svg
          width={70}
          height={70}
          viewBox="0 0 24 24"
          style={{position: 'absolute', left: cursorX, top: cursorY, opacity: cursorOpacity, transform: `scale(${press})`, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))'}}
        >
          <path d="M4 2l15 10-7 1.5 4 7.5-3 1.5-4-7.5L4 20z" fill="#fff" stroke="#000" strokeWidth={1.2} strokeLinejoin="round" />
        </svg>
      </div>
    </Backdrop>
  );
};
