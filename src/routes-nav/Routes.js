import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../homepage/Home';
import SignupForm from '../auth/SignupForm';
import LoginForm from '../auth/LoginForm';

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

				<Redirect to="/" />
			</Switch>
		</div>
	);
}

export default Routes;
