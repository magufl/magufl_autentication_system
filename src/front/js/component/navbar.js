import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {store, actions} = useContext(Context);

	const logout = () => {
		console.log("estoy en logout");
		localStorage.clear();
	}

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
					<Link className="nav-link" onClick={logout} to="/">Logout</Link>
				</div>
			</div>
		</nav>
	);
};
