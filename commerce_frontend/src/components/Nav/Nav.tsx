import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, Authintcated } from "../../store/authSlice";
import { logout } from "../../store/authSlice";
import { Link } from "react-router-dom";
import "./nav.scss";
const Nav = () => {
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
              type="text"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           </div>
           <button className="bt" type="submit">
              تسجيل الدخول
            </button>
          </div>
        </form>
      )}
      {authintcated && (
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
          }}
        >
          تسجيل الخروج
        </button>
      )}
    </div>
  );
};

export default Nav;
