import { useState, useEffect } from 'react';

function useLocalStorage(key, defaultValue = null) {
	const initialValue = localStorage.getItem(key) || defaultValue;

	const [ state, setState ] = useState(initialValue);

	useEffect(
		function setKeyInLocalStorage() {
			if (state === null) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, state);
			}
		},
		[ key, state ]
	);

	return [ state, setState ];
}

export default useLocalStorage;
