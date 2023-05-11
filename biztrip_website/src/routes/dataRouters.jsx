import {
    ErrorPage,
    SignInPage,
    AdminHomePage,
    DashBoardPage,
    TicketListPage,
    PolicyListPage,
    UtilityListPage,
    ScheduleListPage,
    NewsListPage,
    BookingListPage,
    RevenuePage,
    SettingFormPage,
    SettingListPage,
    TestimonialListPage,
    UserFormPage,
    UserListPage,
    CoachCarListPage,
    StaffListPage,
    CustomerHomePage, CoachCarFormPage
} from "../utils/import.jsx";

export const dataRouters = [
    {
        path: "*",
        page: ErrorPage,
        isIndex: false,
        isAuthentication: false,
    },
    {
        path: "sign-in",
        page: SignInPage,
        isIndex: false,
        isAuthentication: false,
    },
    {
        path: "",
        page: CustomerHomePage,
        isIndex: false,
        isAuthentication: true,
        children: [
            {
                path: "",
                page: "",
                isIndex: true,
                isAuthentication: true,
            }
        ]
    },
    {
        path: "admin/v1",
        page: AdminHomePage,
        isIndex: false,
        isAuthentication: true,
        children: [
            {
                path: "",
                page: DashBoardPage,
                isIndex: true,
                isAuthentication: true,
            },
            {
                path: "dashboard",
                page: DashBoardPage,
                isIndex: true,
                isAuthentication: true,
            },
            {
                path: "users",
                page: UserListPage,
                isIndex: false,
                isAuthentication: true,
            },
            {
                path: "users/create",
                page: UserFormPage,
                isIndex: false,
                isAuthentication: true,
            },
            {
                path: "users/edit",
                page: UserFormPage,
                isIndex: false,
                isAuthentication: true,
            },
            {
                path: ":slug/:id/danh-sach-xe",
                page: CoachCarListPage,
                isIndex: false,
                isAuthentication: true,
            },
            {
                path: "display-settings",
                page: SettingListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "display-settings/create",
                page: SettingFormPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "display-settings/edit",
                page: SettingFormPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches",
                page: CoachCarListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches/create",
                page: CoachCarFormPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches/edit",
                page: CoachCarFormPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "bookings",
                page: BookingListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "revenues",
                page: RevenuePage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "news",
                page: NewsListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "testimonials",
                page: TestimonialListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "utilities",
                page: UtilityListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "schedules",
                page: ScheduleListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "tickets",
                page: TicketListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "policies",
                page: PolicyListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "staffs",
                page: StaffListPage,
                isIndex: false,
                isAuthentication: true
            },
        ]
    },
]