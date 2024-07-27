import "../App.css";
import { useState } from "react";
import { validateEmail } from "../utils/utils";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const PasswordErrorMessage = () => {
    return (
      <p className="FieldError">Password should have at least 8 characters</p>
    );
  };

  const getIsFormValid = () => {
    return validateEmail(email) && password.length >= 8;
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
        console.log(response.message);
      } catch (error) {
        console.log(error);
      }
    }

    clearForm();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Login In</h2>

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

          <button type="submit">Log In</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
