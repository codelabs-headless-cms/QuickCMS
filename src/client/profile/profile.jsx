import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import BackButtonHeader from '../components/back-button-header/back-button-header';

import './profile.css';
import Spinner from '../components/spinner/spinner';

const Profile = () => {
	const [profile, setProfile] = useState({
		name: null,
		email: null,
		token: null,
		loading: false,
	});
	useEffect(() => {
		setProfile({ ...profile, loading: true });
		axios.get('/current_user').then((user) => {
			const { token, email, name } = user.data;
			setProfile({ email: email, token: token, name: name, loading: false });
		});
	}, []);

	if (profile.loading) {
		return <Spinner />;
	}

	const handleLogout = () => {
		axios.get('/logout').then(() => {
			window.location = '/login';
			// return <Redirect to="/login" />; // This is not working
		});
	};

	const handleRefresh = () => {
		axios.get('/refresh_token').then((token) => {
			setProfile({ ...profile, token: token.data });
		});
	};

	const { name, token, email } = profile;

	return (
		<div>
			<BackButtonHeader title="Go Back" backLink="/homepage" buttons={false} />
			<div className="bg-white min-vh-100 h-100">
				<div className="col-12 col-sm-7 col-md-5 col-lg-4 mx-auto">
					<h3 className="mx-auto py-4 inline">Profile</h3>
					<p>
						<span className="font-weight-bold">NAME: </span>
						{name}
					</p>
					<p>
						<span className="font-weight-bold">EMAIL: </span>
						{email}
					</p>
					<p className="text-break">
						<span className="font-weight-bold">TOKEN: </span>
						{token}
					</p>

					<button
						onClick={handleRefresh}
						className="btn btn-sm text-white col-6 col-sm-5 mt-3 d-block">
						Refresh Token
					</button>

					<button
						onClick={handleLogout}
						className="btn logout-button text-white col-6 col-sm-5 mt-5 d-block">
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
