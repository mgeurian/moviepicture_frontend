import React, { useState, useEffect } from 'react';
import MovieDetail from '../movies/MovieDetail';
import './MovieDetailModal.css';

function MovieDetailModal({ showModal, setShowModal, movie_id }) {
	return (
		<div>
			{showModal ? (
				<div>I'm a Modal.</div>
			) : // <MovieDetail movie_id={movie_id}/>
			null}
		</div>
	);
}

export default MovieDetailModal;
