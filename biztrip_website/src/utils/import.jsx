import {lazy} from "react";

export const ErrorPage = lazy(() => import("../pages/404.jsx"))
export const DashBoardPage = lazy(() => import("../pages/admin/Dashboard.jsx"))
export const UserListPage = lazy(() => import("../pages/admin/users/UserList.jsx"))
export const UserFormPage = lazy(() => import("../pages/admin/users/UserForm.jsx"))
export const CoachCarListPage = lazy(() => import("../pages/admin/coaches/CoachList.jsx"))
export const CoachCarFormPage = lazy(() => import("../pages/admin/coaches/CoachForm.jsx"))
export const SignInPage = lazy(() => import("../pages/admin/auth/SignIn.jsx"))
export const AdminHomePage = lazy(() => import("../pages/admin/AdminHomePage.jsx"))
export const BookingListPage = lazy(() => import("../pages/admin/BookingList.jsx"))
export const RevenuePage = lazy(() => import("../pages/admin/Revenue.jsx"))
export const NewsListPage = lazy(() => import("../pages/admin/news/NewsList.jsx"))
export const TestimonialListPage = lazy(() => import("../pages/admin/testimonials/TestimonialList.jsx"))
export const TestimonialFormPage = lazy(() => import("../pages/admin/testimonials/TestimonialForm.jsx"))
export const UtilityListPage = lazy(() => import("../pages/admin/utilities/UtilityList.jsx"))
export const UtilityFormPage = lazy(() => import("../pages/admin/utilities/UtilityForm.jsx"))
export const ScheduleListPage = lazy(() => import("../pages/admin/schedules/ScheduleList.jsx"))
export const ScheduleFormPage = lazy(() => import("../pages/admin/schedules/ScheduleForm.jsx"))
export const TicketListPage = lazy(() => import("../pages/admin/tickets/TicketList.jsx"))
export const TicketFormPage = lazy(() => import("../pages/admin/tickets/TicketForm.jsx"))
export const PolicyListPage = lazy(() => import("../pages/admin/policies/PolicyList.jsx"))
export const CustomerHomePage = lazy(() => import("../pages/customer/CustomerHomePage.jsx"))
export const ResetPasswordPage = lazy(() => import("../pages/ResetPassword.jsx"))
export const ContactListPage = lazy(() => import("../pages/admin/contact/ContactList.jsx"))

export const LocationListPage = lazy(() => import("../pages/admin/locations/LocationList.jsx"))
export const LocationFormPage = lazy(() => import("../pages/admin/locations/LocationForm.jsx"))