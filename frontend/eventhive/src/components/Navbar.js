import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar({ setLoggedIn, user }) {
	const navigate = useNavigate();
	return (
		<nav className="navbar">
			<div className="nav-links">
				<div className="navbar-options">
					<Link className="nav-link" to="/events">
						Events
					</Link>
					<Link className="nav-link" to="/my-events">
						My Events
					</Link>

					<Link className="nav-link" to="add-event">
						Add Event
					</Link>
				</div>
				<div className="navbar-options">
					<span className="nav-link">{user.username}</span>
					<Link
						className="btn btn-outline-secondary"
						onClick={() => {
							setLoggedIn(false);
							navigate("/signin");
						}}
					>
						Logout
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
