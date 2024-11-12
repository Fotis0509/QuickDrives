// src/components/Banner.js
import React from "react";
import "./Banner.css";

const Banner = ({ onRentClick }) => {
  return (
    <div className="banner">
      <img src="/car-banner.jpg" alt="Car Rental Banner" className="banner-image" />
      <button className="banner-button" onClick={onRentClick}>
        Rent Car Now
      </button>
    </div>
  );
};

export default Banner;
