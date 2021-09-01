import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ searchFor }) {
	const [ searchTerm, setSearchTerm ] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		searchFor(searchTerm.trim());
		setSearchTerm(searchTerm.trim());
	}

	function handleChange(e) {
		const { value } = e.target;
		setSearchTerm(value);
	}

	return (
		<div className="container">
			<form className="form-inline input-group" onSubmit={handleSubmit}>
				<input
					className="form-control"
					type="search"
					name="searchTerm"
					placeholder="Enter search term..."
					value={searchTerm}
					onChange={handleChange}
				/>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default SearchForm;
