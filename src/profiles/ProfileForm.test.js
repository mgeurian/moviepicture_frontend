import React from 'react';
import { render } from '@testing-library/react';
import ProfileForm from './ProfileForm';
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
		<UserContext.Provider value={{ currentUser }}>
			<ProfileForm />
		</UserContext.Provider>
	);
});

// snapshot test
it('matches snapshot', function() {
	const { asFragment } = render(
		<UserContext.Provider value={{ currentUser }}>
			<ProfileForm />
		</UserContext.Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});
