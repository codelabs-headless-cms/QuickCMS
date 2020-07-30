import React from 'react';
import axios from 'axios';
import "./side-bar.css";



	const SideBar = (props) => {

		const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post('/project', project)
			.then((res) => setPostSuccess(res.data))
			.catch((error) => console.log(error));
	};
	return (
		<div className="side-bar">
			<div className="page">
				<p className="header">How to edit a page</p>
			</div>

		<button className="createPage">Create Page</button>
		</div>


	);
};
export default SideBar;
