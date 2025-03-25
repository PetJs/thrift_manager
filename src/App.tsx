import './App.css'
import { Routes, Route } from 'react-router-dom';
import SignIn from './user/auth/signInPage';
import OTPVerification from './user/auth/otpPage';
import ResetPassword from './user/auth/resetPasswordPage';
import Dashboard from './user/dashboard';
import ContributionPage from './user/contributionPage';
import SchedulePage from './user/schedulePage';


function App() {
  return (
    <>
    <Routes>
      <Route path="/sign-in" element={<SignIn/> } />
      <Route path="/otp-verification" element={<OTPVerification/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/contribution-page" element={<ContributionPage/>}/>
      <Route path="/schedule-page" element={<SchedulePage/>}/>
    </Routes>
    </>
  )
}

export default App
