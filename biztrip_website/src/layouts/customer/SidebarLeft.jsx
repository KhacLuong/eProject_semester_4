import React from 'react';
import {dataSidebarCustomer} from "../../utils/data.jsx";
import ElementSidebar from "../../components/admin/ElementSidebar.jsx";
import {BiPhoneCall} from "react-icons/bi";
import styled, {keyframes} from "styled-components"


const ringRing = keyframes`
  0% {
    rotate: 0deg;
  }
  10% {
    rotate: 10deg;
  }
  30% {
    rotate: -10deg;
  }
  45% {
    rotate: 5deg;
  }
  55% {
    rotate: -5deg;
  }
  60% {
    rotate: 0deg;
  }
`;
const Hotline = styled.div`
  animation: 1.5s ${ringRing} ease-out infinite;
  display: inline-block;
`
const SidebarLeft = () => {
    return (
        <div className={`bg-gray-100 flex relative flex-col jus flex-1 pt-0 min-h-0`}>
            <div className={`bg-gray-100 h-24 mt-4 flex flex-col items-center justify-center px-4`}>
                <h1 className={`text-4xl mb-2 font-semibold`}>BizTrip</h1>
                <a href={`#`}
                    className={`cursor-pointer text-sm flex items-center bg-primaryColor text-white w-full justify-center py-2 rounded-lg`}>
                    <span
                        className={`rounded-full text-primaryColor bg-white flex items-center justify-center w-8 h-8 mr-2`}>
                        <Hotline>
                            <BiPhoneCall className={`w-5 h-5`}/>
                        </Hotline>
                    </span>
                    +0981237123
                </a>
            </div>
            <div className={`flex overflow-y-auto flex-col flex-1 absolute top-1/2 -translate-y-1/2 left-0 right-0`}>
                <div className={`py-4 flex-1 px-3 bg-transparent w-full`} id={`sidebar-items`}>
                    <ul className={`h-72 flex flex-col justify-between`}>
                        {
                            dataSidebarCustomer.map((item, index) => {
                                const Icon = item.icon
                                if (item.isSubcategory) {
                                    return (
                                        <li key={`sidebar-item-${index}`}>
                                            <ElementSidebar item={item} Icon={Icon} path={`/v1`}/>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li key={`sidebar-item-${index}`} className="w-full mt-4 mb-3">

                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SidebarLeft;