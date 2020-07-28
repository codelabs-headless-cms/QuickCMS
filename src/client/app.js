import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useLocation,
} from 'react-router-dom';
import axios from 'axios';

import Login from './login/login';
import SignUp from './signup/signup';
import CreateProject from './create-project/create-project';
import { PrivateRoute } from './components/private-route/private-route';
import PagesView from './pages-view/pages.view';
import Spinner from './components/spinner/spinner';
import Profile from './profile/profile';

const App = () => {
	const [user, setUser] = useState({ data: null, loading: true });
	const location = useLocation();

	useEffect(() => {
		axios
			.get('/current_user')
			.then((result) => {
				setUser({ data: result.data, loading: false });
			})
			.catch(() => {
				setUser({ data: '', loading: false });
			});
	}, [location]);

	if (user.loading) {
		return <Spinner />;
	}

	const { data } = user;

	return (
		<Switch>
			<Route
				path="/login"
				component={(props) => <Login auth={data} {...props} />}
				exact
			/>
			<Route
				path="/signup"
				component={(props) => <SignUp auth={data} {...props} />}
				exact
			/>
			<PrivateRoute path="/new" component={CreateProject} auth={data} exact />
			<PrivateRoute
				path="/project/:id/pages"
				component={PagesView}
				auth={data}
				exact
			/>
			<PrivateRoute path="/profile" component={Profile} auth={data} exact />
		</Switch>
	);
};

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
