const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../services/database');

module.exports = (app) => {
	app.post('/login', passport.authenticate('local'), (req, res) => {
		console.log('logged in', req.user);
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
			db.collection('users')
				.add({
					email: req.body.email,
					password: hashedPassword,
					name: req.body.name,
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
		console.log(req.user);
		db.collection('projects')
			.add({
				title: req.body.title,
				description: req.body.description,
				schema: req.body.schema,
				userId: req.user.id,
			})
			.then(
				() => res.sendStatus(200),
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
		console.log(req.user);
		db.collection('pages')
			.add({
				title: req.body.title,
				schema: req.body.schema,
				userId: req.user.id,
				projectId: req.body.projectId
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

		const pages=[];

		projectPages.forEach((page)=>{
			pages.push(page.data());
		});
		if (pages.length == 0){
			return res.send({error: 'No pages were found for this project'});
		}
		res.send(pages);

	});

};
