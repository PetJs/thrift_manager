import React from "react";
import { CardProps } from "@/lib/types";



const Card: React.FC<CardProps> = ({
  icon,
  amount,
  description,
  tag,
  className,
  actionText,
  onActionClick,
}) => {
  return (
    <div className="flex flex-col w-[257px] h-[135px] bg-white shadow-lg rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
            <div className="w-[35px] h-[35px] flex items-center justify-center bg-blue-100 rounded-full">
                {/* Ensure icon is passed as ReactNode */}
                {typeof icon === "string" ? (
                <img src={icon} alt="icon" className="w-6 h-6" />
                ) : (
                icon
                )}
            </div>
            </div>
            {tag ? (
            <div
                className={`px-2 py-1 text-[8px] font-medium rounded-md ${className}`}
            >
                {tag}
            </div>
            ) : actionText ? (
            <button
                onClick={onActionClick}
                className="px-2 py-1 text-[8px] font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
                {actionText}
            </button>
            ) : null}
        </div>
        <h1 className="text-[20px] font-semibold text-black mt-2">{amount}</h1>
        <p className="text-gray-500 text-[13px] mt-1">{description}</p>
    </div>
  );
};

export default Card;
