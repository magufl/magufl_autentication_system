const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: null,
			isLogin: false,
		},
		actions: {
			setIsLogin: (login) => { setStore({ isLogin: login }) },
			setLogout: (logout) => { setStore({ isLogin: logout }) },
			signup: (email, password) => {
                const requestOptions = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "email": email,
                        "password": password
                    })
                };

                fetch(process.env.BACKEND_URL + "/api/signup", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if (data.msg === "You've been successfully registered") {
                            // Puedes realizar alguna acción adicional si el registro fue exitoso
                            console.log("Registro exitoso:", data.msg);
                        } else {
                            // Puedes manejar errores o mostrar mensajes de error al usuario
                            console.error("Error en el registro:", data.msg);
                        }
                    })
                    .catch(error => console.log('error', error));
            },
			login: (email, password) => {
				console.log("Desde Flux");
			  
				const requestOptions = {
				  method: 'POST',
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify({
					"email": email,
					"password": password
				  })
				};
			
				fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
				  .then(response => {
					
					if(response.status ==200) {
						setStore({ auth: true});
					}
					return response.json()})
					
				  .then(data => {
					localStorage.setItem("token", data.access_token);
					console.log(data);
				  })
				  .catch(error => console.log('error', error));
			  },
		}
	};
};

export default getState;
