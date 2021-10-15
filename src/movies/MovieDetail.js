import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieApi from '../api/Api';
import UserContext from '../auth/UserContext';
import { Button } from 'reactstrap';
import './MovieDetail.css';

function MovieDetail() {
	const { currentUser, addMovie, removeMovie } = useContext(UserContext);

	const { movie_id } = useParams();
	const [ movie, setMovie ] = useState([]);
	const user_id = currentUser.id;
	let imdb_id;

	function isInt(value) {
		var x = parseFloat(value);
		return !isNaN(value) && (x | 0) === x;
	}

	async function handleAdd(e) {
		e.preventDefault();
		if (!isInt(movie_id)) {
			let imdb_id = movie_id;
			return imdb_id;
		}
		await addMovie(user_id, imdb_id);
	}

	async function handleRemove(e) {
		e.preventDefault();
		await removeMovie(user_id, movie_id);
	}

	function addButton() {
		return (
			<Button className="MovieCard-Button" onClick={handleAdd} color="success">
				Add
			</Button>
		);
	}

	function removeButton() {
		return (
			<Button className="MovieCard-Button" onClick={handleRemove} color="danger">
				Remove
			</Button>
		);
	}

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
						console.log(movie.Title);
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
			<div>
				<h2>{movie.title || movie.Title}</h2>
				<p>{movie.year || movie.Year}</p>
				<p>{movie.genre || movie.Genre}</p>
				<p>{movie.plot || movie.Plot}</p>
				<p>{movie.director || movie.Director}</p>
				<p>{movie.imdb_rating || movie.imdbRating}</p>
				<img src={movie.poster || movie.Poster} alt={movie.title || movie.Title} />
				{/* {viewed ? removeButton() : addButton()} */}
			</div>
		</div>
	);
}

export default MovieDetail;
