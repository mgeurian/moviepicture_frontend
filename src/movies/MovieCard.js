import React from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';
// import MovieDetailModal from '../modal/MovieDetailModal';

import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';

function MovieCard({ user_id, movie_id, imdb_id, title, viewed, poster, addMovie, removeMovie }) {
	/** below are the beginnings of creating a toggle 
	 * for viewed/unviewed movies upon movie retrieval 
	 * by displaying an addButton or RemoveButton
	 * on the MovieList Component
	 * from movie db or from imdb 
	* */

	// const [ viewedState, setViewedState ] = useState(false);
	// useEffect(
	// 	() => {
	// 		async function checkViewedState() {
	// 			let res =
	// 		}
	// 	},
	// 	[ viewedState ]
	// );

	// ******************************************

	/** the below useState and openModal function are the 
	 * beginnings of moving the MovieDetail Component 
	 * from it's own endroute to be a Modal opening 
	 * from MovieCard on the MovieList Component */

	// const [ showModal, setShowModal ] = useState(false);
	// const openModal = () => {
	// 	setShowModal((prev) => !prev);
	// };

	// ******************************************

	// <Card className="flex-item">
	// <Link to={`/movie/${movie_id}`}>
	// 	{poster === 'N/A' ? (
	// 		<CardTitle>{title}</CardTitle>
	// 	) : (
	// 	<Button onClick={openModal}>
	// 	<div>
	// 		<CardImg top width="100%" src={poster} alt="Card image cap" />
	// 		<CardTitle className="font-weight-bold text-center">{title}</CardTitle>
	// 	</div>
	// 	</Button>
	// 	<MovieDetailModal showModal={showModal} setShowModal={setShowModal} />
	// 	)}
	// </Link>

	// <CardBody>
	// 	<div className="button-div">{viewed ? removeButton() : addButton()}</div>
	// </CardBody>
	// </Card>

	async function handleAdd(e) {
		e.preventDefault();
		await addMovie(user_id, imdb_id);
		// setViewedState(true);
	}

	async function handleRemove(e) {
		e.preventDefault();
		await removeMovie(user_id, movie_id);
		// setViewedState(false);
	}

	function addButton() {
		// if (!viewedState) {
		// 	setViewedState(true);
		// }
		return (
			<Button className="MovieCard-Button" onClick={handleAdd} color="success">
				Add
			</Button>
		);
	}

	function removeButton() {
		// if (viewedState) {
		// 	setViewedState(false);
		// }
		return (
			<Button className="MovieCard-Button" onClick={handleRemove} color="danger">
				Remove
			</Button>
		);
	}

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

export default MovieCard;
