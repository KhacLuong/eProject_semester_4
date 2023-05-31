import {
    ErrorPage,
    SignInPage,
    AdminHomePage,
    DashBoardPage,
    TicketListPage,
    TicketFormPage,
    PolicyListPage,
    UtilityListPage,
    UtilityFormPage,
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
    CustomerHomePage, CoachCarFormPage,
} from "../utils/import.jsx";

export const dataRouters = [
    {
        path: "*",
        page: ErrorPage,
        isIndex: false,
        isAuthentication: false,
    },
    {
        path: "admin/v1/sign-in",
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
        path: "admin/v1/cms",
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
                path: "users/accounts",
                page: UserListPage,
                isIndex: false,
                isAuthentication: true,
            },
            {
                path: "users/accounts/create",
                page: UserFormPage,
                isIndex: false,
                isAuthentication: true,
            },
            {
                path: "users/accounts/edit",
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
                path: "coaches/list",
                page: CoachCarListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches/list/create",
                page: CoachCarFormPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches/list/edit",
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
                path: "users/testimonials",
                page: TestimonialListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches/utilities",
                page: UtilityListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches/utilities/create",
                page: UtilityFormPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches/utilities/edit",
                page: UtilityFormPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches/schedules",
                page: ScheduleListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches/tickets",
                page: TicketListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches/tickets/create",
                page: TicketFormPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches/tickets/edit",
                page: TicketFormPage,
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
                path: "users/staffs",
                page: StaffListPage,
                isIndex: false,
                isAuthentication: true
            },
        ]
    },
]