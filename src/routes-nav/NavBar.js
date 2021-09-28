import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { Navbar, NavbarToggler, Nav, NavItem, NavbarBrand, Collapse } from 'reactstrap';
import UserContext from '../auth/UserContext';

function NavBar({ logout }) {
	const { currentUser } = useContext(UserContext);

	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	function loggedInNavBar() {
		const id = currentUser.id;

		return (
			<Nav className="mr-auto navbar">
				<NavItem className="mr-2">
					<Link to={`/user/${id}/movies/all`}>My Movies</Link>
				</NavItem>
				<NavItem className="mr-2">
					<Link to="/profile">Profile</Link>
				</NavItem>
				<NavItem className="mr-2">
					<Link to="/" onClick={logout}>
						Log out {currentUser.first_name}
					</Link>
				</NavItem>
			</Nav>
		);
	}

	function loggedOutNavBar() {
		return (
			<Nav className="mr-auto navbar">
				<NavItem className="mr-2">
					<Link to="/login">Login</Link>
				</NavItem>
				<NavItem className="mr-2">
					<Link to="/signup">Sign Up</Link>
				</NavItem>
			</Nav>
		);
	}

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand>
					<Link exact to="/home">
						MoviePicture
					</Link>
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
