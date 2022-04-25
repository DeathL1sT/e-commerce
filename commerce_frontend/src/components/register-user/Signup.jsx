import React, { FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import "./signup.scss";
const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      registerUser({
        userName,
        password,
        firstName,
        lastName,
        telephone,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="register">
        <div className="register-content">
          <h4>Signup</h4>
          <div className="input">
            <input
              type="text"
              placeholder="Enter User Name"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter User Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter User First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter User Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter User Telephone"
              value={telephone}
              onChange={(e) => {
                setTelephone(e.target.value);
              }}
            />
          </div>
          <button>REGISTER</button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
