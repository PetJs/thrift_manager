import { Button } from "@/components/ui/button";
import Lock from "../assets/icons/lock.png";
import { Link } from "react-router-dom";

export default function ResetPassword() {

    return (
      <div className="bg-[#2341AA] h-screen flex flex-col items-center justify-center">
        <form className="bg-white rounded-2xl shadow-md w-[400px] p-6">
          <div className="flex flex-col items-center mb-6 mt-6">
            <div className="flex flex-col items-center mb-2">
              <h1 className="text-xl font-semibold text-gray-700 ml-3" >Reset Password</h1>
              <p className="text-gray-600 mb-6">
                Enter your new password to reset your password.
              </p>
            </div>
          </div>
  
          <div className="mb-6">
            <div className="relative">
              <span className="absolute left-3 top-3 w-4 h-4 ">
                <img src={Lock} alt="lock.png" />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter New Password"
                required
                className="block w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>
  
          <div className="mb-6">
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Confirm New Password "
                required
                className="block w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <span className="absolute left-3 top-3 w-4 h-4 ">
                <img src={Lock} alt="lock.png" />
              </span>
            </div>
          </div>
          <Link to="/otp-verification">
            <Button
                type="submit"
                className="w-full bg-[#2341AA] text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer mb-4"
            >
                Sign in
            </Button>
          </Link>
        </form>
      </div>
    );
  }
  