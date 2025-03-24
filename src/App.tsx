import './App.css'
import { Routes, Route } from 'react-router-dom';
import SignIn from './user/signInPage'
import OTPVerification from './user/otpPage';
import ResetPassword from './user/resetPasswordPage';


function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<SignIn/> } />
      <Route path="/otp-verification" element={<OTPVerification/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
    </Routes>
    </>
  )
}

export default App
