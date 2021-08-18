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

	//User Requests

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

	/** get details on a user by id */

	static async getUser(id) {
		let res = await this.request(`users/${id}/info`);
		return res.user;
	}

	/** update user data by id */

	static async patchUser(id, data) {
		let res = await this.request(`users/${id}/info`, data, 'patch');
		return res.user;
	}

	/** post movie_id to movie by user_id and data*/

	static async postNewMovie(id, data) {
		await this.request(`users/${id}/movies/add`, data, 'post');
	}

	static async getMovie(movie_id) {
		let res = await this.request(`movies/${movie_id}`);
		return res.movie_id;
	}

	static async getUserMovies(id) {
		let res = await this.request(`users/${id}/movies`);
		return res.user;
	}

	static async getMovies(id, movie_id) {
		let res = await this.request(`users/${id}/movies/${movie_id}`, { movie_id });
		return res.movies;
	}
}

export default MovieApi;
