import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieApi from '../api/Api';

function MovieDetail() {
	const { movie_id } = useParams();

	const [ movie, setMovie ] = useState([]);

	useEffect(
		() => {
			async function getMovie() {
				let res = await MovieApi.getMovie(movie_id);
				setMovie(res);
			}
			getMovie();
		},
		[ movie_id ]
	);

	return (
		<div className="MovieDetail col-md-8 offset-md-2">
			<h2>{movie.title}</h2>
			<p>{movie.year}</p>
			<p>{movie.genre}</p>
			<p>{movie.plot}</p>
			<p>{movie.director}</p>
			<p>{movie.imdb_rating}</p>
			<img src={movie.poster} alt={movie.title} />

			{/* <button className ="btn btn-primary font-weight-bold text-uppercase float-right" onClick={handleView}> {viewed ? "Watched" : "Not Watched"} </button> */}
		</div>
	);
}

export default MovieDetail;
