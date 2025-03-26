import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import OTPVerification from "@/user/auth/otpPage";
import ResetPassword from "@/user/auth/resetPasswordPage";
import SignIn from "@/user/auth/signInPage";
import ContributionPage from "@/user/contributionPage";
import Dashboard from "@/user/dashboard";
import SchedulePage from "@/user/schedulePage";
import { generateRoutes } from "./generate-routes";

const routes = [
    {
        layout: AuthLayout,
        routes: [
            {
                name: 'Sign In',
                title: 'Sign In',
                element: SignIn,
                path: '/signin' 
            },
            {
                name: 'OTP Verification',
                title: 'OTP Verification',
                element: OTPVerification,
                path: '/reset-password' 
            },
            {
                name: 'Reset Password',
                title: 'Reset Password',
                element: ResetPassword,
                path: '/confirm-password' 
            },

        ]
    },
    {
        layout: DashboardLayout,
        routes: [
            {
                name: 'Dashboard',
                title: 'User Dashboard',
                element: Dashboard,
                path: '/'
            },
            {
                name: 'Contributions',
                title: 'Contributions',
                element: ContributionPage,
                path: '/contributions'
            },
            {
                name: 'Schedules',
                title: 'Schedules',
                element: SchedulePage,
                path: '/schedule'
            },
            {
                name: 'Settings',
                title: 'Settings',
                // element: Settin,
                path: '/settings'
            }
        ]
    }
]

export const Routes = generateRoutes(routes);