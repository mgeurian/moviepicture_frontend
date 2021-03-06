import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Row } from 'reactstrap';
import MovieApi from '../api/Api';
import SearchForm from '../common/SearchForm';
import MovieCard from './MovieCard';
import PaginationComponent from '../common/Pagination';
import UserContext from '../auth/UserContext';
import './MovieList.css';
import './MovieCard.css';

function MovieList() {
	const { currentUser } = useContext(UserContext);

	const [ movies, setMovies ] = useState([]);
	const [ numberOfMovies, setNumberOfMovies ] = useState(0);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ currentFilter, setCurrentFilter ] = useState(0);
	const [ moviesPerPage, setMoviesPerPage ] = useState(10);
	const [ moviesLength, setMoviesLength ] = useState(null);

	const history = useHistory();

	const id = currentUser.id;

	//this constant will need to change after implementing a user Search by email. But for now, we will try history.push and cannot pull from params for each MovieList render for that.

	// const type = 'all';
	const { type } = useParams();

	//this useEffect generates a user's movieList and all subsequent records for pages within.
	useEffect(
		() => {
			async function getMoviesOnMount(user_id, pageNum, viewType) {
				try {
					if (!currentFilter) {
						let res = await MovieApi.getUserMovies(user_id, pageNum, viewType);
						setMovies(res.Search);
						setNumberOfMovies(res.totalResults.count);
						setMoviesLength(res.Search.length);
					} else {
						search(currentFilter, currentPage);
					}
				} catch (err) {
					console.log(err);
				}
			}
			getMoviesOnMount(id, currentPage, type);
		},
		[ id, currentPage, type, currentFilter, moviesLength ]
	);

	function search(name, currentPage) {
		history.push('/movie/search', { params: name });
	}

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	function moviesAvailable() {
		return (
			<div className="MovieList mt-5">
				<h3 className="MovieList-NumberOfMovies">
					You have seen <strong>{numberOfMovies}</strong> movies.
				</h3>
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
				<PaginationComponent itemsPerPage={moviesPerPage} totalItems={numberOfMovies} paginate={paginate} />
			</div>
		);
	}

	if (!movies) {
		return <Redirect to="/home" />;
	}

	function moviesNotAvailable() {
		return (
			<div>
				<h3>Enter a search term to look for and add movies</h3>
			</div>
		);
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

export default MovieList;
