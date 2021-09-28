import React from 'react';
import { render } from '@testing-library/react';
import NavBar from './NavBar';

test('renders without crashing', () => {
	render(<NavBar />);
});
