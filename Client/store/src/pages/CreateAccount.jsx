import React, { useState } from "react";
import { validateEmail } from "../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function CreateAccount() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorForm, setErrorForm] = useState("");

  const navigate = useNavigate();

  const clearForm = () => {
    setName("");
    setAddress("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && validateEmail(email) && password.length >= 8) {
      const formData = {
        name,
        phone,
        email,
        address,
        password,
      };
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          formData
        );
        clearForm();
        navigate("/login");
      } catch (response) {
        setErrorForm(response.response.data.message);
      }
    }
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleSubmit} className="create-account-form">
        <fieldset>
          <h2>Sign Up</h2>
          {errorForm && <h3 className="error-message">{errorForm}</h3>}
          <div className="field">
            <label>
              User Name<sup>*</sup>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User Name"
            />
          </div>
          <div className="field">
            <label>Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
          <div className="field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>
          <div className="field">
            <label>
              Phone <sup>*</sup>
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            {phone && (
              <p className="field-error" hidden={phone.length === 11}>
                Phone should have at least 11 numbers
              </p>
            )}
          </div>
          <div className="field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {password && (
              <p className="field-error" hidden={password.length >= 8}>
                Password should have at least 8 characters
              </p>
            )}
          </div>
          <div className="button-group">
            <button
              type="submit"
              disabled={password.length < 8 || phone.length !== 11}
            >
              Create account
            </button>
            <button type="button" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default CreateAccount;
