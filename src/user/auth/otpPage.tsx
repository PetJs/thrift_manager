import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OTPVerification = () => {
  // State for the OTP inputs
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  // Handler for updating OTP inputs
  const handleChange = (value: string, index: number): void => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Check if all inputs are filled
    setIsFilled(newOtp.every((digit) => digit.trim() !== ""));
  };

  // Handler to move focus to the next input field
  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    const key = event.key;

    if (key === "Backspace" && index > 0 && !otp[index]) {
      (event.currentTarget.previousElementSibling as HTMLInputElement)?.focus();
    } else if (key.match(/^[0-9]$/) && index < otp.length - 1) {
      (event.currentTarget.nextElementSibling as HTMLInputElement)?.focus();
    }
  };

  return (
    <>
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-2">OTP Verification</h2>
        <p className="text-gray-600 mb-6">
          Enter the verification code we just sent to your email address
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, index)
              }
              onKeyUp={(e) => handleKeyUp(e, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <Button
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            isFilled ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
          }`}
          disabled={!isFilled}
        >
          <Link to='/confirm-password'>
            Reset Password
          </Link>
        </Button>

        <p className="text-gray-500 mt-4">
          Didn’t receive code?{" "}
          <span className="text-blue-600 cursor-pointer">Resend</span>
        </p>
      </div>
      <div className="text-center mt-4 text-sm text-white">
            Forgot your password? <Link to="/reset-password" className="text-white hover:underline cursor-pointer"> Reset Password </Link>
        </div>
    </>
  );
};

export default OTPVerification;
