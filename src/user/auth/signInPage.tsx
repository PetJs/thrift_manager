import { Button } from "@/components/ui/button";
import Lock from "../../assets/icons/lock.svg"
import SMS from "../../assets/icons/sms.svg";
import { Link } from "react-router-dom";
import useUserStore from "@/store/user-store";

export default function SignIn() {
  const { currentRole } = useUserStore();

    return (
      <>
        <form className="bg-white rounded-2xl shadow-md w-[400px] p-6">
          <div className="flex flex-col items-center mb-6 mt-6">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full mr-1"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <h1 className="text-xl font-bold text-gray-700 ml-3" >Thrift Management {currentRole === 'admin' ? 'Admin' : 'User'}</h1>
            </div>
          </div>
  
          <div className="mb-6">
            <div className="relative">
              <span className="absolute left-3 top-3 w-4 h-4">
                <img src={SMS} alt="sms.svg" />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password "
                required
                className="block w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <span className="absolute left-3 top-3 w-4 h-4 ">
                <img src={Lock} alt="lock.svg" />
              </span>
            </div>
          </div>
          <Link to="/otp-verification">
            <Button
                type="submit"
                className="w-full bg-[#2341AA] text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer mb-6"
            >
                Sign in
            </Button>
          </Link>
        </form>
        <div className="text-center mt-4 text-sm text-white">
            Forgot your password? <Link to="/reset-password" className="text-white hover:underline cursor-pointer"> Reset Password </Link>
        </div>
      </>
    );
  }
  