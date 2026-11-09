import {Config} from '@remotion/cli/config';

// Use a locally installed headless Chrome when one is provided (e.g. in sandboxed environments).
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
}
