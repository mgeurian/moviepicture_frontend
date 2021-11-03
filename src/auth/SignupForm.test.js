import React from 'react';
import { render } from '@testing-library/react';
import SignupForm from './SignupForm';
import UserContext from '../auth/UserContext';

const currentUser = {
	first_name: 'test',
	last_name: 'user',
	email: 'testuser@test.com',
	password: 'password'
};

// smoke test
test('renders without crashing', () => {
	render(
		<UserContext.Provider value={{ currentUser }}>
			<SignupForm />
		</UserContext.Provider>
	);
});

// snapshot test
it('matches snapshot', function() {
	const { asFragment } = render(
		<UserContext.Provider value={{ currentUser }}>
			<SignupForm />
		</UserContext.Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});
