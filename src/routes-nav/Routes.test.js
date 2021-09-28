import React from 'react';
import { render } from '@testing-library/react';
import Routes from './Routes';

test('renders without crashing', () => {
	render(<Routes />);
});
