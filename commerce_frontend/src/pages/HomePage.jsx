import React from "react";
import Signup from "../components/register-user/Signup";
import "./home.scss"
import SectionWhy from "../components/sectionsComponent/SectionWhy";
import SectionAbout from "../components/sectionsComponent/SectionAbout";

const HomePage = () => {
  return (
    <div className="home-page">
 <SectionWhy/>
 <SectionAbout/>
 
      </div>
  );
};

export default HomePage;
