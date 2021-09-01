import React from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';
import useFlipState from '../hooks/useFlipState';

function MovieCard({ user_id, movie_id, imdb_id, title, viewed, poster, addMovie, removeMovie }) {
	// create watch/watched button so user can toggle
	// const { currentUser, setCurrentUser } = useContext(UserContext);
	// const [ view, flipView ] = useFlipState();

	async function handleAdd(e) {
		e.preventDefault();
		console.log('clicked addbutton');

		await addMovie(user_id, imdb_id);
	}

	function handleView(e) {
		e.preventDefault();
		console.log('clicked viewbutton');
	}

	function viewButton() {
		return (
			<Button className="button" onClick={handleView} color="success">
				{viewed ? 'Seen' : 'Not Seen'}
			</Button>
		);
	}

	function addButton() {
		return (
			<Button className="button" onClick={handleAdd} color="success">
				Add To List
			</Button>
		)
	}

	return (
		<Card className="flex-item">
			<Link to={`/movie/${movie_id}`}>
				{poster === 'N/A' ? 
					<CardTitle>{title}</CardTitle>
				: 
					<>
						<CardImg top width="100%" src={poster} alt="Card image cap" />
						<CardTitle className="font-weight-bold text-center">{title}</CardTitle>
					</>
				}
			</Link>

			<CardBody>
				<div className="button-div">{viewed ? viewButton() : addButton()}</div>
			</CardBody>
		</Card>
	);
}

export default MovieCard;
