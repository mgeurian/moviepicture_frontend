import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Row } from 'reactstrap';
import MovieApi from '../api/Api';
import SearchForm from '../common/SearchForm';
import MovieCard from '../movies/MovieCard';
import Pagination from './Pagination';
import UserContext from '../auth/UserContext';
import '../movies/MovieList.css';
import '../movies/MovieCard.css';

function SearchList() {
	const { currentUser } = useContext(UserContext);
	const id = currentUser.id;

	const location = useLocation();
	const searchItem = location.state.params;
	console.log("here's the name: ", searchItem);

	const [ movies, setMovies ] = useState([]);
	const [ numberOfMovies, setNumberOfMovies ] = useState(0);
	const [ currentPage, setCurrentPage ] = useState();
	const [ currentFilter, setCurrentFilter ] = useState(location.state.params);
	const [ moviesPerPage, setMoviesPerPage ] = useState(10);
	const [ moviesLength, setMoviesLength ] = useState(null);

	// const history = useHistory();

	useEffect(
		() => {
			async function getMoviesOnMount(user_id, pageNum) {
				try {
					if (currentFilter) {
						search(currentFilter, currentPage);
						console.log('just checking if we are here');
					} else {
					}
				} catch (err) {
					console.log(err);
				}
			}
			getMoviesOnMount(id, currentPage);
		},
		[ currentFilter, currentPage ]
	);

	async function search(name, currentPage) {
		let res = await MovieApi.getMovieByTitle(name, currentPage);
		let movies = res.Search;
		let totalResults = res.totalResults;
		console.log('here are the movies returned from search function: ', movies);
		setCurrentFilter(name);
		setMovies(movies);
		setNumberOfMovies(totalResults);
	}

	const paginate = (pageNumber) => {
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
								user_id={id}
								key={m.id || m.imdbID}
								movie_id={m.movie_id}
								imdb_id={m.imdbID}
								title={m.title || m.Title}
								poster={m.poster || m.Poster}
								viewed={m.viewed}
								setMoviesLength={setMoviesLength}
								moviesLength={moviesLength}
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

	if (!movies) {
		return <Redirect to="/home" />;
	}

	return (
		<div>
			<div>
				<SearchForm searchFor={search} page={currentPage} />
			</div>
			{movies.length > 0 ? moviesAvailable() : moviesNotAvailable()}
		</div>
	);
}

export default SearchList;
