import "../App.css";
import { useState } from "react";
import { validateEmail } from "../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      console.log(formData);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          formData
        );
        console.log(response.data.message);
        clearForm();
        // <Navigate to="/login" />;
        navigate("/login");
      } catch (response) {
        setErrorForm(response.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <h2>Sign Up</h2>
            <h3 style={{ color: "red" }}>{errorForm}</h3>
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
              {phone ? (
                <p className="FieldError" hidden={phone.length == 11}>
                  Phone should have at least 11 number
                </p>
              ) : null}
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
              {password ? (
                <p className="FieldError" hidden={password.length >= 8}>
                  Password should have at least 8 characters
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={password.length < 8 || phone.length != 11}
            >
              Create account
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default CreateAccount;
