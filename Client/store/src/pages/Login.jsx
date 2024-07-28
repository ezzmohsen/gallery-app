import "../App.css";
import { useState } from "react";
import { validateEmail } from "../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorForm, setErrorForm] = useState("");
  const PasswordErrorMessage = () => {
    return (
      <p className="FieldError">Password should have at least 8 characters</p>
    );
  };
  const navigate = useNavigate();

  const getIsFormValid = () => {
    return validateEmail(email) && password.length >= 8;
  };

  const handleRegister = () => {
    return navigate("/store/register");
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };
  const formData = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email) && password.length >= 8) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          formData
        );
        console.log(response.data);
        if (response.data && response.data.token) {
          localStorage.setItem("authToken", response.data.token);

          navigate("/store");
        }
      } catch (response) {
        setErrorForm(response.response.data.message);
        // console.log(error);
      }
    }

    clearForm();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Login In</h2>
          <h3 style={{ color: "red" }}>{errorForm}</h3>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email address"
            />
          </div>

          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              value={password.value}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            {password.isTouched && password.value.length < 8 ? (
              <PasswordErrorMessage />
            ) : null}
          </div>
          <div style={{ dispaly: "flex" }}>
            <button type="submit">Log In</button>

            <button
              onClick={() => {
                handleRegister();
              }}
            >
              Create Account
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
