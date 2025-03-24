import './App.css'
import { Routes, Route } from 'react-router-dom';
import SignIn from './user/auth/signInPage';
import OTPVerification from './user/auth/otpPage';
import ResetPassword from './user/auth/resetPasswordPage';
import Dashboard from './user/dashboard';


function App() {
  return (
    <>
    <Routes>
      <Route path="/sign-in" element={<SignIn/> } />
      <Route path="/otp-verification" element={<OTPVerification/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/" element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default App
