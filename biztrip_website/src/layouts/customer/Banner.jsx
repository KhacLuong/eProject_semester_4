import React from 'react';
import styled from "styled-components";
import scenery_2 from "../../assets/image/wallpaper/scenery_2.jpg"
import Booking from "./Booking.jsx";
const Banner = () => {
    const BannerLayout = styled.section`
      background-image: url(${scenery_2});
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
   
      z-index: 10;
      width: 100%;
      height: 90vh;
      position: relative;
    `
    const BannerOverlay = styled.div`
      background-color: transparent;
      opacity: 0.58;
      transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
      z-index: 0;
      background-image: linear-gradient(90deg, #00000080 0%, #000000 42%);
    `
    return (
        <BannerLayout>
            <BannerOverlay/>
            <Booking/>
        </BannerLayout>
    );
};

export default Banner;