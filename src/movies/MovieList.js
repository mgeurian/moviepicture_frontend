import React, { useState, useEffect } from 'react';
import MovieApi from '../api/Api';
import SearchBar from '../common/SearchForm';
import MovieCard from './MovieCard';
import LoadingSpinner from '../LoadingSpinner';

function MovieList() {
	const [ movies, setMovies ] = useState([]);

	useEffect(function getMoviesOnMount() {
		search();
	}, []);

	async function search(name) {
		let movies = await MovieApi.getMovies(name);
		setMovies(movies);
	}

	if (!movies) return <LoadingSpinner />;

	return (
		<div className="MovieList container">
			<SearchForm searchFor={search} />
			{movies && (
				<div>
					{movies.MovieApi((m) => (
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
