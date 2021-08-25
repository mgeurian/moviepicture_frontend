import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import './SignupForm.css';

function SignupForm({ signup }) {
	let history = useHistory();
	const currentUser = useContext(UserContext);

	const INITIAL_STATE = {
		first_name: '',
		last_name: '',
		email: '',
		password: ''
	};

	const [ formData, setFormData ] = useState(INITIAL_STATE);

	const [ formErrors, setFormErrors ] = useState([]);

	useEffect(
		() => {
			if (currentUser) {
				history.push(`/user/${currentUser.id}/movies/all`);
			}
		},
		[ currentUser ]
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value
		}));
	};

	async function handleSubmit(e) {
		e.preventDefault();
		let result = await signup(formData);

		if (!result.success) {
			setFormErrors(result.errors);
			console.log(formErrors);
		}
	}

	return (
		<div className="container">
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
					<label htmlFor="password">Password</label>
					<input
						id="password"
						className="form-control"
						value={formData.password}
						type="password"
						onChange={handleChange}
						name="password"
					/>
				</div>
				<button className="btn btn-primary mt-4" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default SignupForm;
