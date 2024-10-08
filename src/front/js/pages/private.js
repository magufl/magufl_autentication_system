import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const [secretContent, setSecretContent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Función que hace la petición para obtener contenido privado
        const getPrivateContent = async () => {
            const token = localStorage.getItem('token'); // Obtener el token del localStorage

            if (!token) {
                // Si no hay token, redirige al login
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/private`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setSecretContent(data.message); // Guardar el contenido secreto
                } else {
                    console.log('Unauthorized or token invalid');
                    navigate("/login"); // Redirigir al login si el token no es válido
                }
            } catch (error) {
                console.error('Error fetching private content:', error);
                navigate("/login");
            }
        };

        getPrivateContent();
    }, [navigate]);

    return (
        <div>
            <div className="text-center mt-5">
                <h1>CONTENIDO SECRETO</h1>
                {secretContent ? (
                    <p>{secretContent}</p> // Mostrar el contenido secreto si existe
                ) : (
                    <p>Cargando contenido...</p> // Mostrar un mensaje mientras carga
                )}
            </div>
        </div>
    );
};
