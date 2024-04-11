import { Pulse } from '../../src';

export default (agenda: Pulse, _definitionOnly = false) => {
	agenda.define('some job', async job => {
		console.log('HELLO from a sub worker');
		if (job.attrs.data?.failIt === 'error') {
			throw new Error('intended error :-)');
		} else if (job.attrs.data?.failIt === 'die') {
			process.exit(2);
		}
	});
};
