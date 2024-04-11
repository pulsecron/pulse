// module export, beware: cjs.ts is exported as main entry point!
export * from './job';
export * from './pulse';

export { JobOptions } from './job/repeat-every';
export { DefineOptions, JobPriority, Processor } from './pulse/define';
export { Pulse };

import { Pulse } from './pulse';

export default Pulse;
