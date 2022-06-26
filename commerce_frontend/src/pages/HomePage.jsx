import React from "react";
import Signup from "../components/register-user/Signup";
import "./home.scss"
import pic1 from "../public/mainfactor.jpg"

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content-page">
        <section className="section-1">
<div className="section-content">
<div className="img">
    <img src={pic1} alt="" className="pic1"/>
    </div>
  <div className="art">
  <div className="section-label">
    <h1 >لماذا نحن</h1>
    </div>
  <p className="article">
    Lorem ipsum dolor, <br/>
    sit amet consectetur adipisicing elit.<br/>
    Sint sapiente fuga quos vel laborum pariatur fugiat tempore magnam ea!<br/>
    Voluptates mollitia tenetur fugiat ea corrupti!<br/>
    Autem corporis voluptates voluptatem placeat.
  </p>
  </div>
</div>
        </section>
      </div>
      
    </div>
  );
};

export default HomePage;
