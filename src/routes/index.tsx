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
        name: "Dashboard",
        title: "User Dashboard",
        element: Dashboard,
        path: "/",
      },
      {
        name: "Contributions",
        title: "Contributions",
        element: ContributionPage,
        path: "/contributions",
      },
      {
        name: "Schedules",
        title: "Schedules",
        element: SchedulePage,
        path: "/schedule",
      },
      {
        name: "Settings",
        title: "Settings",
        element: SettingLayout,
        path: "/settings",
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
];

export const Routes = generateRoutes(routes);
