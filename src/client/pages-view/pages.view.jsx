import React from 'react';

const PagesView = (props) => {
	return (
		<div>
			This is where pages should be is of this project {props.match.params.id}
		</div>
	);
};

export default PagesView;
