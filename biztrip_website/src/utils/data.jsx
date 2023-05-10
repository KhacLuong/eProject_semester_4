export const ADMIN_DOCUMENT_TITLE = "CMS - BizTrip"
export const CUSTOMER_DOCUMENT_TITLE = "BizTrip"

import {MdOutlineSpaceDashboard, MdOutlineWarehouse, MdOutlinePolicy} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {BiDollarCircle, BiNews, BiCommentDetail} from "react-icons/bi";
import {HiOutlineTicket} from "react-icons/hi";
import {TbBus, TbRoad} from "react-icons/tb";
import {GrServices} from "react-icons/gr";
import {AiOutlineLike} from "react-icons/ai";
import {RiBillLine} from "react-icons/ri"
import {BsPersonVcard} from "react-icons/bs"

const FINAL_URL_ADMIN = "/admin/v1"

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
        url: "",
        icon: <></>,
    },
    {
        name: "Người dùng",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/users`,
        icon: FiUsers,
    },
    {
        name: "Doanh thu",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/revenues`,
        icon: BiDollarCircle,
    },
    {
        name: "Đơn đặt vé",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/bookings`,
        icon: RiBillLine,
    },
    {
        name: "Tin tức",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/news`,
        icon: BiNews,
    },
    {
        name: "Chứng nhận phản hồi",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/testimonials`,
        icon: BiCommentDetail,
    },
    {
        name: "Đối tác",
        isSubcategory: false,
        url: "",
        icon: <></>,
    },
    {
        name: "Nhà xe",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/management-coaches`,
        icon: MdOutlineWarehouse,
    },
    {
        name: "Xe",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/coaches`,
        icon: TbBus,
    },
    {
        name: "Nhân viên",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/staffs`,
        icon: BsPersonVcard,
    },
    {
        name: "Lộ trình",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/schedules`,
        icon: TbRoad,
    },
    {
        name: "Vé",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/tickets`,
        icon: HiOutlineTicket,
    },
    {
        name: "Tiện ích",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/utilities`,
        icon: AiOutlineLike,
    },
    {
        name: "Chính sách",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/policies`,
        icon: MdOutlinePolicy,
    },
    {
        name: "Hiển thị",
        isSubcategory: false,
        url: "",
        icon: <></>,
    },
    {
        name: "Cài đặt",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/display-settings`,
        icon: GrServices,
    },
]
export const tbodyActionDefault = ['edit', 'delete']
export const tbodyActionSpecial = ['view', 'edit', 'delete']
