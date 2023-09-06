import React, { useState } from "react";
import { url } from "./constants";
import { Link } from "react-router-dom";
const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null); // error handling

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		fetch(`${url}/signup/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password,
			}),
		}).then((response) => {
			if (response.ok) {
				// User has successfully signed in
				response.json().then((data) => {
					console.log(data.user_id, data.username);
				});
			} else {
				// Sign-in failed
				response.json().then((data) => {
					setError(data.error);
					console.log(data.error);
				});
			}
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Sign up new account</h2>
			<input
				placeholder="username"
				type="text"
				value={username}
				onChange={handleUsernameChange}
			/>
			<input
				type="email"
				placeholder="email"
				value={email}
				onChange={handleEmailChange}
			/>
			<input
				type="password"
				placeholder="password"
				value={password}
				onChange={handlePasswordChange}
			/>
			<button type="submit">Sign Up</button>
			{error && <p className="error">{error}</p>}
			<Link to="/signin">Already have a account</Link>
		</form>
	);
};

export default Signup;
