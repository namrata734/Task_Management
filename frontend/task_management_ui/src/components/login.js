import React, {useState} from "react";
import "./login.css";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";

const Login = ({ setAuth }) => {
  const history = useHistory();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      console.log("entering login");
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();
      console.log("2nd");

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        localStorage.setItem("user_email", email);
        console.log("entered here");
        alert("login successfully ");
        history.push("/");
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        console.log("unfortunate");
        alert("Incorrect password");
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="items">
      <div id="tocontinue">To Continue</div>
      <div id="nameemail">We need your Name & Email</div>
      <form
        className="loginForm"
        onSubmit={onSubmitForm}
      >
        <input
          className="loginInput"
          type="text"
          name="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => onChange(e)}
        />
        {
              (!email || (!/\S+@\S+\.\S+/.test(email)))?<p id= "errormsg">Enter valid email address</p>:null
         }
        <input
          className="loginInput"
          type="password"
          name="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button
          className="loginButton"
          type="submit"
          
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
