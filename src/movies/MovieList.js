import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Row } from 'reactstrap';
import MovieApi from '../api/Api';
import SearchForm from '../common/SearchForm';
import MovieCard from './MovieCard';
import Pagination from '../common/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import UserContext from '../auth/UserContext';
import './MovieList.css';
import './MovieCard.css';

function MovieList() {
	const [ movies, setMovies ] = useState([]);
	const [ numberOfMovies, setNumberOfMovies ] = useState(0);
	const { currentUser, addMovie, removeMovie } = useContext(UserContext);

	const [ currentPage, setCurrentPage ] = useState(1);
	const [ moviesPerPage ] = useState(10);

	const location = useLocation();
	const history = useHistory();

	const searchParams = useLocation().search;
	const page = Number(new URLSearchParams(searchParams).get('page')) || 1;

	const { id, type } = useParams();

	//this useEffect generates a user's movieList and all subsequent records for pages within.
	useEffect(
		() => {
			async function getMoviesOnMount(user_id, pageNum, viewType) {
				try {
					let res = await MovieApi.getUserMovies(user_id, pageNum, viewType);
					// console.log(movies);
					setMovies(res.Search);
					setNumberOfMovies(res.totalResults.count);
					console.log('here are the movies from getMoviesOnMount: ', movies);
					console.log('here are the number of results: ', numberOfMovies);
					console.log('this line 39, these values come from the following location: ', location.pathname);
				} catch (err) {
					console.log(err);
				}
			}
			getMoviesOnMount(id, page, type);
		},
		[ id, page, type ]
	);

	// useEffect(
	// 	() => {
	// 		const searchMovies = async (name) => {
	// 			let res = await MovieApi.getMovieByTitle(name);

	// 			console.log(res.data);
	// 			setMovies(res.Search);
	// 			setNumberOfMovies(res.totalResults);
	// 		};

	// 		searchMovies();
	// 	},
	// 	[ currentPage ]
	// );

	// get movies by title and pass in the page number received from the paginate function below
	async function search(name, currentPage) {
		let res = await MovieApi.getMovieByTitle(name, currentPage);
		// console.log('these are the search results: ', res.Search, res.totalResults);
		let movies = res.Search;
		let totalResults = res.totalResults;
		setMovies(movies);
		setNumberOfMovies(totalResults);
		const queryString = location.search;
		const params = new URLSearchParams(queryString);
		console.log(params);

		// history.push({
		// 	pathname: `/movie/search?q=${name}`,
		// 	page: `${currentPage}`
		// });

		// console.log('here are the movies from getMovieByTitle: ', movies);
		// console.log('here are the number of results: ', numberOfMovies);
		// console.log('this line 74, these values come from the following location: ', location.pathname);
	}

	const paginate = (pageNumber) => {
		console.log(pageNumber);
		setCurrentPage(pageNumber);
	};

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
								key={m.id || m.imdbID}
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
				<Pagination itemsPerPage={moviesPerPage} totalItems={numberOfMovies} paginate={paginate} />
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
