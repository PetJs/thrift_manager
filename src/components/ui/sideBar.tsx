import React from "react";
import { useLocation, Link } from "react-router-dom";
import { SidebarProps } from "@/lib/types";
import LogoutIcon from "../../assets/icons/logout.svg"

const SideBar: React.FC<SidebarProps> = ({ items, onLogout }) => {
  const location = useLocation();

  return (
    <div className="h-screen w-60 bg-white">
      {/* Header Section */}
        <div className="flex flex-col items-center mb-4 mt-4 border-b-2 border-b-gray-300">
        <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <h1 className="text-lg font-bold text-gray-700 ml-1">
            Thrift Management App
            </h1>
        </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col mt-10 text-lg">
            {items.map((item, index) => (
                <Link
                to={item.path}
                key={index}
                className={`flex gap-6 items-center px-6 py-3 cursor-pointer ${
                    location.pathname === item.path
                    ? "border-l-3 border-blue-700 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                >
                <img
                    src={item.icon}
                    alt={`${item.label}-icon`}
                    className="w-5 h-5"
                />
                <h2>{item.label}</h2>
                </Link>
            ))}
        </div>

        {/* Logout */}
         
        <div className="mt-72">
            <button
            onClick={onLogout}
            className="flex gap-6 items-center w-full px-6 py-3 cursor-pointer text-gray-700 text-lg hover:border-l-2 hover:border-blue-700 hover:text-blue-700"
            >
            <img
                src={LogoutIcon}
                alt="Logout-icon"
                className="w-5 h-5"
            />
            <h2>Logout</h2>
            </button>
        </div>
    </div>
  );
};

export default SideBar;
