import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MovieApi from '../api/Api';

// if movie_id does not follow this pattern 'tt1234567', then it is in our moviepicture_db.
// It should display a remove

function MovieDetail({}) {
	const { movie_id } = useParams();
	const [ movie, setMovie ] = useState([]);

	// const location = useLocation();
	// const { movieData } = location.state;
	// console.log('this is moviedetail moviedata: ', movieData);

	function isInt(value) {
		var x = parseFloat(value);
		return !isNaN(value) && (x | 0) === x;
	}

	// if (isInt(movie_id)) {
	// 	getMovieById(movie_id);
	// } else {
	// 	getMovieFromOmdb(movie_id);
	// }

	useEffect(
		() => {
			async function getMoviesOnMount(movie_id) {
				try {
					if (isInt(movie_id)) {
						let movie = await MovieApi.getMovieById(movie_id);
						console.log('from movieDetail: ', movie);
						setMovie(movie);
					} else {
						let movie = await MovieApi.getMovieFromOmdb(movie_id);
						console.log(movie);
						setMovie(movie);
					}
				} catch (err) {
					console.log(err);
				}
			}
			getMoviesOnMount(movie_id);
		},
		[ movie_id ]
	);

	// async function getMovieFromOmdb(movieId) {
	// 	let movie = await MovieApi.getMovieFromOmdb(movieId);
	// 	setMovie(movie);
	// 	console.log(movie);
	// }

	// async function getMovieById(movieId) {
	// 	let movie = await MovieApi.getMovieById(movieId);
	// 	setMovie(movie);
	// 	console.log(movie);
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
		</div>
	);
}

export default MovieDetail;
