import {MdOutlineSpaceDashboard, MdOutlineWarehouse} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {BiDollarCircle, BiNews} from "react-icons/bi";
import {HiOutlineTicket} from "react-icons/hi";
import {TbBus, TbRoad} from "react-icons/tb";
import {FaRegMoneyBillAlt} from "react-icons/fa";
import {GrServices} from "react-icons/gr";
import {AiOutlineLike} from "react-icons/ai";

const FINAL_URL_ADMIN = "/admin/v1"

export const dataNavbarAdmin = [
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
        url: "",
        icon: BiDollarCircle,
    },
    {
        name: "Hóa đơn",
        isSubcategory: true,
        url: "",
        icon: FaRegMoneyBillAlt,
    },
    {
        name: "Blog",
        isSubcategory: true,
        url: "",
        icon: BiNews,
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
        url: "",
        icon: MdOutlineWarehouse,
    },
    {
        name: "Xe",
        isSubcategory: true,
        url: "",
        icon: TbBus,
    },
    {
        name: "Tiện ích",
        isSubcategory: true,
        url: "",
        icon: AiOutlineLike,
    },
    {
        name: "Tuyến đường",
        isSubcategory: true,
        url: "",
        icon: TbRoad,
    },
    {
        name: "Vé",
        isSubcategory: true,
        url: "",
        icon: HiOutlineTicket,
    },
    {
        name: "Web",
        isSubcategory: false,
        url: "",
        icon: <></>,
    },
    {
        name: "Cài đặt",
        isSubcategory: true,
        url: "",
        icon: GrServices,
    },
]
