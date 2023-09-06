import React, { useState, useEffect } from "react";
import Event from "./Event";
import { url } from "./constants";

function Myevents({ user }) {
	const [Myevents, setMyevents] = useState([]);

	useEffect(() => {
		fetch(`${url}/get_user_events/`, {
			method: "POST",
			body: JSON.stringify(user),
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((data) => setMyevents(data.events));
	}, []);

	return (
		<div>
			{Myevents.map((event) => (
				<Event key={event.id} event={event} user={user} />
			))}
		</div>
	);
}

export default Myevents;
