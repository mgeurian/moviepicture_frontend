import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import MovieDetail from './MovieDetail';
import UserContext from '../auth/UserContext';

const currentUser = {
	id: 100,
	first_name: 'test',
	last_name: 'user',
	email: 'testuser@test.com',
	is_public: 'false'
};

// smoke test
test('renders without crashing', () => {
	render(
		<MemoryRouter>
			<UserContext.Provider value={{ currentUser }}>
				<Route exact path="/movie/id/:id">
					<MovieDetail />
				</Route>
			</UserContext.Provider>
		</MemoryRouter>
	);
});

// snapshot test
it('matches snapshot', function() {
	const { asFragment } = render(
		<MemoryRouter>
			<UserContext.Provider value={{ currentUser }}>
				<Route exact path="/movie/id/:id">
					<MovieDetail />
				</Route>
			</UserContext.Provider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
