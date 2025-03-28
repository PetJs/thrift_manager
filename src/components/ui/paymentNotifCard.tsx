import React from "react";
import { PaymentNotifCardProps } from "@/lib/types";


const PaymentNotifCard: React.FC<PaymentNotifCardProps> = ({ recipient, amount, date }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-[295px] h-[96px] flex justify-between">
        <div>
            <div className="text-[13px] font-medium text-gray-500 mb-2">Next Recipient:</div>
            <div className="text-[18px] font-semibold text-black">{recipient}</div>
        </div>
        {amount && 
            <div>
                <div className="text-[13px] font-medium text-gray-500 mb-2">Amount:</div>
                <div className="text-[18px] font-semibold text-black">{amount}</div>
            </div>
        }
        <div>
            <div className="text-[13px] font-medium text-gray-500 mb-2">Date:</div>
            <div className="text-[18px] font-semibold text-black">{date}</div>
        </div>
    </div>
  );
};

export default PaymentNotifCard;
