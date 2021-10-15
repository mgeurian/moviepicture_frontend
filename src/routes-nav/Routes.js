import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../homepage/Home';
import SignupForm from '../auth/SignupForm';
import LoginForm from '../auth/LoginForm';
import ProfileForm from '../profiles/ProfileForm';
import MovieList from '../movies/MovieList';
import MovieDetail from '../movies/MovieDetail';

function Routes({ login, signup }) {
	return (
		<div>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>

				<Route exact path="/signup">
					<SignupForm signup={signup} />
				</Route>

				<Route exact path="/login">
					<LoginForm login={login} />
				</Route>

				<Route exact path="/movie/:movie_id">
					<MovieDetail />
				</Route>

				<Route exact path="/movie/id/:movie_id">
					<MovieDetail />
				</Route>

				<Route exact path="/movie/search">
					<MovieList />
				</Route>

				<Route exact path="/user/:id/movies/all">
					<MovieList />
				</Route>

				<Route exact path="/profile">
					<ProfileForm />
				</Route>

				<Redirect to="/" />
			</Switch>
		</div>
	);
}

export default Routes;
