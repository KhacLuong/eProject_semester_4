import React from 'react';
import styled from "styled-components";
import scenery_2 from "../../assets/image/wallpaper/scenery_2.jpg"
const Banner = () => {
    const BannerLayout = styled.section`
      background-image: url(${scenery_2});
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
      padding: 225px 0 210px 0;
      z-index: 0;
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
    `
    return (
        <BannerLayout>
            <BannerOverlay/>
        </BannerLayout>
    );
};

export default Banner;