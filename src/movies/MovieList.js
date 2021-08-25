import React, { useContext, useState, useEffect } from 'react';
import MovieApi from '../api/Api';
import SearchForm from '../common/SearchForm';
import MovieCard from './MovieCard';
import LoadingSpinner from '../common/LoadingSpinner';
import UserContext from '../auth/UserContext';

function MovieList() {
	const [ movies, setMovies ] = useState([]);
	const { currentUser } = useContext(UserContext);
	const id = currentUser.id;

	useEffect(
		() => {
			async function getMoviesOnMount(user_id) {
				try {
					let movies = await MovieApi.getUserMovies(user_id);
					setMovies(movies);
				} catch (err) {
					console.log(err);
				}
			}
			getMoviesOnMount(id);
		},
		[ id ]
	);

	async function search(name) {
		let movies = await MovieApi.getUserMovies(name);
		setMovies(movies);
	}

	if (!movies) return <LoadingSpinner />;

	return (
		<div className="MovieList container">
			<SearchForm searchFor={search} />
			{movies && (
				<div>
					{movies.map((m) => (
						<MovieCard
							key={m.id}
							movie_id={m.movie_id}
							title={m.title}
							year={m.year}
							genre={m.genre}
							plot={m.plot}
							director={m.director}
							poster={m.poster}
							imdb_rating={m.imdb_rating}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default MovieList;
