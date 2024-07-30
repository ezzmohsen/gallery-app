import "../App.css";
import { useState } from "react";
import { validateEmail } from "../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorForm, setErrorForm] = useState("");

  const navigate = useNavigate();

  const getIsFormValid = () => {
    return validateEmail(email) && password.length >= 8;
  };

  const handleRegister = () => {
    return navigate("/register");
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (getIsFormValid()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password }
        );
        if (response.data && response.data.token) {
          localStorage.setItem("authToken", response.data.token);
          navigate("/");
        }
      } catch (response) {
        setErrorForm(response.response.data.message);
      }
      clearForm();
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <h3 className="error-message" hidden={!errorForm}>
          {errorForm}
        </h3>
        <div className="auth-field">
          <label>
            Email address <sup>*</sup>
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
        </div>
        <div className="auth-field">
          <label>
            Password <sup>*</sup>
          </label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="auth-buttons">
          <button type="submit">Log In</button>
          <button onClick={handleRegister}>Create Account</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
