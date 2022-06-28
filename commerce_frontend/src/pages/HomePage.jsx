import React from "react";
import Signup from "../components/register-user/Signup";
import "./home.scss"
import SectionWhy from "../components/sectionsComponent/SectionWhy";
import SectionAbout from "../components/sectionsComponent/SectionAbout";
import Slider from "../components/slider/slider";
const HomePage = () => {
  return (
    <div className="home-page">
      <Slider/>
 <SectionWhy/>
 <SectionAbout/>
 
      </div>
  );
};

export default HomePage;
