import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

export const Signup = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = { email, password };
    const url = `https://potential-telegram-7vvx7jvxpgp53r69p-3001.app.github.dev/api/signup`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };
    const response = await fetch(url, options);
    console.log(response);
    if (!response.ok) {
      console.log("Error: ", response.status, response.statusText);
      return;
    }
    const data = await response.json();
    const user = JSON.stringify(data.results);
    // Aquí comienza nuestra lógica
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.results));
    navigate("/");
  };

  return (
    <div className=" bg-dark d-flex py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <h1 className="text-light text-center pb-3">Create account</h1>
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
                      SIGN UP
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