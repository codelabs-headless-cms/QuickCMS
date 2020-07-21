import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import './signup.css';
import '../app.css';

const SignUp = ({ auth }) => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (user.password !== user.confirmPassword) {
			return setError('Passwords do not match');
		}

		axios
			.post('/signup', user)
			.then((response) => {
				if (response.data.error) {
					setError(response.data.error);
				} else {
					setError(false);
					setSuccess(true);
				}
			})
			.catch(() => {
				setError(true);
			});
	};

	if (auth) {
		return <Redirect to="/new" />;
	}

	if (success) {
		return <Redirect to="/login" />;
	}

	return (
		<div className="container">
			<h4 className="app_name">QuickCMS</h4>
			<form className="signup-form form" onSubmit={handleSubmit}>
				<h3 className="heading">Sign Up</h3>
				{error ? <span className="text-danger">{error}</span> : <br />}
				<div className="form-group">
					<label className="form-label" htmlFor="name">
						Your Name
					</label>
					<input
						type="text"
						className="form-control"
						placeholder="Enter your name here"
						value={user.name}
						onChange={(e) => setUser({ ...user, name: e.target.value })}
					/>
				</div>

				<div className="form-group">
					<label className="form-label" htmlFor="email">
						Your Email Address
					</label>
					<input
						type="email"
						className="form-control"
						id="InputEmail"
						placeholder="myname@email.com"
						value={user.email}
						onChange={(e) => setUser({ ...user, email: e.target.value })}
					/>
				</div>

				<div className="form-group">
					<label className="form-label" htmlFor="InputPassword1">
						Enter Your Password
					</label>
					<input
						type="password"
						className="form-control"
						id="InputPassword1"
						placeholder="Secret password"
						value={user.password}
						onChange={(e) => setUser({ ...user, password: e.target.value })}
					/>
				</div>

				<div className="form-group">
					<label className="form-label" htmlFor="InputPassword2">
						Confirm Your Password
					</label>
					<input
						type="password"
						className="form-control"
						id="InputPassword2"
						placeholder="Secret password"
						value={user.confirmPassword}
						onChange={(e) =>
							setUser({ ...user, confirmPassword: e.target.value })
						}
					/>
					<small id="emailHelp" className="form-text text-muted">
						Already have an account? <Link to="/login"> login here.</Link>
					</small>
				</div>

				<button type="submit" className="btn btn-dark">
					Sign up
				</button>
			</form>
		</div>
	);
};

export default SignUp;
