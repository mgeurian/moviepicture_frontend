import React from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

function MovieCard({ movie_id, title, genre, plot, imdb_rating }) {
	return (
		<Link to={`/movie/${movie_id}`}>
			<div>
				<Card>
					<CardBody>
						<CardTitle className="font-weight-bold text-center">{title}</CardTitle>
						<CardText>{genre}</CardText>
						<CardText className="font-italic">{plot}</CardText>
						<CardText className="font-weight-bold text-center">{imdb_rating}</CardText>
					</CardBody>
				</Card>
			</div>
		</Link>
	);
}

export default MovieCard;
