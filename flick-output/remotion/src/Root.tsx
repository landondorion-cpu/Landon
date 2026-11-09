import type {FC} from 'react';
import {Composition} from 'remotion';
import {BusyworkOverload} from './scenes/BusyworkOverload';
import {MeetNovamind} from './scenes/MeetNovamind';
import {AgentRunsWorkflow} from './scenes/AgentRunsWorkflow';
import {ResultsCountUp} from './scenes/ResultsCountUp';
import {LiveInDays} from './scenes/LiveInDays';
import {JoinTheWaitlist} from './scenes/JoinTheWaitlist';

const W = 1080;
const H = 1920;
const FPS = 30;

// One independent composition per approved scene (see ../scene-spec.json).
export const RemotionRoot: FC = () => (
  <>
    <Composition id="busywork-overload" component={BusyworkOverload} durationInFrames={135} fps={FPS} width={W} height={H} />
    <Composition id="meet-novamind" component={MeetNovamind} durationInFrames={105} fps={FPS} width={W} height={H} />
    <Composition id="agent-runs-workflow" component={AgentRunsWorkflow} durationInFrames={180} fps={FPS} width={W} height={H} />
    <Composition id="results-count-up" component={ResultsCountUp} durationInFrames={150} fps={FPS} width={W} height={H} />
    <Composition id="live-in-days" component={LiveInDays} durationInFrames={150} fps={FPS} width={W} height={H} />
    <Composition id="join-the-waitlist" component={JoinTheWaitlist} durationInFrames={180} fps={FPS} width={W} height={H} />
  </>
);
