import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/skco_logo.png";
import "../style/layout.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="mobile-layout">
      <header
        className="header"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="SkcoPath Logo" className="logo" />
        <h1>Skco Path</h1>
      </header>
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
