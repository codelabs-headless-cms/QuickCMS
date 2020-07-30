import React from 'react';
import { Link } from 'react-router-dom';

import '../app.css';
import './homepage.css';

class Homepage extends React.Component {
	state = {
		projects: [],
		allProjects: [],
	};

	getProjects = () => {
		fetch('/projects')
			.then((response) => response.json())
			.then((projects) => {
				this.setState({ projects: projects, allProjects: projects });
			});
	};

	componentDidMount() {
		this.getProjects();
	}

	handleChange = (e) => {
		this.setState({
			projects: this.state.allProjects.filter((p) =>
				p.title.includes(e.target.value)
			),
		});
	};

	render() {
		return (
			<div className="homepage_container vh-100">
				<div className="header">
					<div>
						<h4 className="homepage_app_name">QuickCMS</h4>
					</div>
					<div>
						<Link className="nav_button" to="#">
							Help
						</Link>
						<Link className="nav_button" to="/profile">
							Your account
						</Link>
					</div>
				</div>

				<div className="d-flex flex-row col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7 mt-4 mx-auto">
					<div>
						<h5 className="heading">Your Projects</h5>{' '}
					</div>
					<div className="ml-auto">
						<Link to="/new" className="btn ">
							New Project
						</Link>
					</div>
				</div>

				<div className="d-flex flex-column col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7 mt-4 mx-auto">
					<input
						type="text"
						value={this.state.search_value}
						id="search"
						className="input"
						onChange={this.handleChange}
						placeholder="Search for projects "
					/>
				</div>

				<div className="d-flex flex-column mx-auto mt-4 col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7">
					{this.state.projects.map((project, index) => (
						<Link
							className=" project_name"
							key={index}
							to={`project/${project.projectId}/pages`}>
							{' '}
							<div className="block"> </div>{' '}
							<div className="project_title">Project Name: {project.title}</div>
						</Link>
					))}
				</div>
			</div>
		);
	}
}

export default Homepage;
