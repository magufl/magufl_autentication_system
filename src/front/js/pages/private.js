import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Private = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			{localStorage.getItem("user") ?
				<div className="text-center mt-5">
					<h1>Estás Logueado. Esta es la pagina secretíssima</h1>
				</div>
			:
				<div className="text-center mt-5">
					<h1>No estás Logueado. No tienes acceso al contenido secreto</h1>
				</div>
			}
		</div>
		
	);

};
