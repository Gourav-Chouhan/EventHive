import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Events from "./components/Events";
import Event from "./components/Event";
import Navbar from "./components/Navbar";
import Myevents from "./components/Myevents";
import AddEvent from "./components/AddEvent";
import image from "./images/eventhive_img.jpeg";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState("");
	return (
		<div>
			<BrowserRouter>
				{loggedIn && (
					<div className="main-page2">
						<Navbar user={user} setLoggedIn={setLoggedIn} />
						<Routes>
							<Route path="/" element={<Events user={user} />}></Route>
							<Route path="/events" element={<Events user={user} />}></Route>
							<Route
								path="/add-event"
								element={<AddEvent user={user} />}
							></Route>
							<Route
								path="/my-events"
								element={<Myevents user={user} />}
							></Route>
							<Route path="*" element={<Events user={user} />}></Route>
						</Routes>
					</div>
				)}
				{!loggedIn && (
					<div className="main-page">
						<img src={image} />
						<div className="form-container">
							<Routes>
								<Route
									path="/"
									element={
										<Signin setLoggedIn={setLoggedIn} setUser={setUser} />
									}
								></Route>
								<Route
									path="/signup"
									element={
										<Signup setLoggedIn={setLoggedIn} setUser={setUser} />
									}
								></Route>
								<Route
									path="*"
									element={
										<Signin setLoggedIn={setLoggedIn} setUser={setUser} />
									}
								></Route>
							</Routes>
						</div>
					</div>
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;
