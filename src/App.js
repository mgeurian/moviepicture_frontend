import React, { useState, useEffect } from 'react';
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
						let currentUser = await MovieApi.getUser(id);

						setCurrentUser(currentUser);
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

	async function addMovie(id, imdb_id) {
		try {
			let res = await MovieApi.postNewMovie(id, imdb_id);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	}

	async function removeMovie(userId, movie_id) {
		try {
			let res = await MovieApi.deleteUserMovie(userId, movie_id);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	}

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
		<UserContext.Provider value={{ currentUser, setCurrentUser, addMovie, removeMovie }}>
			<div className="App">
				<NavBar logout={logout} />
				<Routes login={login} signup={signup} />
			</div>
		</UserContext.Provider>
	);
}

export default App;
