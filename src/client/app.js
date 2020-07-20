import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import axios from 'axios';

import Login from './login/login';
import SignUp from './signup/signup';
import CreateProject from './create-project/create-project';
import { PrivateRoute } from './components/private-route/private-route';

const App = () => {
	const [user, setUser] = useState('');
	useEffect(() => {
		axios
			.get('/current_user')
			.then((result) => setUser(result.data))
			.catch(() => setUser(false));
	}, []);

	const loginRoutes = [
		<Route path="/login" component={Login} exact key={1} />,
		<Route path="/signup" component={SignUp} exact key={2} />,
		<Redirect to="/login" key={999} />,
	];

	const userRoutes = [
		<PrivateRoute
			path="/new"
			component={CreateProject}
			auth={user}
			exact
			key={1}
		/>,
		<Redirect to="new" key={999} />,
	];

	return (
		<Router>
			<Switch>{user ? userRoutes : loginRoutes}</Switch>
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
