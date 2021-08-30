import React, { useState } from "react";
import "./signup.css";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";

const Signup = ({ setAuth }) => {
  let emailValid = false;
  let passValid = false;

  const history = useHistory();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",

    password: "",
  });

  const { username, email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        username,
        email,
        password,
      };
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        history.push("/");
        console.log("registered");
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="items">
      <form className="registerForm" onSubmit={onSubmitForm}>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          name="username"
          value={username}
          onChange={(e) => onChange(e)}
          required
        />

        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        {!email || !/\S+@\S+\.\S+/.test(email) ? (
          <p id="errormsg">Enter valid email address</p>
        ) : (
          (emailValid = true)
        )}
        <input
          className="registerInput"
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password..."
          onChange={(e) => onChange(e)}
          required
        />
        {password.length < 8 ? (
          <p id="errormsg">Password must be 8 or more characters</p>
        ) : (
          (passValid = true)
        )}
        <button
          className="registerButton"
          type="submit"
          disabled={emailValid && passValid ? false : true}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
