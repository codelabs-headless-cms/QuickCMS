import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BackButtonHeader from '../components/back-button-header/back-button-header';
import { Trash2 } from 'react-feather';

import './create-project.css';

const CreateProject = () => {
	const blankField = { key: '', value: 'String' };
	const [project, setProject] = useState({
		title: '',
		description: '',
		schema: [{ ...blankField }],
	});
	const [schemaFields, setSchemaFields] = useState([{ ...blankField }]);

	const addField = () => {
		setProject({ ...project, schema: [...project.schema, { ...blankField }] });
	};

	const removeField = () => {
		project.schema.pop();
		setSchemaFields([...schemaFields]);
	};

	const handleFieldChange = (e) => {
		const updateFields = [...project.schema];
		updateFields[e.target.dataset.idx][e.target.id] = e.target.value;
		setProject({ ...project, schema: [...updateFields] });
	};

	const handleSubmit = (event) => {
		axios
			.post('/project', project)
			.then((res) => console.log(res))
			.catch((error) => console.log(error));

		event.preventDefault();
	};

	return (
		<div>
			<BackButtonHeader title="Go Back" backLink="/" buttons={false} />
			<div className="bg-white min-vh-100 h-100">
				<form
					className="col-12 col-sm-7 col-md-5 col-lg-4 mx-auto"
					onSubmit={handleSubmit}>
					<h3 className="mx-auto py-4 inline">Create a new project</h3>

					<div className="form-group">
						<label htmlFor="projectName">Project Name</label>
						<input
							type="text"
							className="form-control"
							id="projectName"
							placeholder="My project name"
							value={project.title}
							onChange={(e) =>
								setProject({ ...project, title: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="projectDescription">Project Description</label>
						<textarea
							className="form-control"
							id="projectDescription"
							placeholder="My project description"
							value={project.description}
							onChange={(e) =>
								setProject({ ...project, description: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="projectSchema">Project Schema</label>

						{project.schema.map((val, idx) => {
							const keyID = `key-${idx}`;
							const valueID = `value-${idx}`;
							return (
								<div key={`field-${idx}`} className="form-row">
									<input
										placeholder="Field Name"
										type="text"
										name={keyID}
										className="form-control col-7"
										data-idx={idx}
										id="key"
										value={project.schema[idx].key}
										onChange={handleFieldChange}
										required
									/>

									<select
										name={valueID}
										className="form-control col-4"
										data-idx={idx}
										id="value"
										value={project.schema[idx].value}
										onChange={handleFieldChange}>
										<option value="String" id="value">
											String
										</option>
										<option value="Number">Number</option>
									</select>
									<div className="col-1 mt-1 text-danger">
										<Trash2
											onClick={removeField}
											style={{ cursor: 'pointer' }}
										/>
									</div>
								</div>
							);
						})}
						<div className="d-flex justify-content-center">
							<input
								type="button"
								value="Add New Field"
								className="add-new-field-button"
								onClick={addField}
							/>
						</div>
					</div>

					<button type="submit" className="btn text-white col-12 col-sm-6 mt-3">
						Create Project
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateProject;