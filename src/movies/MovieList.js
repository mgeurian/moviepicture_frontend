import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CardDeck } from 'reactstrap';
import MovieApi from '../api/Api';
import SearchForm from '../common/SearchForm';
import MovieCard from './MovieCard';
import LoadingSpinner from '../common/LoadingSpinner';
import UserContext from '../auth/UserContext';
import './MovieList.css';
import './MovieCard.css';

function MovieList() {
	const [ movies, setMovies ] = useState([]);
	const { currentUser } = useContext(UserContext);
	const id = currentUser.id;
	const history = useHistory();

	useEffect(
		() => {
			async function getMoviesOnMount(user_id) {
				try {
					let movies = await MovieApi.getUserMovies(user_id);
					setMovies(movies);
					console.log('these are the user-movies', movies);
				} catch (err) {
					console.log(err);
				}
			}
			getMoviesOnMount(id);
		},
		[ id ]
	);

	async function search(name) {
		let res = await MovieApi.getMovieByTitle(name);
		let movies = res.Search;
		console.log(movies);
		setMovies(movies);
	}

	async function addMovie(id, imdb_id) {
		try {
			let res = await MovieApi.postNewMovie(id, imdb_id);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	}

	// async function removeButton(id, movie_id) {
	// 	try {
	// 		console.log('removeButton clicked');
	// 		await MovieApi.removeMovie(id, movie_id);
	// 		history.push(`user/:id/movies/all`);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	function moviesAvailable() {
		return (
			<div>
				{movies && (
					<CardDeck className="flex-container d-flex justify-content-center">
						{movies.map((m) => (
							<MovieCard
								className="MovieCard"
								user_id={currentUser.id}
								key={m.id || m.imdbID}
								movie_id={m.movie_id}
								imdb_id={m.imdbID}
								title={m.title || m.Title}
								poster={m.poster || m.Poster}
								viewed={m.viewed}
								addMovie={addMovie}
								// removeButton={removeButton}
							/>
						))}
					</CardDeck>
				)}
			</div>
		);
	}

	function moviesNotAvailable() {
		return (
			<div className="float-right">
				<h3>Enter a search term to look for and add movies</h3>
			</div>
		);
	}

	if (!movies) return <LoadingSpinner />;

	return (
		<div>
			<div>
				<SearchForm searchFor={search} />
			</div>
			{movies.length > 0 ? moviesAvailable() : moviesNotAvailable()}
		</div>
	);
}

export default MovieList;
