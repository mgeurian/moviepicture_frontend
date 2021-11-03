import React from 'react';
import { render } from '@testing-library/react';
import NavBar from './NavBar';
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
			<NavBar />
		</UserContext.Provider>
	);
});

// snapshot test
it('matches snapshot', function() {
	const { asFragment } = render(
		<UserContext.Provider value={{ currentUser }}>
			<NavBar />
		</UserContext.Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});

// write the following tests

//

// **********  when logged out  **********

// click on MoviePicture brand to render Home component (nothing passed)

// click on Login to render LoginForm component. (nothing passed)

// click on Sign Up to render SignUpForm component. (nothing passed)

//

// **********  when logged in  **********

//click on MoviePicture brand to render Home component. (nothing passed)

//click on My Movies to render MovieList component (pass user_id)

//click on Profile to render ProfileForm component. (pass user_id)

//click on Log out {username} to logout user and render LoginForm component. (pass user_id)
