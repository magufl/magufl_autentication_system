import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary m-1">SIGN UP</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-primary m-1">LOG IN</button>
					</Link>
					<Link to="">
						<button className="btn btn-primary m-1">LOG OUT</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
