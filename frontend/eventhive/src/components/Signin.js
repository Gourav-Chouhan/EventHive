import { useState } from "react";
import { url } from "./constants";
import { Link } from "react-router-dom";
function Signin({ setLoggedIn, setUser }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null); // error handling

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${url}/signin/`, {
			method: "POST",
			body: JSON.stringify({ username: username, password: password }),
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				if (response.ok) {
					// User has successfully signed in
					response.json().then((data) => {
						console.log(data.user_id, data.username);
						setLoggedIn(true);
						setUser({ user_id: data.user_id, username: data.username });
					});
				} else {
					// Sign-in failed
					response.json().then((data) => {
						setError(data.error);
						console.log(data.error);
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});

		console.log("Username:", username);
		console.log("Password:", password);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Sign In</h2>
			<input
				type="text"
				value={username}
				placeholder="Username"
				onChange={handleUsernameChange}
			/>
			<br />
			<input
				type="password"
				value={password}
				placeholder="Password"
				onChange={handlePasswordChange}
			/>
			<br />
			<button type="submit">Sign In</button>
			{error && <p className="error">{error}</p>}
			<Link to="/signup">Create Account</Link>
		</form>
	);
}

export default Signin;
