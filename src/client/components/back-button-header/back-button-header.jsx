import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowLeft } from 'react-feather';
import './back-button-header.css';

const BackButtonHeader = ({ title, buttons, backLink }) => {
	return (
		<div className="row border-bottom bg-white text-dark p-0 mx-0">
			<Link to={backLink} className="btn back-button">
				<ArrowLeft />
			</Link>
			<div className="my-auto ml-2">
				<strong>{title}</strong>
			</div>
			{buttons ? (
				<div className="ml-auto mr-2 my-auto">
					<Link to="" className="btn share-button btn-sm px-4 mx-2">
						<span>Share</span>
					</Link>
					<Link to="" className="btn save-button btn-sm px-5 mx-2">
						<span>Save</span>
					</Link>
				</div>
			) : null}
		</div>
	);
};

export default BackButtonHeader;
