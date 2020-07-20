import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './login.css';
import '../app.css';

const Login = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState({ email: '', password: '' });
	const [error, setError] = useState(false);

	const handleSubmit = (e) => {
		setError(false);
		axios
			.post('/login', user)
			.then(() => setLoggedIn(true))
			.catch((error) => {
				setError(true);
			});
		e.preventDefault();
	};

	if (loggedIn) {
		window.location = '/new';
	}

	return (
		<div className="container">
			<h4 className="login app_name">QuickCMS</h4>
			<form className="login-form form" onSubmit={handleSubmit}>
				<h3 className="heading">Log in</h3>
				{error ? (
					<span className="text-danger">Invalid email or password</span>
				) : (
					<br />
				)}
				<div className="form-group">
					<label htmlFor="InputEmail">Email address</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="myname@email.com"
						value={user.email}
						onChange={(e) => setUser({ ...user, email: e.target.value })}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="InputPassword">Password</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword1"
						placeholder="Secret password"
						value={user.password}
						onChange={(e) => setUser({ ...user, password: e.target.value })}
					/>
					<small id="emailHelp" className="form-text text-muted">
						Don't have an account? <Link to="/signup"> Sign up here.</Link>
					</small>
				</div>

				<button type="submit" className="btn btn-dark">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
