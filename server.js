if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const morgan = require('morgan');
require('./services/passport');

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [process.env.COOKIES_KEY],
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
console.log('Running at ' + PORT);
app.listen(PORT);
