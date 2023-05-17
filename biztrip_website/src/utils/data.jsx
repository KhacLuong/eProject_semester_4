export const ADMIN_DOCUMENT_TITLE = "CMS - BizTrip"
export const CUSTOMER_DOCUMENT_TITLE = "BizTrip"

import {MdOutlineSpaceDashboard, MdOutlinePolicy} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {BiDollarCircle, BiNews, BiCommentDetail} from "react-icons/bi";
import {HiOutlineTicket} from "react-icons/hi";
import {TbBus, TbRoad} from "react-icons/tb";
import {GrServices} from "react-icons/gr";
import {AiOutlineLike} from "react-icons/ai";
import {RiBillLine} from "react-icons/ri"
import {BsPersonVcard} from "react-icons/bs"

const FINAL_URL_ADMIN = "/admin/v1/cms"

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
                name: "Danh sách xe",
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
        ]
    },
    {
        name: "Người dùng",
        isSubcategory: true,
        icon: FiUsers,
        key: 'users',
        children: [
            {
                name: 'Tài khoản',
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/users/accounts`,
                icon: <></>,
            },
            {
                name: "Nhân viên",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/users/staffs`,
                icon: <></>,
            },
            {
                name: "Phản hồi",
                isSubcategory: true,
                url: `${FINAL_URL_ADMIN}/users/testimonials`,
                icon: <></>,
            },
        ]
    },
    {
        name: "Tin tức",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/news`,
        icon: BiNews,
    },
    {
        name: "Cài đặt",
        isSubcategory: false,
        url: "",
        icon: <></>,
    },
    {
        name: "Chính sách",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/policies`,
        icon: MdOutlinePolicy,
    },
    {
        name: "Thông tin",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/display-settings`,
        icon: GrServices,
    },
]
export const tbodyActionDefault = ['edit', 'delete']
export const tbodyActionSpecial = ['view', 'edit', 'delete']

export const coachListBreadcrumb = [
    {
        name: "Dashboard",
        path: `${FINAL_URL_ADMIN}`
    },
    {
        name: "Quản lý xe",
        path: ""
    }
]
export const coachFormBreadcrumb = [
    {
        name: "Dashboard",
        path: `${FINAL_URL_ADMIN}`
    },
    {
        name: "Quản lý xe",
        path: `${FINAL_URL_ADMIN}/coaches/list`
    },
    {
        name: "Thêm mới",
        path: ""
    }
]
export const utilityListBreadcrumb = [
    {
        name: "Dashboard",
        path: `${FINAL_URL_ADMIN}`
    },
    {
        name: "Quản lý tiện ích",
        path: ""
    }
]
export const utilityFormBreadcrumb = [
    {
        name: "Dashboard",
        path: `${FINAL_URL_ADMIN}`
    },
    {
        name: "Quản lý tiện ích",
        path: `${FINAL_URL_ADMIN}/coaches/utilities`
    },
    {
        name: "Thêm mới",
        path: ""
    }
]