import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Row } from 'reactstrap';
import MovieApi from '../api/Api';
import SearchForm from '../common/SearchForm';
import MovieCard from './MovieCard';
// import Pagination from './Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import UserContext from '../auth/UserContext';
import './MovieList.css';
import './MovieCard.css';

function MovieList() {
	const [ movies, setMovies ] = useState([]);
	const [ numOfMovies, setNumOfMovies ] = useState(0);
	const { currentUser, addMovie, removeMovie } = useContext(UserContext);

	const searchParams = useLocation().search;
	const page = Number(new URLSearchParams(searchParams).get('page')) || 1;

	const { id, type } = useParams();

	//this useEffect generates a user's movieList and all subsequent records for pages within.
	useEffect(
		() => {
			async function getMoviesOnMount(user_id, pageNum, viewType) {
				try {
					let movies = await MovieApi.getUserMovies(user_id, pageNum, viewType);
					setMovies(movies.Search);
					setNumOfMovies(movies.totalResults);
				} catch (err) {
					console.log(err);
				}
			}
			getMoviesOnMount(id, page, type);
		},
		[ id, page, type ]
	);

	// const [ movies, setMovies ] = useState([]);
	// const [ loading, setLoading ] = useState(false);
	// const [ currentPage, setCurrentPage ] = useState(1);
	// const [ moviesPerPage, setMoviesPerPage ] = useState(10);
	// const [ totalResults, setTotalResults ] = useState(null);

	// useEffect(() => {
	// 	async function fetchMoviesOnSearch() {
	// 		setLoading(true);
	// 		const res = await axios.get('http://www.omdbapi.com/?apikey=964e3a1b&type=movie&s=star+wars');
	// 		setMovies(res.data.Search);
	// 		setTotalResults(res.data.totalResults);
	// 		setLoading(false);
	// 	}
	// 	fetchMoviesOnSearch();
	// }, []);

	// This block is the current pagination code

	// get current movies
	// const indexOfLastMovie = currentPage * moviesPerPage;
	// const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	// const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

	// change page
	// const paginate = (pageNumber) => setCurrentPage(pageNumber);

	async function search(name) {
		let res = await MovieApi.getMovieByTitle(name);
		console.log('these are the total results available: ', res.totalResults);
		let movies = res.Search;
		console.log(movies);
		setMovies(movies);
	}

	{
		/* <Pagination moviesPerPage={moviesPerPage} totalMovies={totalResults} paginate={paginate} /> */
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
