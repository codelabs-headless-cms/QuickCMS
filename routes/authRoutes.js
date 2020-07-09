const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../services/database');

module.exports = (app) => {
	app.post('/login', passport.authenticate('local'), (req, res) => {
		console.log('logged in', req.user);
		var userInfo = {
			email: req.user.email,
		};
		res.send(userInfo);
	});

	app.post('/signup', async (req, res) => {
		const user = await db
			.collection('users')
			.where('email', '==', req.body.email)
			.get();

		if (user.docs.length === 0) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			db.collection('users')
				.add({
					email: req.body.email,
					password: hashedPassword,
					name: req.body.name,
				})
				.then(res.sendStatus(200))
				.catch((error) => res.send({ error: error }));
		} else {
			res.send({ error: 'This email is already taken!' });
		}
	});

	app.get('/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});
};
