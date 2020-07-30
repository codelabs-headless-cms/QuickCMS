import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButtonHeader from '../components/back-button-header/back-button-header';

import './pages-view.css';

const PagesView = (props) => {
	const [pages, setPages] = useState([]);
	const [schema, setSchema] = useState([]);
	const [form, setForm] = useState({
		projectId: props.match.params.id,
		title: '',
		schema: [],
	});

	useEffect(() => {
		axios
			.get(`/project/pages?id=${props.match.params.id}`)
			.then((pages) => setPages(pages.data));

		axios
			.get(`/project?id=${props.match.params.id}`)
			.then((project) => setSchema(project.data.schema));
	}, []);

	useEffect(() => {
		const newSchema = [];
		schema.forEach((data) => {
			var key = data.key;
			var obj = {};
			obj[key] = '';
			newSchema.push(obj);
			setForm({ ...form, schema: [...newSchema] });
		});
	}, [schema]);

	const handleSubmit = () => {
		axios.post('/project/page', form).then((res) => console.log(res.data));
	};

	const handleChange = (e) => {
		const updateFields = [...form.schema];
		updateFields[e.target.dataset.idx][e.target.id] = e.target.value;
		setForm({ ...form, schema: [...updateFields] });
	};

	return (
		<React.Fragment>
			<BackButtonHeader title="Go Back" backLink="/homepage" />
			<div className="container-fluid bg-white">
				<div className="row">
					<div className="col-3 px-0 bg-white border-right  position-fixed min-vh-100 h-100">
						{pages.map((page, index) => (
							<div className="page border-bottom p-3" key={index}>
								<p className="font-weight-bold mb-0">{page.title}</p>
							</div>
						))}
						<button className="btn w-50 mx-auto d-block mt-4">New Page</button>
					</div>
					<div className="col offset-3 px-0" id="main">
						<form
							className="bg-white h-100 min-vh-100 p-4 col-12 col-sm-8 col-md-7"
							onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="pageTitle">Page Title</label>
								<input
									type="text"
									className="form-control"
									id="pageTitle"
									placeholder="Page title"
									value={form.title}
									onChange={(e) => setForm({ ...form, title: e.target.value })}
									required
								/>
								<hr />

								{schema.map((data, index) => (
									<div className="form-group" key={index}>
										<label>{data.key}</label>
										<input
											type={data.value == 'String' ? 'text' : 'number'}
											className="form-control"
											placeholder={data.key}
											data-idx={index}
											id={data.key}
											onChange={handleChange}
											required
										/>
									</div>
								))}
								<button
									type="submit"
									className="btn text-white col-12 col-sm-6 mt-3"
									style={{ backgroundColor: '#0dd3ff' }}>
									Create Page
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default PagesView;
