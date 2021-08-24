import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from './routes-nav/Routes';
import NavBar from './routes-nav/NavBar';
import UserContext from './auth/UserContext';
import MovieApi from './api/Api';
import useLocalStorage from './hooks/useLocalStorage';
import jwt from 'jsonwebtoken';
import LoadingSpinner from './common/LoadingSpinner';

export const TOKEN_STORAGE_ID = 'movie-token';

function App() {
	const [ infoLoaded, setInfoLoaded ] = useState(false);
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);

	useEffect(
		() => {
			async function getCurrentUser() {
				if (token) {
					try {
						let { id } = jwt.decode(token);
						MovieApi.token = token;
						let res = await MovieApi.getUser(id);

						setCurrentUser(res);
					} catch (err) {
						setCurrentUser(null);
					}
				}
				setInfoLoaded(true);
			}
			setInfoLoaded(false);
			getCurrentUser();
		},
		[ token ]
	);

	async function login(loginData) {
		try {
			let token = await MovieApi.postUserLogin(loginData);
			setToken(token);
			return { success: true };
		} catch (errors) {
			return { success: false, errors };
		}
	}

	function logout() {
		setCurrentUser(null);
		setToken(null);
	}

	async function signup(signupData) {
		try {
			let token = await MovieApi.postNewUser(signupData);
			setToken(token);
			return { success: true };
		} catch (errors) {
			return { success: false, errors };
		}
	}

	if (!infoLoaded) return <LoadingSpinner />;

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ currentUser, setCurrentUser }}>
				<div className="App">
					<NavBar logout={logout} />
					<Routes login={login} signup={signup} />
				</div>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
