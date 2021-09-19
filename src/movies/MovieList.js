import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row } from 'reactstrap';
import MovieApi from '../api/Api';
import SearchForm from '../common/SearchForm';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import UserContext from '../auth/UserContext';
import './MovieList.css';
import './MovieCard.css';

function MovieList() {
	const [ movies, setMovies ] = useState([]);
	const { currentUser, addMovie, removeMovie } = useContext(UserContext);

	const searchParams = useLocation().search;
	const page = Number(new URLSearchParams(searchParams).get('page'));

	const id = currentUser.id;

	useEffect(
		() => {
			async function getMoviesOnMount(user_id, pageNum) {
				try {
					let movies = await MovieApi.getUserMovies(user_id, pageNum);
					setMovies(movies);
					console.log('these are the user-movies', movies);
				} catch (err) {
					console.log(err);
				}
			}
			getMoviesOnMount(id, page);
		},
		[ id, page ]
	);

	// const [ movies, setMovies ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ moviesPerPage, setMoviesPerPage ] = useState(10);
	const [ totalResults, setTotalResults ] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			setLoading(true);

			// change this get request to be the same as what's in the search bar
			const res = await axios.get('http://www.omdbapi.com/?apikey=964e3a1b&type=movie&s=star+wars');
			setMovies(res.data.Search);
			setTotalResults(res.data.totalResults);
			setLoading(false);
		};
		fetchMovies();
	}, []);

	// get current movies
	const indexOfLastMovie = currentPage * moviesPerPage;
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

	// change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	async function search(name) {
		let res = await MovieApi.getMovieByTitle(name);
		console.log('these are the total results available: ', res.totalResults);
		let movies = res.Search;
		console.log(movies);
		setMovies(movies);
	}

	function moviesAvailable() {
		return (
			<div className="MovieList mt-5">
				{movies && (
					<Row
						className="MovieList-Row d-flex justify-content-center"
						xs="auto"
						sm="auto"
						md="auto"
						lg="auto"
						xl="auto"
					>
						{movies.map((m) => (
							<MovieCard
								user_id={currentUser.id}
								key={m.id}
								movie_id={m.movie_id}
								imdb_id={m.imdbID}
								title={m.title || m.Title}
								poster={m.poster || m.Poster}
								viewed={m.viewed}
								addMovie={addMovie}
								removeMovie={removeMovie}
							/>
						))}
					</Row>
				)}
				<Pagination moviesPerPage={moviesPerPage} totalMovies={totalResults} paginate={paginate} />
			</div>
		);
	}

	function moviesNotAvailable() {
		return (
			<div>
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
