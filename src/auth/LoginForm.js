import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import './LoginForm.css';

function LoginForm({ login }) {
	let history = useHistory();
	const { currentUser } = useContext(UserContext);

	const INITIAL_STATE = {
		email: '',
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
		let result = await login(formData);
		if (result.success) {
			history.push(`/profile`);
		} else {
			setFormErrors(result.errors);
			console.log(formErrors);
		}
	}

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						id="email"
						className="form-control"
						type="text"
						onChange={handleChange}
						name="email"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						className="form-control"
						type="password"
						onChange={handleChange}
						name="password"
						required
					/>
				</div>
				<button className="btn btn-primary mt-4" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default LoginForm;
