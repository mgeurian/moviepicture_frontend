import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class MovieApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${MovieApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	// Individual API routes

	// Auth Routes

	/** post a User with data */

	static async postNewUser(data) {
		let res = await this.request(`auth/register`, data, 'post');
		return res.token;
	}

	/** post a login by email */

	static async postUserLogin(data) {
		let res = await this.request(`auth/token`, data, 'post');
		return res.token;
	}

	// User Routes

	/** get details on a user by id */

	static async getUser(id) {
		let res = await this.request(`user/${id}/account`);
		return res.data;
	}

	/** update user data by id */

	static async patchUser(id, data) {
		let res = await this.request(`user/${id}/account`, data, 'patch');
		return res.data;
	}

	/** post movie to user_movie by user_id and imdbId*/
	/** also adds movie to db if !movie */

	static async postNewMovie(id, imdbId, data) {
		let res = await this.request(`user/${id}/movie/${imdbId}/add`, data, 'post');
		return res.data;
	}

	// ********* THE NEXT TWO CALLS MAY BE THE SAME *********
	// ********* TOO LATE GOING TO BED *********
	/** get movies by user_id and type */

	// static async getUserMoviesByType(id, type) {
	// 	let res = await this.request(`user/${id}/movies/${type}`);
	// 	return res.data;
	// }

	/** get user_movies by user_id */

	// static async getUserMovies(id) {
	// 	let res = await this.request(`user/${id}/movies/all`);
	// 	return res.data;
	// }

	static async getUserMovies(id) {
		let res = await this.request(`user/${id}/movies/all`);
		return res.data;
	}

	/** get user_movie by user_id and movie_id */

	static async getUserMovieById(id, movie_id) {
		let res = await this.request(`user/${id}/movie/${movie_id}`, { movie_id });
		return res.data;
	}

	/** update user_movie by user_id and movie_id */

	static async patchUserMovieByMovieId(id, movie_id) {
		let res = await this.request(`user/p${id}/movie/${movie_id}/update`, { movie_id }, 'patch');
		return res.data;
	}

	/** remove user_movie by user_id and movie_id */

	static async deleteUserMovie(id, movie_id) {
		let res = await this.request(`user/${id}/movie/${movie_id}`, 'delete');
		return res.data;
	}

	/** static async get User by email */

	static async getPublicUserByEmail(userEmail) {
		let res = await this.request(`search/${userEmail}`);
		return res.data;
	}

	/** Movie Routes */

	/** check to make sure this is correct with backend */

	static async getMovieByTitle(movie_title) {
		let res = await this.request(`movie/search?q=${movie_title}`);
		return res.data;
	}

	/** get movie by movie_id */

	static async getMovieById(movie_id) {
		let res = await this.request(`movie/${movie_id}`);
		return res.data;
	}
}

export default MovieApi;
