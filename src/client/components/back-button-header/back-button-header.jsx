import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowLeft } from 'react-feather';
import './back-button-header.css';

const BackButtonHeader = ({ title, backLink }) => {
	return (
		<div className="row border-bottom bg-white text-dark p-0 mx-0">
			<Link to={backLink} className="btn back-button">
				<ArrowLeft />
			</Link>
			<div className="my-auto ml-2">
				<strong>{title}</strong>
			</div>
		</div>
	);
};

export default BackButtonHeader;
