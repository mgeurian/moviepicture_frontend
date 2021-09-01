import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieApi from '../api/Api';
import useFlipState from '../hooks/useFlipState';

function MovieDetail() {
	const { movie_id } = useParams();

	const [ movie, setMovie ] = useState([]);

	const [ view, flipView ] = useFlipState();

	useEffect(
		() => {
			async function getMovieById(movieId) {
				let movie = await MovieApi.getMovieById(movieId);
				setMovie(movie);
				console.log(movie);
			}
			getMovieById(movie_id);
		},
		[ movie_id ]
	);

	// this needs to update the viewed property of user_movie in the database
	// now, it only changes the text in the element, it does not update the db

	// async function handleView(){

	// }

	return (
		<div className="MovieDetail col-md-8 offset-md-2">
			<h2>{movie.title}</h2>
			<p>{movie.year}</p>
			<p>{movie.genre}</p>
			<p>{movie.plot}</p>
			<p>{movie.director}</p>
			<p>{movie.imdb_rating}</p>
			<img src={movie.poster} alt={movie.title} />

			<button className="btn btn-primary font-weight-bold text-uppercase float-right" onClick={flipView}>
				{' '}
				{view ? 'Seen' : 'Not Seen'}{' '}
			</button>
		</div>
	);
}

export default MovieDetail;
