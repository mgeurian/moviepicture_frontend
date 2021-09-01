import { useState } from 'react';

const useFlipState = (initialState = true) => {
	const [ state, setState ] = useState(initialState);
	const flipState = () => {
		setState((is) => !is);
	};
	return [ state, flipState ];
};

export default useFlipState;
