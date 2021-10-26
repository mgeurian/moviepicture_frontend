async function search(name, currentPage) {
	let res = await MovieApi.getMovieByTitle(name, currentPage);
	let movies = res.Search;
	let totalResults = res.totalResults;
	setCurrentFilter(name);
	setMovies(movies);
	setNumberOfMovies(totalResults);
	history.push(`/movie/search?q=${name}`);
}
