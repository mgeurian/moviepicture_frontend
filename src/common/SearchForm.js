import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ searchFor }) {
	const [ searchTerm, setSearchTerm ] = useState('');
	function handleSubmit(e) {
		e.preventDefault();
		console.log(searchTerm);
		searchFor(searchTerm.trim() || undefined);
		setSearchTerm(searchTerm.trim());
	}

	function handleChange(e) {
		const { value } = e.target;
		setSearchTerm(value);
		console.log(e.target.value);
	}

	return (
		<div className="container">
			<form className="form-inline input-group" onSubmit={handleSubmit}>
				<input
					className="form-control"
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
