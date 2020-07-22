const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./database');

passport.serializeUser((user, done) => {
	done(null, user.email);
});

passport.deserializeUser((email, done) => {
	getUserByEmail(email).then((user) => done(null, user));
});

passport.use(
	new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
		getUserByEmail(email).then(async (user) => {
			if (user == null) {
				return done(null, false);
			}

			try {
				if (await bcrypt.compare(password, user.password)) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (e) {
				return done(e);
			}
		});
	})
);

const getUserByEmail = async (email) => {
	const userSnap = await db
		.collection('users')
		.where('email', '==', email)
		.get();

	if (!userSnap.docs[0]) return null;
	return { id: userSnap.docs[0].id, ...userSnap.docs[0].data() };
};
