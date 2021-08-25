import React, { useContext } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import UserContext from '../auth/UserContext';

function NavBar({ logout }) {
	const { currentUser } = useContext(UserContext);

	function loggedInNavBar() {
		const id = currentUser.id;

		return (
			<div className="float-right">
				<Nav className="ml-auto">
					<NavItem className="mr-4">
						<Link to={`/user/${id}/movies/`}>Movies</Link>
					</NavItem>
					<NavItem className="mr-4">
						<Link to="/profile">Profile</Link>
					</NavItem>
					<NavItem className="mr-4">
						<Link to="/" onClick={logout}>
							Log out {currentUser.first_name}
						</Link>
					</NavItem>
				</Nav>
			</div>
		);
	}

	function loggedOutNavBar() {
		return (
			<div className="float-right">
				<Nav className="ml-auto">
					<NavItem className="mr-4">
						<Link to="/login">Login</Link>
					</NavItem>
					<NavItem className="mr-4">
						<Link to="/signup">Sign Up</Link>
					</NavItem>
				</Nav>
			</div>
		);
	}

	return (
		<Navbar className="clearfix" expand="md">
			<Nav className="ml-auto float-left">
				<Link exact to="/home">
					MoviePicture
				</Link>
			</Nav>

			{currentUser ? loggedInNavBar() : loggedOutNavBar()}
		</Navbar>
	);
}
export default NavBar;
