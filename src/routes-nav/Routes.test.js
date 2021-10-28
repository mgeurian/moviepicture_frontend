import React from 'react';
import { render } from '@testing-library/react';
import Routes from './Routes';

// smoke test
test('renders without crashing', () => {
	render(<Routes />);
});

// snapshot test
it('matches snapshot', function() {
	const { asFragment } = render(<Routes />);
	expect(asFragment()).toMatchSnapshot();
});
