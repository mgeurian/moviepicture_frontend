import React from 'react';
import { render } from '@testing-library/react';
import Pagination from './Pagination';

// smoke test
test('renders without crashing', () => {
	render(<Pagination />);
});

// snapshot test
it('matches snapshot', function() {
	const { asFragment } = render(<Pagination />);
	expect(asFragment()).toMatchSnapshot();
});
