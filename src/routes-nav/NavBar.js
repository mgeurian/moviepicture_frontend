import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
import './NavBar.css';
import { Navbar, NavbarToggler, NavLink, Nav, NavbarBrand, Collapse } from 'reactstrap';
import UserContext from '../auth/UserContext';

function NavBar({ logout }) {
	const { currentUser } = useContext(UserContext);

	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	function loggedInNavBar() {
		const id = currentUser.id;

		return (
			<Nav className="mr-auto navbar">
				<NavLink className="mr-4" href={`/user/${id}/movies/all`}>
					My Movies
				</NavLink>
				<NavLink className="mr-4" href="/profile">
					Profile
				</NavLink>
				<NavLink className="mr-4" href="/" onClick={logout}>
					Log out {currentUser.first_name}
				</NavLink>
			</Nav>
		);
	}

	function loggedOutNavBar() {
		return (
			<Nav className="mr-auto navbar">
				<NavLink className="mr-4" href="/login">
					Login
				</NavLink>
				<NavLink className="mr-4" href="/signup">
					Sign Up
				</NavLink>
			</Nav>
		);
	}

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/home" className="mr-4">
					MoviePicture
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					{currentUser ? loggedInNavBar() : loggedOutNavBar()}
				</Collapse>
			</Navbar>
		</div>
	);
}
export default NavBar;
