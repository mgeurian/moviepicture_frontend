import React from 'react';
import { render } from '@testing-library/react';
import LoginForm from './LoginForm';
import UserContext from '../auth/UserContext';

const currentUser = {
	email: 'testuser@test.com',
	password: 'password'
};

// smoke test
test('renders without crashing', () => {
	render(
		<UserContext.Provider value={{ currentUser }}>
			<LoginForm />
		</UserContext.Provider>
	);
});

// snapshot test
it('matches snapshot', function() {
	const { asFragment } = render(
		<UserContext.Provider value={{ currentUser }}>
			<LoginForm />
		</UserContext.Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});
