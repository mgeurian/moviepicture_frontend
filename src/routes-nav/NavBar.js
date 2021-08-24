import React, { useContext } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import UserContext from '../auth/UserContext';

function NavBar({ logout }) {
	const { currentUser } = useContext(UserContext);

	function loggedInNavBar() {
		return (
			<div className="float-right">
				<Nav className="ml-auto">
					<NavItem className="mr-4">
						<NavLink to="/users/:id">Movies</NavLink>
					</NavItem>
					<NavItem className="mr-4">
						<NavLink to="/profile">Profile</NavLink>
					</NavItem>
					<NavItem className="mr-4">
						<NavLink to="/" onClick={logout}>
							Log out {currentUser.first_name}
						</NavLink>
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
						<NavLink to="/login">Login</NavLink>
					</NavItem>
					<NavItem className="mr-4">
						<NavLink to="/signup">Sign Up</NavLink>
					</NavItem>
				</Nav>
			</div>
		);
	}

	return (
		<Navbar className="clearfix" expand="md">
			<Nav className="ml-auto float-left">
				<NavLink exact to="/">
					MoviePicture
				</NavLink>
			</Nav>

			{currentUser ? loggedInNavBar() : loggedOutNavBar()}
		</Navbar>
	);
}
export default NavBar;
