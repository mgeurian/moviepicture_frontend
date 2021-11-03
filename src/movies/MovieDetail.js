import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MovieApi from '../api/Api';
import UserContext from '../auth/UserContext';
import useToggleState from '../hooks/useToggleState';
import { Button } from 'reactstrap';
import loremIpsumPoster from '../images/loremipsumposter.jpg';

import './MovieDetail.css';

function MovieDetail() {
	const { currentUser, addMovie, removeMovie } = useContext(UserContext);
	const params = useParams();
	const [ movieId, setMovieId ] = useState(params.movie_id);
	const [ movie, setMovie ] = useState([]);
	const [ isViewed, toggleIsViewed ] = useToggleState();
	const user_id = currentUser.id;
	const history = useHistory();

	function isInt(value) {
		var x = parseFloat(value);
		return !isNaN(value) && (x | 0) === x;
	}

	async function handleAdd(e) {
		e.preventDefault();
		toggleIsViewed(true);
		try {
			let imdb_id;
			if (!isInt(movieId)) {
				imdb_id = movieId;
			}
			await addMovie(user_id, imdb_id);
		} catch (err) {
			console.log(err);
		}
		history.push(`/user/${currentUser.id}/movies/all`);
	}

	async function handleRemove(e) {
		e.preventDefault();
		try {
			await removeMovie(user_id, movieId);
		} catch (err) {
			console.log(err);
		}
		history.push(`/user/${currentUser.id}/movies/all`);
	}

	function addButton() {
		return (
			<Button className="MovieDetail-Button" onClick={handleAdd} color="success">
				Add
			</Button>
		);
	}

	function removeButton() {
		return (
			<Button className="MovieDetail-Button" onClick={handleRemove} color="danger">
				Remove
			</Button>
		);
	}

	useEffect(
		() => {
			async function getMoviesOnMount(movie_id, userId) {
				try {
					if (isInt(movie_id)) {
						let movie = await MovieApi.getMovieById(movie_id);
						setMovie(movie);
					} else {
						let movie = await MovieApi.getMovieFromOmdb(movie_id, userId);
						if (movie.data.Poster === 'N/A') {
							movie.data.Poster = loremIpsumPoster;
						}
						if (movie.viewedResults.viewed) {
							toggleIsViewed(movie.viewedResults.viewed);
							setMovieId(movie.viewedResults.movie_id);
						}

						toggleIsViewed(movie.viewedResults.viewed);
						setMovie(movie.data);
					}
				} catch (err) {
					console.log(err);
				}
			}
			getMoviesOnMount(movieId, user_id);
		},
		[ movieId, user_id, setMovie ]
	);

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
			</div>
			{isViewed ? removeButton() : addButton()}
		</div>
	);
}

export default MovieDetail;
