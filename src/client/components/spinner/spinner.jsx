import React from 'react';

const Spinner = () => {
	return (
		<div className="d-flex justify-content-center vh-100">
			<div
				className="spinner-border"
				role="status"
				style={{ marginTop: '40vh' }}>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};

export default Spinner;
