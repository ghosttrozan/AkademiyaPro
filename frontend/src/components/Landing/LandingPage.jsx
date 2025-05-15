import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import HeroSection from "./HeroSection";
import HighLights from "./Highlights";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="pt-[70px]"></div>
      <HeroSection />
      <HighLights/>
    </div>
  );
};

export default LandingPage;
