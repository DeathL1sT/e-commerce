import React, { FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import Form from 'react-bootstrap/Form'
import { Button } from "react-bootstrap";
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
<div className="register">
<Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>البريد الالكترونى</Form.Label>
      <Form.Control type="email" placeholder="البريد الالكترونى" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
      <Form.Text className="text-muted">
        برجاء اكمال التسجيل لاتمام عملية التواصل...
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>كلمة المرور</Form.Label>
      <Form.Control type="password" placeholder="كلمة المرور" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicFirstName">
      <Form.Label> الاسم الاول</Form.Label>
      <Form.Control type="text" placeholder=" الاسم الاول" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicLastName">
      <Form.Label> الاسم الثانى</Form.Label>
      <Form.Control type="text" placeholder=" الاسم الثانى" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicMob">
      <Form.Label> رقم الهاتف</Form.Label>
      <Form.Control type="text" placeholder="رقم الهاتف" value={telephone} onChange={(e)=>{setTelephone(e.target.value)}}/>
    </Form.Group>

    <Button variant="primary" type="submit" size="lg">
      تسجيل
    </Button>
  </Form>
</div>
    // <form onSubmit={handleSubmit}>
    //   <div className="register">
    //     <div className="register-content">
    //       <h4>Signup</h4>
    //       <div className="input">
    //         <input
    //           type="text"
    //           placeholder="Enter User Name"
    //           value={userName}
    //           onChange={(e) => {
    //             setUserName(e.target.value);
    //           }}
    //         />
    //         <input
    //           type="text"
    //           placeholder="Enter User Password"
    //           value={password}
    //           onChange={(e) => {
    //             setPassword(e.target.value);
    //           }}
    //         />
    //         <input
    //           type="text"
    //           placeholder="Enter User First Name"
    //           value={firstName}
    //           onChange={(e) => {
    //             setFirstName(e.target.value);
    //           }}
    //         />
    //         <input
    //           type="text"
    //           placeholder="Enter User Last Name"
    //           value={lastName}
    //           onChange={(e) => {
    //             setLastName(e.target.value);
    //           }}
    //         />
    //         <input
    //           type="text"
    //           placeholder="Enter User Telephone"
    //           value={telephone}
    //           onChange={(e) => {
    //             setTelephone(e.target.value);
    //           }}
    //         />
    //       </div>
    //       <button>REGISTER</button>
    //     </div>
    //   </div>
    // </form>
  );
};

export default Signup;
