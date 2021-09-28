import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="container">
			<ul className="pagination">
				{pageNumbers.map((number) => (
					<li key={number} className="page-item">
						<span onClick={() => paginate(number)} className="page-link">
							{number}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Pagination;
