import { useState } from "react";
// import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./nav.scss";
const Nav = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="header">
      <h3 className="lable">E-commerce</h3>
      <div className="content">
        <div className="link">
          <Link to="">About Us</Link>
          <Link to="">Categorie</Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter User Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" type="submit">
          Log In
        </button>
        <button className="icon">{/* <ShoppingCartOutlined /> */}</button>
      </div>
    </div>
  );
};

export default Nav;
