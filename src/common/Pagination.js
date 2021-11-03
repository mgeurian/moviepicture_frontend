import React, { useState } from 'react';

const PaginationComponent = ({ itemsPerPage, totalItems, paginate }) => {
	const pageNumbers = [];
	const [ pageNumber, setPageNumber ] = useState(0);

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	const firstPage = () => {
		let number = 1;
		console.log(number);
		setPageNumber(number);
		paginate(number);
	};

	const previousPage = () => {
		let number = pageNumber - 1;
		console.log(number);
		setPageNumber(number);
		paginate(number);
	};

	const nextPage = () => {
		let number = pageNumber + 1;
		console.log(number);
		setPageNumber(number);
		paginate(number);
	};

	const lastPage = () => {
		let number = pageNumbers.length - 1;
		console.log(number);
		setPageNumber(number);
		paginate(number);
	};

	//in the future, create 2 returns: 1.) to view lists with less than 10 pages, 2.) to view lists with more than 10 pages
	// 1. will return just a div/ul/and mapped list of li
	// 2. will return first/previous/next/last li along with a mapped list

	return (
		<div className="container">
			<ul className="pagination">
				<li className="page-item">
					<span className="page-link" onClick={firstPage}>
						&lt;&lt;
					</span>
				</li>
				<li className="page-item">
					<span className="page-link" onClick={previousPage}>
						&lt;
					</span>
				</li>

				{pageNumbers.map((number) => (
					<li key={number} className="page-item">
						<span onClick={() => paginate(number)} className="page-link">
							{number}
						</span>
					</li>
				))}

				<li className="page-item">
					<span className="page-link" onClick={nextPage}>
						&gt;
					</span>
				</li>
				<li className="page-item">
					<span className="page-link" onClick={lastPage}>
						&gt;&gt;
					</span>
				</li>
			</ul>
		</div>
	);
};

export default PaginationComponent;
