import React, { useState, useEffect } from "react";
import Event from "./Event";
import { url } from "./constants";

function Events({ user }) {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		fetch(`${url}/get_events/`, {
			method: "POST",
			body: JSON.stringify(user),
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((data) => setEvents(data.events));
	}, []);

	return (
		<div>
			{events.map((event) => (
				<Event key={event.id} event={event} user={user} />
			))}
		</div>
	);
}

export default Events;
