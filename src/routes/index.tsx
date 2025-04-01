import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import OTPVerification from "@/pages/auth/otpPage";
import ResetPassword from "@/pages/auth/resetPasswordPage";
import SignIn from "@/pages/auth/signInPage";
import ContributionPage from "@/pages/user/contributionPage";
import Dashboard from "@/pages/user/dashboard";
import SchedulePage from "@/pages/user/schedulePage";
import ProfilePage from "@/pages/user/settings/profilePage";
import { generateRoutes } from "./generate-routes";
import SettingLayout from "@/layouts/settings-layout";
import PaymentDetailsPage from "@/pages/user/settings/paymentPage";
import Reminders from "@/pages/user/settings/notificationPage";
import SecuritySetting from "@/pages/user/settings/securitySettingsPage";
import ChangePassowordPage from "@/pages/user/settings/changePassword";
import SignUp from "@/pages/auth/signUpPage";
import AdminDashboard from "@/pages/admin/dashboard";
import GroupsPage from "@/pages/admin/groups";
import AdminSchedule from "@/pages/admin/schedule";
import AdminProfile from "@/pages/admin/settings/profilePage";
import AdminPayment from "@/pages/admin/settings/paymentPage";
import AdminGeneralSetting from "@/pages/admin/settings/generalSettings";
import AdminNotifs from "@/pages/admin/settings/notificationPage";
import AdminSecuritySetting from "@/pages/admin/settings/securitySettings";
import { Outlet } from "react-router-dom";
import AdminSettingsLayout from "@/layouts/adminSettings-layout";
import GroupDetailsPage from "@/pages/admin/groupDetails";

const UsersRoutes = () => {
  return (
    <Outlet /> // This ensures nested routes render
  );
};

const routes = [
  {
    layout: AuthLayout,
    routes: [
      {
        name: "Sign In",
        title: "Sign In",
        element: SignIn,
        path: "/signin",
      },
      {
        name: "Sign Up",
        title: "Sign Up",
        element: SignUp,
        path: "/signup",
      },
      {
        name: "OTP Verification",
        title: "OTP Verification",
        element: OTPVerification,
        path: "/reset-password",
      },
      {
        name: "Reset Password",
        title: "Reset Password",
        element: ResetPassword,
        path: "/confirm-password",
      },
    ],
  },
  {
    layout: DashboardLayout,
    routes: [
      {
        name: "Users",
        path: "/users",
        element: UsersRoutes,
        requiredRole: "user",
        routes: [
          {
            name: "Dashboard",
            title: "User Dashboard",
            element: Dashboard,
            path: "dashboard",
          },
          {
            name: "Contributions",
            title: "Contributions",
            element: ContributionPage,
            path: "contributions",
          },
          {
            name: "Schedules",
            title: "Schedules",
            element: SchedulePage,
            path: "schedule",
          },
          {
            name: "Settings",
            title: "Settings",
            element: SettingLayout,
            path: "settings",
            routes: [
              {
                name: "Profile",
                title: "Profile",
                element: ProfilePage,
                path: "profile",
              },
              {
                name: "Payment",
                title: "Payment",
                element: PaymentDetailsPage,
                path: "payment-details",
              },
              {
                name: "Notification",
                title: "Notification",
                element: Reminders,
                path: "notification",
              },
              {
                name: "Security",
                title: "Security",
                element: SecuritySetting,
                path: "security",
              },
              {
                name: "Change Password",
                title: "Change Password",
                element: ChangePassowordPage,
                path: "change-password",
              },
            ],
          },
        ],
      },
      {
        name: "Admin",
        path: "/admin",
        element: UsersRoutes,
        requiredRole: "admin",
        routes: [
          {
            name: "Admin Dashboard",
            title: "Dashboard",
            element: AdminDashboard,
            requiredRole: "admin",
            path: "dashboard",
          },
          {
            name: "Groups",
            title: "Groups",
            element: GroupsPage,
            requiredRole: "admin",
            path: "groups",
          },
          {
            name: "Group Details",
            title: "Group Details",
            element: GroupDetailsPage,
            requiredRole: "admin",
            path: "groups/:id",
          },
          {
            name: "Admin Schedule",
            title: "Admin Schedule",
            element: AdminSchedule,
            requiredRole: "admin",
            path: "schedule",
          },
          {
            name: "Settings",
            title: "Settings",
            element: AdminSettingsLayout,
            requiredRole: "admin",
            path: "settings",
            routes: [
              // set up sub-routes inside here
              {
                name: "Profile",
                title: "Profile",
                element: AdminProfile,
                path: "profile",
              },
              {
                name: "Payment",
                title: "Payment",
                element: AdminPayment,
                path: "payment-details",
              },
              {
                name: "Notification",
                title: "Notification",
                element: AdminNotifs,
                path: "notification",
              },
              {
                name: "Security",
                title: "Security",
                element: AdminSecuritySetting,
                path: "security",
              },
              {
                name: "General",
                title: "General",
                element: AdminGeneralSetting,
                path: "general",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const Routes = generateRoutes(routes);
