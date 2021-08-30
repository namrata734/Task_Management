import React from "react";
import image from "../assests/front.png";
import { useState } from "react";
import Login from "../components/login";
import Signup from "../components/signup";
import "./frontScreen.css";

const FrontScreen = () => {
  let [click, setClick] = useState(true);
  return (
    <div className="front">
      <div className="leftPortion">
        <img src={image} alt="loginImg" />
      </div>
      <div className="rightPortion">
        <button
          onClick={() => {
            setClick(true);
          }}
        >
          Log In
        </button>
        <button
          onClick={() => {
            setClick(false);
          }}
        >
          Sign Up
        </button>
        {click ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default FrontScreen;
