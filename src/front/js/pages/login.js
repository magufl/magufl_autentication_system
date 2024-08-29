import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Login = () => {
  const {store, actions} = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { email, password };
    console.log("los datos que se mandan:", dataToSend);
    const url = `${process.env.BACKEND_URL}/api/login`;
    const options = {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log("la url y la options:",url, options)
    const response = await fetch(url, options);
    
    if (!response.ok) {
      console.log('Error fatalisima: ', response.status, response.statusText)
      return
    }
    const data = await response.json();
    console.log(data);
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.results))
    actions.setIsLogin(true)
    actions.setCurrentUser(data.results)
    navigate('/')
  };

  return (
    <div className="bg-dark d-flex py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <h1 className="text-light text-center pb-3">Log into your account</h1>
            <div className="card bg-primary">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-3">
                    <label htmlFor="email" className="mb-1 text-light">
                      Your email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="password" className="mb-1 text-light">
                      Your password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn my-2 w-100 btn-outline-light mt-3 body rounded-3">
                      LOG IN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

