export const ADMIN_DOCUMENT_TITLE = "CMS - BizTrip"
export const CUSTOMER_DOCUMENT_TITLE = "BizTrip"

import {MdOutlineSpaceDashboard, MdContactSupport, MdOutlinePolicy, MdOutlineContactMail} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {BiDollarCircle, BiNews, BiCommentDetail, BiHomeSmile} from "react-icons/bi";
import {HiOutlineTicket} from "react-icons/hi";
import {TbBus, TbRoad} from "react-icons/tb";
import {GrServices, GrContactInfo} from "react-icons/gr";
import {AiOutlineLike} from "react-icons/ai";
import {RiBillLine} from "react-icons/ri"
import {BsPersonVcard} from "react-icons/bs"
import {FaRegNewspaper} from "react-icons/fa"

const FINAL_URL_ADMIN = "/admin/v1/cms"
const FINAL_URL_CUSTOMER = "/v1"
export const dataSidebarCustomer = [
    {
        name: "Trang chủ",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}`,
        icon: BiHomeSmile,
    },
    {
        name: "Tin tức",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}/news`,
        icon: FaRegNewspaper
    },
    {
        name: "Contact",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}/news`,
        icon: MdOutlineContactMail
    },
    {
        name: "Về chúng tôi",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}/about-us`,
        icon: GrContactInfo
    }
]

export const dataSidebarAdmin = [
    {
        name: "Dashboard",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/dashboard`,
        icon: MdOutlineSpaceDashboard,
    },
    {
        name: "Quản lý",
        isSubcategory: false,
        icon: <></>,
    },
    {
        name: "Đơn đặt vé",
        key: 'booking-ticket',
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/bookings`,
        icon: RiBillLine,
    },
    {
        name: "Doanh thu",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/revenues`,
        icon: BiDollarCircle,
    },
    {
        name: "Xe",
        isSubcategory: true,
        icon: TbBus,
        key: 'coaches',
        children: [
            {
                name: "Danh sách",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/coaches/list`,
                icon: <></>,
            },
            {
                name: "Lộ trình",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/coaches/schedules`,
                icon: <></>,
            },
            {
                name: "Vé",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/coaches/tickets`,
                icon: <></>,
            },
            {
                name: "Tiện ích",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/coaches/utilities`,
                icon: <></>,
            },
            {
                name: "Đánh giá",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/coaches/feedbacks`,
                icon: <></>,
            },
            {
                name: "Địa điểm",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/coaches/locations`,
                icon: <></>,
            }
        ]
    },
    {
        name: "Người dùng",
        isSubcategory: true,
        icon: FiUsers,
        key: 'users',
        children: [
            {
                name: 'Danh sách',
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/users/accounts`,
                icon: <></>,
            },
            {
                name: "Nhận xét",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/users/testimonials`,
                icon: <></>,
            },
            {
                name: "Liên hệ",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/users/contacts`,
                icon: <></>
            }
        ]
    },
    // {
    //     name: "Tin tức",
    //     isSubcategory: true,
    //     url: `${FINAL_URL_ADMIN}/news`,
    //     icon: BiNews,
    // },
    // {
    //     name: "Cài đặt",
    //     isSubcategory: false,
    //     url: "",
    //     icon: <></>,
    // },
    // {
    //     name: "Chính sách",
    //     isSubcategory: true,
    //     url: `${FINAL_URL_ADMIN}/policies`,
    //     icon: MdOutlinePolicy,
    // },
    // {
    //     name: "Thông tin",
    //     isSubcategory: true,
    //     url: `${FINAL_URL_ADMIN}/display-settings`,
    //     icon: GrServices,
    // },
]
export const tbodyActionDefault = ['edit', 'delete']
export const tbodyActionSpecial = ['view', 'edit', 'delete']

export const listBreadcrumb = (name) => {
    return [
        {
            name: "Dashboard",
            path: `${FINAL_URL_ADMIN}`
        },
        {
            name: name,
            path: ""
        }
    ]
}
export const formBreadCrumb = (id, name, path) => {
    return [
        {
            name: "Dashboard",
            path: `${FINAL_URL_ADMIN}`
        },
        {
            name: name,
            path: `${FINAL_URL_ADMIN}/${path}`
        },
        {
            name: !id ? "Thêm mới" : "Cập nhật",
            path: ""
        }
    ]
}
