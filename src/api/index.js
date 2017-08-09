import { version } from '../../package.json';
import { Router } from 'express';
import users from './users';
import rooms from './rooms';
import messages from './messages';

export default ({ config, db }) => {
	let api = Router();

	// mount the users resource
	api.use('/users', users({ config, db }));

	// mount the rooms resource
	api.use('/rooms', rooms({ config, db }));

	// mount the messages resource
	api.use('/messages', messages({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
