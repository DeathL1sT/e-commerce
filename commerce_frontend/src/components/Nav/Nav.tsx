import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, Authintcated } from "../../store/authSlice";
import { logout } from "../../store/authSlice";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./nav.scss";
const Nav = (props:any) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const authintcated = useSelector(Authintcated);
  const dispatch = useDispatch();
  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(userName, password));
  };

  return (
    <div className="content">
      <div className="lable">
        <h3>
          <Link to="/">الشامية لحديد الكريتال</Link>
        </h3>
      </div>
      <div className="link">
        <Link to="">عننا</Link>
        <Link to="/categories">الاقسام</Link>
      </div>

      {!authintcated && (
        <form onSubmit={handelSubmit}>
          <div className="inputs">
            <div className="username">
              <input
                type="text"
                placeholder="اسم المستخدم"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="passwoed">
              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" variant="primary">
              تسجيل الدخول
            </Button>
             <Button  variant="outline-primary" onClick={props.showrgisterpaage} style={{marginRight:"10px"}}>
               للتسجيل بالموقع
            </Button>
          </div>
         
        </form>
      )}
      {authintcated && (
        <Button
          variant="danger"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
          }}
        >
          تسجيل الخروج
        </Button>
      )}
    </div>
  );
};

export default Nav;
