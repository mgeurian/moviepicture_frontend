import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import MovieApi from '../api/Api';
import UserContext from '../auth/UserContext';

function ProfileForm() {
	const { id } = useParams();

	const { currentUser, setCurrentUser } = useContext(UserContext);

	const INITIAL_STATE = {
		firstName: currentUser.first_name,
		lastName: currentUser.last_name,
		email: currentUser.email,
		password: ''
	};

	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const [ formErrors, setFormErrors ] = useState([]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value
		}));
	};

	async function handleSubmit(e) {
		e.preventDefault();

		let userData = {
			firstName: formData.first_name,
			lastName: formData.last_name,
			email: formData.email,
			password: formData.password
		};

		let updatedUser;
		try {
			updatedUser = await MovieApi.patchUser(id, userData);
			console.log(updatedUser);
		} catch (errors) {
			setFormErrors(errors);
			console.log(formErrors);
		}

		setFormErrors([]);
		setCurrentUser(updatedUser);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="first_name">First Name</label>
					<input
						id="first_name"
						className="form-control"
						value={formData.first_name}
						type="text"
						onChange={handleChange}
						name="first_name"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="last_name">Last Name</label>
					<input
						id="last_name"
						className="form-control"
						value={formData.last_name}
						type="text"
						onChange={handleChange}
						name="last_name"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						id="email"
						className="form-control"
						value={formData.email}
						type="email"
						onChange={handleChange}
						name="email"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Confirm password to make changes</label>
					<input
						id="password"
						className="form-control"
						value={formData.password}
						type="password"
						onChange={handleChange}
						name="password"
					/>
				</div>
				<button className="btn btn-primary mt-4" type="submit" onSubmit={handleSubmit}>
					Submit
				</button>
			</form>
		</div>
	);
}

export default ProfileForm;
