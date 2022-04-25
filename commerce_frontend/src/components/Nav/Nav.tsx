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
          <Link to="/">E-commerce</Link>
        </h3>
      </div>
      <div className="link">
        <Link to="">About Us</Link>
        <Link to="/categories">Categorie</Link>
      </div>

      {!authintcated && (
        <form onSubmit={handelSubmit}>
          <div className="input">
            <input
              type="text"
              placeholder="Enter User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="btn">
            <button className="bt" type="submit">
              Log In
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
          Log out
        </button>
      )}
    </div>
  );
};

export default Nav;
