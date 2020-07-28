const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../services/database');
const crypto = require('crypto');

module.exports = (app) => {
	app.get('/current_user', (req, res) => {
		if (!req.user) res.send(false);
		res.send({
			email: req.user.email,
			token: req.user.token,
			name: req.user.name,
		});
	});

	app.get('/refresh_token', async (req, res) => {
		if (!req.user) res.send(false);
		const token = crypto.randomBytes(128).toString('hex');
		const user = await db
			.collection('users')
			.where('email', '==', req.user.email)
			.get();

		const newUser = await db
			.collection('users')
			.doc(user.docs[0].id)
			.update({ token: token });

		res.send(token);
	});

	app.post('/login', passport.authenticate('local'), (req, res) => {
		var userInfo = {
			email: req.user.email,
			userId: req.user.id,
			name: req.user.name,
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
			const token = crypto.randomBytes(128).toString('hex');
			db.collection('users')
				.add({
					email: req.body.email,
					password: hashedPassword,
					name: req.body.name,
					token: token,
				})
				.then(() => res.sendStatus(200))
				.catch((error) => res.send({ error: error }));
		} else {
			res.send({ error: 'This email is already taken!' });
		}
	});

	app.get('/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.post('/project', (req, res) => {
		if (!req.user) {
			return res.sendStatus(401);
		}
		db.collection('projects')
			.add({
				title: req.body.title,
				description: req.body.description,
				schema: req.body.schema,
				userId: req.user.id,
			})
			.then(
				(result) => res.send(result.id),
				() => res.send({ error: 'Project was not added' })
			);
	});

	app.get('/projects', async (req, res) => {
		const projectsSnapshot = await db
			.collection('projects')
			.where('userId', '==', req.user.id)
			.get();

		const results = [];
		projectsSnapshot.forEach((project) =>
			results.push({ ...project.data(), projectId: project.id })
		);
		res.send(results);
	});

	app.get('/project', async (req, res) => {
		const project = await db.collection('projects').doc(req.query.id).get();
		if (project.data().userId !== req.user.id) return res.sendStatus(401);
		res.send(project.data());
	});

	app.post('/project/page', (req, res) => {
		if (!req.user) {
			return res.sendStatus(401);
		}
		db.collection('pages')
			.add({
				title: req.body.title,
				schema: req.body.schema,
				userId: req.user.id,
				projectId: req.body.projectId,
			})
			.then(
				() => res.sendStatus(200),
				() => res.send({ error: 'Page was not added' })
			);
	});

	app.get('/project/pages', async (req, res) => {
		if (!req.user) return res.sendStatus(401);

		const projectPages = await db
			.collection('pages')
			.where('projectId', '==', req.query.id)
			.get();

		const pages = [];

		projectPages.forEach((page) => {
			pages.push(page.data());
		});
		if (pages.length == 0) {
			return res.send({ error: 'No pages were found for this project' });
		}
		res.send(pages);
	});

	app.put('/project/page', (req, res) => {
		if (!req.user) {
			return res.sendStatus(401);
		}
		db.collection('pages')
			.doc(req.body.pageId)
			.set({
				title: req.body.title,
				schema: req.body.schema,
			})
			.then(
				() => res.sendStatus(200),
				() => res.send({ error: 'Page was not added' })
			);
	});

	const checkToken = (token, res) => {
		if (!token) {
			return res.status(400).send({
				error: 'You need to pass you token in the body!',
			});
		}
	};

	const checkUser = async (token, res) => {
		const user = await db.collection('users').where('token', '==', token).get();

		if (user.docs.length === 0) {
			return res.status(401).send({
				error: 'This token does not belong to anyone',
			});
		}

		return { userId: user.docs[0].id };
	};

	//External Routes
	app.get('/api/projects', async (req, res) => {
		checkToken(req.body.token, res);
		const { userId } = await checkUser(req.body.token, res);
		if (!userId) return;

		const projectsSnapshot = await db
			.collection('projects')
			.where('userId', '==', userId)
			.get();

		const projects = [];

		projectsSnapshot.forEach((project) => projects.push(project.data()));

		res.send(projects);
	});

	app.get('/api/project/:id/pages', async (req, res) => {
		checkToken(req.body.token, res);
		const { userId } = await checkUser(req.body.token, res);
		if (!userId) return;

		const pagesSnapshot = await db
			.collection('pages')
			.where('projectId', '==', req.params.id)
			.get();

		const pages = [];

		pagesSnapshot.forEach((page) => pages.push(page.data()));

		res.send(pages);
	});

	app.get('/api/page/:id', async (req, res) => {
		checkToken(req.body.token, res);
		const { userId } = await checkUser(req.body.token, res);
		if (!userId) return;

		const pagesSnapshot = await db.collection('pages').doc(req.params.id).get();
		const page = pagesSnapshot.data();
		if (page.userId !== userId) {
			return res.sendStatus(401);
		}

		res.send(page);
	});
};
