import React from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap';
import loremIpsumPoster from '../images/loremipsumposter.jpg';

// import useToggleState from '../hooks/useToggleState';

function MovieCard({ movie_id, imdb_id, title, poster }) {
	let searched = false;

	if (!movie_id) {
		searched = true;
	}

	if (poster === 'N/A') {
		poster = loremIpsumPoster;
	}

	function omdbIdResults() {
		return (
			<Card className="MovieCard">
				<Link to={`/movie/id/${imdb_id}`}>
					<img className="MovieCard-CardImg" src={poster} alt="title" />
					<CardBody className="MovieCard-CardBody">
						<CardTitle className="MovieCard-CardTitle">{title}</CardTitle>
					</CardBody>
				</Link>
			</Card>
		);
	}

	function moviePictureResults() {
		return (
			<Card className="MovieCard">
				<Link to={`/movie/${movie_id}`}>
					<img className="MovieCard-CardImg" src={poster} alt="title" />
					<CardBody className="MovieCard-CardBody">
						<CardTitle className="MovieCard-CardTitle">{title}</CardTitle>
					</CardBody>
				</Link>
			</Card>
		);
	}

	return <div>{searched ? omdbIdResults() : moviePictureResults()}</div>;
}

export default MovieCard;
