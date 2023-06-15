import React from 'react';
import image3 from "../../assets/image/wallpaper/scenery_3.jpg"
import image2 from "../../assets/image/wallpaper/scenery_2.jpg"
import image1 from "../../assets/image/wallpaper/scenery_1.jpg"

const SidebarRight = () => {
    return (
        <div className={`bg-gray-100 flex relative flex-col flex-1 pt-0 min-h-0`}>
            <div className={`bg-gray-100 h-96 flex flex-col items-center justify-center relative w-full`}>
                <img src={image3} alt={``} className={`object-cover w-full h-full`}/>
                <div style={{
                    backgroundImage: "linear-gradient(180deg, #00000080 0%, #000000 42%)"
                }}
                     className={`overlay bg-transparent opacity-30 h-full w-full top-0 left-0 absolute z-0`}></div>
                <div>

                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default SidebarRight;