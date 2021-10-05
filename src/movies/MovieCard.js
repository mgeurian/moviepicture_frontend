import React from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';
// import useToggleState from '../hooks/useToggleState';

function MovieCard({
	user_id,
	movie_id,
	imdb_id,
	title,
	poster,
	viewed,
	addMovie,
	removeMovie,
	setMoviesLength,
	moviesLength
}) {
	// const [ isViewed, toggleIsViewed ] = useToggleState(false);
	let searched = false;

	if (!movie_id) {
		searched = true;
	}

	// console.log(movie);
	async function handleAdd(e) {
		e.preventDefault();
		await addMovie(user_id, imdb_id);
	}

	async function handleRemove(e) {
		e.preventDefault();
		await removeMovie(user_id, movie_id);
		setMoviesLength(moviesLength - 1);
	}

	// to implement a new button with useToggleState from /hooks

	// function viewedButton() {
	// 	return (
	// 		<Button className="MovieCard-Button" onClick={isViewed ? handleRemove : handleAdd} color={isViewed ? 'danger' : 'success'}>{isViewed ? 'Not Seen' : 'Viewed'}</Button>
	// 	)
	// }

	function addButton() {
		return (
			<Button className="MovieCard-Button" onClick={handleAdd} color="success">
				Add
			</Button>
		);
	}

	function removeButton() {
		return (
			<Button className="MovieCard-Button" onClick={handleRemove} color="danger">
				Remove
			</Button>
		);
	}

	function omdbIdResults() {
		return (
			<Card className="MovieCard">
				<Link to={`/movie/id/${imdb_id}`}>
					<CardImg className="MovieCard-CardImg" src={poster} alt="Card image cap" />
					<CardBody className="MovieCard-CardBody">
						<CardTitle className="MovieCard-CardTitle">{title}</CardTitle>
						{viewed ? removeButton() : addButton()}
					</CardBody>
				</Link>
			</Card>
		);
	}

	function moviePictureResults() {
		return (
			<Card className="MovieCard">
				<Link to={`/movie/${movie_id}`}>

					<CardImg className="MovieCard-CardImg" src={poster} alt="Card image cap" />
					<CardBody className="MovieCard-CardBody">
						<CardTitle className="MovieCard-CardTitle">{title}</CardTitle>
						{viewed ? removeButton() : addButton()}
					</CardBody>
				</Link>
			</Card>
		);
	}

	return (
		<>
		{searched ? omdbIdResults() : moviePictureResults()}
		</>

	);
}

export default MovieCard;
