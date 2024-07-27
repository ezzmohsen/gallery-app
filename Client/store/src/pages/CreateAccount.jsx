import "../App.css";
import { useState } from "react";
import { validateEmail } from "../utils/utils";
import axios from "axios";

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

function CreateAccount() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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
      console.log(formData);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          formData
        );
      } catch (error) {
        console.log(error);
      }
      alert("Account created!");
      clearForm();
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="First name"
            />
          </div>
          <div className="Field">
            <label>Last name</label>
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Last name"
            />
          </div>
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
              Phone <sup>*</sup>
            </label>
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="phone"
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
            {password.length < 8 ? <PasswordErrorMessage /> : null}
          </div>

          <button type="submit">Create account</button>
        </fieldset>
      </form>
    </div>
  );
}

export default CreateAccount;
