import React, { useEffect, useState } from "react";
import "./navbar.css";
import { useHistory } from "react-router";

const Navbar = () => {
  const history = useHistory();
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("till here nav");
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <div className="nav">
      {isAuthenticated ? (
        <div className="Row">
          <i className="fas fa-search"></i>
          <input className="input" placeholder="search" />
          <span className="end">Hi There</span>
        </div>
      ) : (
        <div className="rightside">
          <button onClick={() => history.push("/frontScreen")}>login</button>
          <button onClick={() => history.push("/frontScreen")}>sign up</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
