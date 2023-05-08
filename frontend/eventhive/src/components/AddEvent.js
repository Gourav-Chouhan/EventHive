import React, { useState } from "react";

function AddEvent({ user }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		// Send a POST request to the server to add the new event
		fetch("http://localhost:8000/add_event/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				description,
				location,
				creator_id: user.user_id,
			}),
		})
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
				// Clear the form inputs
				setTitle("");
				setDescription("");
				setLocation("");
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<form className="add-event" onSubmit={handleSubmit}>
			<h2>Add New Event</h2>
			<br />
			<br />
			<br />
			<label>
				Title:
				<input
					type="text"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
			</label>
			<br />
			<label>
				Description:
				<input
					type="text"
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
			</label>
			<br />
			<label>
				Location:
				<input
					type="text"
					value={location}
					onChange={(event) => setLocation(event.target.value)}
				/>
			</label>
			<br />

			<br />
			<button type="submit">Submit</button>
		</form>
	);
}

export default AddEvent;
